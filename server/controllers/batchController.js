const Course = require("../models/course.model")
const Batch = require("../models/batch.model")
const Enrollment = require("../models/enrollment.model")
const Faculty = require("../models/faculty.model")
const mongoose = require('mongoose')
exports.addNewBatch = async (req, res) => {
  try {

    const newBatch = new Batch(req.body);
    await newBatch.save();

    res.status(201).json({ success: true, message: "Batch created successfully!", data: newBatch });
  } catch (error) {
    console.error("Error adding batch:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.updateBatch = async (req, res) => {
  try {
    const { name, start_date, end_date, batch_type, batch_description, total_seats } = req.body;
    const updatedBatch = await Batch.findByIdAndUpdate(
      req.params.id,
      { name, start_date, end_date, batch_type, batch_description, total_seats },
      { new: true }
    );
    if (!updatedBatch) {
      return res.status(404).json({ success: false, message: "Batch not found" });
    }
    res.status(200).json({ success: true, data: updatedBatch });
  } catch (error) {
    console.error("Error updating batch:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getBatchById = async (req, res) => {
  try {
    const { id } = req.params; // Extract batch ID from request params

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid batch ID format" });
    }

    // Find the batch by ID
    const batch = await Batch.findById(id);

    // If batch not found, return 404
    if (!batch) {
      return res.status(404).json({ success: false, message: "Batch not found" });
    }

    // Return the batch data
    res.status(200).json({ success: true, data: batch });
  } catch (error) {
    console.error("Error fetching batch:", error);
    res.status(500).json({ success: false, message: "Error fetching batch" });
  }
};  
// Fetch batches by course ID
exports.getBatchesByCourse = async (req, res) => {
  try {
    const { course_id } = req.params; // Use req.params instead of req.query

    // Validate that course_id is provided and is a valid ObjectId
    if (!course_id || !mongoose.Types.ObjectId.isValid(course_id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or missing course ID" 
      });
    }

    // Convert course_id to ObjectId
    const courseObjectId = new mongoose.Types.ObjectId(course_id);

    // Fetch batches for the specific course
    const batches = await Batch.find({ course_id: courseObjectId })
      .populate("course_id", "name code") // Populate course details
      .populate("faculty_ids", "name email"); // Populate faculty details

    if (batches.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No batches found for this course" 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: batches 
    });
  } catch (error) {
    console.error("Error fetching batches:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching batches", 
      error: error.message 
    });
  }
};
// Get all batches
exports.getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find()
      .populate("course_id", "name code")
      .populate("faculty_ids", "name email");

    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching batches", error: error.message });
  }
};

// Delete a batch by ID
exports.deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Remove the batch ID from the course's batch_ids array
    await Course.updateMany({ batch_ids: req.params.id }, { $pull: { batch_ids: req.params.id } });

    res.status(200).json({ message: "Batch deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting batch", error: error.message });
  }
};

// Assign a student to a batch
exports.assignStudentToBatch = async (req, res) => {
  try {
    console.log(req.body  )
    const { enrollment_id, batch_id, course_id } = req.body;

    // Validate input
    if (!enrollment_id || !batch_id || !course_id) {
      return res.status(400).json({ message: "Missing required fields: enrollment_id, batch_id, or course_id" });
    }

    // Validate enrollment
    const enrollment = await Enrollment.findById(enrollment_id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Validate batch
    const batch = await Batch.findById(batch_id);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Check if the batch has available seats
    if (batch.seats_available <= 0) {
      return res.status(400).json({ message: "No seats available in this batch" });
    }

    // Find the course in the enrollment
    const course = enrollment.courses.find(
      (course) => course.course_id.toString() === course_id
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found in the enrollment" });
    }

    // Check if the student is already assigned to a batch for this course
    if (course.batch_id) {
      return res.status(400).json({ message: "Student is already assigned to a batch for this course" });
    }

    // Assign the batch to the student
    course.batch_id = batch_id;
    await enrollment.save();

    // Decrease available seats in the batch
    batch.seats_available -= 1;
    await batch.save();

    res.status(200).json({ message: "Student assigned to batch successfully", enrollment });
  } catch (error) {
    console.error("Error assigning student to batch:", error);
    res.status(500).json({ message: "Error assigning student to batch", error: error.message });
  }
};