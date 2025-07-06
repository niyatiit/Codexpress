const mongoose = require("mongoose")
const Enrollment = require("../models/enrollment.model")
const Batch = require('../models/batch.model');


exports.checkEnrollmentStatus = async (req, res) => {
  const userId = req.user.id;
  try {
    // Check if the user is a student
    if (req.user.role !== "student") {
      return res.json({ isStudent: false, isEnrolled: false });
    }

    // Check if the student is enrolled in at least one course
    const enrollment = await Enrollment.findOne({ user_id: userId });

    if (!enrollment || enrollment.courses.length === 0) {
      return res.json({ isStudent: true, isEnrolled: false });
    }

    res.json({ isStudent: true, isEnrolled: true });
  } catch (error) {
    console.error("🚨 Error checking enrollment status:", error);
    res.status(500).json({ error: "Failed to check enrollment status." });
  }
}


exports.getEnrolledStudents = async (req, res) => {
  try {
    const Enrollments = await Enrollment.find({ paymentStatus: 'Paid', batchId: null }).populate('courseId');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrolled students', error });
  }
};

// Assign batch to a student
exports.assignBatch = async (req, res) => {
  try {
    const { batchId } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { batchId },
      { new: true }
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error assigning batch', error });
  }
};
