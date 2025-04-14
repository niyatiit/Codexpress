require("dotenv").config();
const User = require("../models/user.model");
const Faculty = require("../models/faculty.model");
const Role = require("../models/role.model");
const nodemailer = require('nodemailer');

// Get a specific user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body; // Data coming from request body

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        user[key] = updates[key];
      }
    });

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addNewStudent = async (req, res) => {
  try {
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      phone,
      profile_picture,
      gender,
      dob,
      address,
      pincode,
      nationality = 'Indian',
      sendCredentials = false
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'username',
      'first_name',
      'last_name',
      'email',
      'password',
      'phone',
      'gender',
      'dob',
      'address',
      'pincode'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      return res.status(409).json({
        message: existingUser.username === username
          ? 'Username already exists'
          : 'Email already exists'
      });
    }

    // Get the student role ID
    const studentRole = await Role.findOne({ name: 'student' });
    if (!studentRole) {
      return res.status(500).json({ message: 'Student role not found in system' });
    }

    // Create new student user
    const newStudent = new User({
      username,
      first_name,
      last_name,
      email,
      password, // Note: Make sure to hash this in the User model pre-save hook
      phone,
      profile_picture,
      gender,
      dob,
      address,
      pincode,
      nationality,
      role: studentRole._id, // Assign student role by ID
      is_active: true
    });

    // Save the new student
    await newStudent.save();

    // Send credentials via email if requested
    if (sendCredentials) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: true,
          auth: {
            user: process.env.EMAIL_USER, // Your Gmail
            pass: process.env.EMAIL_PASS, // Use the app password here
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Your Student Account Credentials',
          html: `
            <h2>Welcome to Our Learning Platform!</h2>
            <p>Your student account has been successfully created.</p>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p>You can login at: <a href="${process.env.FRONTEND_URL}/login">${process.env.FRONTEND_URL}/login</a></p>
            <p>For security reasons, please change your password after first login.</p>
          `
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Error sending credentials email:', emailError);
        // Don't fail the request if email fails, just log it
      }
    }

    // Return the created user (without password)
    const userResponse = newStudent.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({
      message: 'Error creating student',
      error: error.message
    });
  }
};
// Get all users with the role "faculty"

exports.getFaculties = async (req, res) => {
  try {
    // Step 1: Find the Role ID for "faculty"
    const facultyRole = await Role.findOne({ name: "faculty" });

    if (!facultyRole) {
      return res.status(404).json({ success: false, message: "Faculty role not found" });
    }
    // Step 2: Find users with that Role ID
    const facultyUsers = await User.find({ role: facultyRole._id }).select("_id username email first_name last_name");
    res.status(200).json({ success: true, users: facultyUsers });
  } catch (error) {
    console.error("Error fetching faculty users:", error);
    res.status(500).json({ success: false, message: "Error fetching faculty users", error: error.message });
  }
};

exports.getAuthenticatedFaculty = async (req, res) => {
  try {

    const faculty = await Faculty.find({ user_id: req.user.id }).populate("user_id")
    // console.log("backend : ",faculty)
    res.status(200).json({ success: true, user: faculty });
  } catch (error) {
    console.error("Error fetching faculty users:", error);
    res.status(500).json({ success: false, message: "Error fetching faculty users", error: error.message });
  }
};


// Get all users with the role "student"
exports.getStudents = async (req, res) => {
  try {
    const studentRole = await Role.findOne({ name: "student" });

    const students = await User.find({ role: studentRole._id }).select("username email role");
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Fetch users with the role "faculty"

    const allUsers = await User.find().select("username email role");

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Error fetching all users", error: error.message });
  }
}

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};
