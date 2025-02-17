const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Role = require("../models/role.model"); // Role model

const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";

// ✅ Signup Function
exports.signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

    console.log("1",username);
    console.log(req.body);
    
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    
    let roleId = null; // Default to null if not provided
    
    if (role) {
      const existingRole = await Role.findOne({ name: role.toLowerCase() });
      if (existingRole) {
        console.log(existingRole._id);
        
        roleId = existingRole._id; // Assign role ID if found
      } else {
        return res.status(400).json({ message: "Invalid role provided" });
      }
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: roleId, // Store role ID or null
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Error in Signup", error: error.message });
  }
};


// ✅ Login Function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) 
      return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error in Login", error: error.message });
  }
};
