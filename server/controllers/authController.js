require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Faculty = require("../models/faculty.model");
const Role = require("../models/role.model");
const { createSecretToken } = require("../config/SecretToken");
// const { generateToken } = require("../utils/generateToken");
const nodemailer = require("nodemailer");
const crypto = require("crypto")
const JWT_SECRET = process.env.TOKEN_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

//signup function
exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate required fields
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "Username, email, password, and role are required" });
    }

    // Validate role
    const allowedRoles = ["student", "faculty"];
    if (!allowedRoles.includes(role.toLowerCase())) {
      return res.status(400).json({ message: "Invalid role. Allowed roles: student, faculty" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Find the role in the Role collection
    const roleData = await Role.findOne({ name: role.toLowerCase() });
    if (!roleData) {
      return res.status(400).json({ message: `${role} role not found` });
    }

    // Create new user (password will be hashed by the pre-save middleware)
    const newUser = new User({
      username,
      email,
      password, // Password will be hashed by the pre-save middleware
      role: roleData._id,
    });

    await newUser.save();

    
    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, role: role.toLowerCase() }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 86400000, // 1 day
    });

    // Return response
    res.status(201).json({
      success: true,
      message: `${role} registered successfully!`,
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: role.toLowerCase(),
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Error in Signup", error: error.message });
  }
};


// ✅ Generic Login Function
const loginUser = async (req, res, roleName) => {
  try {
    const { email, password, rememberMe } = req.body; // ✅ Add rememberMe to request
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const roleData = await Role.findOne({ name: roleName });
    if (!roleData) {
      return res.status(400).json({ message: `${roleName} role not found` });
    }

    const user = await User.findOne({ email, role: roleData._id }).select("+password").populate("role", "name");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.is_active) {
      return res.status(403).json({ message: "Your account is inactive. Please contact support." });
    }

    // ✅ Handle Remember Me
    const tokenExpiry = rememberMe ? "7d" : "1d";
    const token = jwt.sign({ id: user._id, role: user.role.name }, JWT_SECRET, { expiresIn: tokenExpiry });

    // ✅ Set cookie with dynamic expiration
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: rememberMe ? 604800000 : 86400000, // 7 days or 1 day
    });

    user.last_login = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: `${roleName} login successful`,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role.name,
        is_verified: user.is_verified,
        last_login: user.last_login,
      },
    });
  } catch (error) {
    console.error(`${roleName} Login Error:`, error);
    res.status(500).json({ message: `Error in ${roleName} Login`, error: error.message });
  }
};


exports.studentLogin = (req, res) => loginUser(req, res, "student");
exports.adminLogin = (req, res) => loginUser(req, res, "admin");
exports.facultyLogin = (req, res) => loginUser(req, res, "faculty");

// ✅ Forgot Password Function

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("Generated Reset Token:", resetToken); // Debugging

    // Hash the token before storing it in the database
    const hashedToken = await bcrypt.hash(resetToken, 12);
    console.log("Hashed Reset Token:", hashedToken); // Debugging

    // Store hashed token and expiration time in the database
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    console.log("Token successfully saved in the database!");

    // Send the **raw token** (not the hashed one) via email
    sendResetEmail(user.email, resetToken);

    res.json({ success: true, message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Error processing request" });
  }
};

// ✅ Reset Password Function
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    console.log("Received Token from URL:", token);
    console.log("Received New Password:", newPassword);

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    // Find user whose token is still valid
    const user = await User.findOne({
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    console.log("User Found in DB:", user);
    console.log("Stored Hashed Token in DB:", user.resetPasswordToken);

    // Ensure token is stored
    if (!user.resetPasswordToken) {
      console.error("No reset token found in DB! Forgot password flow might be broken.");
      return res.status(400).json({ message: "Reset token not found" });
    }

    // Compare the raw token from URL with the hashed token in DB
    const isValidToken = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isValidToken) {
      console.error("Token comparison failed. Possibly incorrect token.");
      return res.status(400).json({ message: "Invalid token" });
    }

    // Hash and update the new password
    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};

const sendResetEmail = async (email, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // App Password (Not your actual Gmail password)
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to: ${email}`);
  } catch (error) {
    console.error("Error sending reset email:", error);
  }
};
