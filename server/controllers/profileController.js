const User = require("../models/user.model");
const mongoose=require("mongoose")
// @desc    Get user profile
// @route   GET /api/faculty/profile/:userId
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("user id in getprofile :",userId)

    // Find the user by ID
    const user = await User.findById(userId).select("-password -resetPasswordToken -resetPasswordExpires -deletedAt");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/faculty/profile
// @access  Private

exports.updateUserProfile = async (req, res) => {
  console.log(req.body)
  try {
    const { userId, ...userData } = req.body;

    console.log("Received request to update user profile:", { userId, userData }); // Log the request

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      console.error("User not found:", userId); // Log the error
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update allowed fields
    const allowedFields = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "address",
      "profile_picture",
      "gender",
      "dob",
      "pincode",
    ];

    allowedFields.forEach((field) => {
      if (userData[field] !== undefined && userData[field] !== null && userData[field] !== "") {
        user[field] = userData[field];
      }
    });

    console.log("Updated user data:", user); // Log the updated user data

    // Save the updated user
    const updatedUser = await user.save();
    console.log("User profile updated successfully:", updatedUser); // Log the success

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      return res.status(400).json({ success: false, message: "Validation error", errors });
    }

    // Handle other errors
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};