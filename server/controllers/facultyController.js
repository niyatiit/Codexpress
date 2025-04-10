const Faculty = require("../models/faculty.model");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const mongoose = require("mongoose");
const Course = require("../models/course.model");

exports.getAssignedCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find faculty by user_id (not _id)
    const faculty = await Faculty.findOne({ user_id: userId }).populate("courses");

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found.",
      });
    }

    // Fetch assigned courses
    const assignedCourses = faculty.courses;

    res.status(200).json({
      success: true,
      courses: assignedCourses,
    });
  } catch (error) {
    console.error("Error fetching assigned courses:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

exports.getAllFaculty = async (req, res) => {
  try {
    const faculties = await Faculty.find().populate("user_id")
    res.status(200).json({ faculties });
  } catch (err) { // Ensure consistency in variable naming
    console.error("Get All Faculties Error:", err);
    res.status(500).json({ message: "Error fetching faculties", error: err.message });
  }
};

exports.getFacultyById = async (req, res) => {
  const { id } = req.params;
  console.log("id is ", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid faculty ID" });
  }

  try {
    const faculty = await Faculty.findById(id).populate("user_id");
    // const faculty = await Faculty.findById(id);
console.log("Faculty Found:", faculty);

    if (!faculty) {
      return res.status(404).json({ success: false, message: "Faculty not found" });
    }
    res.json({ success: true, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

exports.updateFaculty = async (req, res) => {
  try {
    const { department, designation, doj, experience, status } = req.body;
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { department, designation, doj, experience, status },
      { new: true }
    );
    if (!faculty) {
      return res.status(404).json({ success: false, message: "Faculty not found" });
    }
    res.status(200).json({ success: true, data: faculty });
  } catch (error) {
    console.error("Error updating faculty:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getFacultyCourses= async(req,res)=>{
  const { id } = req.params;
  console.log("id is ", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid faculty ID" });
  }

  try {
    const faculty = await Faculty.findById(id).populate("courses");
    // const faculty = await Faculty.findById(id);
console.log("Faculty Found:", faculty);

    if (!faculty) {
      return res.status(404).json({ success: false, message: "Faculty course not found" });
    }
    res.json({ success: true, data: faculty.courses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
}

// Update user and faculty profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId, userData, facultyData } = req.body;

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update faculty profile (if facultyData is provided)
    if (facultyData) {
      await Faculty.findOneAndUpdate(
        { user_id: userId },
        { $set: facultyData },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};


exports.createFaculty = async (req, res) => {
  try {
    const { user_id, department, experience, designation, doj, qualifications } = req.body;

    // Validate required fields
    if (!user_id || !department || !experience || !designation || !doj) {
      return res.status(400).json({ success: false, message: "All required fields must be provided." });
    }

    // Check if the user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Fetch the user's role
    const role = await Role.findById(user.role);
    if (!role || role.name !== "faculty") {
      return res.status(400).json({ success: false, message: "Selected user is not a faculty member." });
    }

    // Check if faculty already exists
    const existingFaculty = await Faculty.findOne({ user_id });
    if (existingFaculty) {
      return res.status(400).json({ success: false, message: "Faculty record already exists for this user." });
    }

    // Convert data types
    const parsedExperience = Number(experience);
    if (isNaN(parsedExperience)) {
      return res.status(400).json({ success: false, message: "Experience must be a number." });
    }

    // Convert DOJ to Date format
    const parsedDOJ = new Date(doj);
    if (isNaN(parsedDOJ.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid Date of Joining format." });
    }

    // Convert qualifications to an array (if it's not already)
    const formattedQualifications = Array.isArray(qualifications)
      ? qualifications
      : qualifications.split(",").map((q) => q.trim());

    // Create faculty entry
    const newFaculty = new Faculty({
      user_id,
      department,
      experience: parsedExperience,
      designation,
      doj: parsedDOJ,
      qualifications: formattedQualifications,
    });

    await newFaculty.save();

    res.status(201).json({ success: true, message: "Faculty created successfully!", faculty: newFaculty });
  } catch (error) {
    console.error("Error creating faculty:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};
