const mongoose = require('mongoose');

// Define the schema for the Attendance model
const attendanceSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }, // Reference to the Student model
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },     // Reference to the Batch model
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },   // Reference to the Course model
  date: { type: Date, required: true }, // Date of the class (e.g., "2025-02-01")
  status: { type: String, required: true, enum: ['Present', 'Absent', 'Late'], default: 'Absent' }, // Attendance status
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date
});

module.exports = mongoose.model('Attendance', attendanceSchema); // Use 'attendance' as the model name
