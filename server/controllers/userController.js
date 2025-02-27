const User = require("../models/user.model");
const Faculty = require("../models/faculty.model");
const Role = require("../models/role.model");

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


// Get all users with the role "faculty"

exports.getFaculties = async (req, res) => {
  try {
    // Step 1: Find the Role ID for "faculty"
    const facultyRole = await Role.findOne({ name: "faculty" });

    if (!facultyRole) {
      return res.status(404).json({ success: false, message: "Faculty role not found" });
    }

    // Step 2: Find users with that Role ID
    const facultyUsers = await User.find({ role: facultyRole._id }).select("_id username email");

    res.status(200).json({ success: true, users: facultyUsers });
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
    console.log(user)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    console.log(user)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};
