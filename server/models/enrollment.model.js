const mongoose = require('mongoose');

// Define the schema for the Enrollment model
const EnrollmentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to the student (User model)
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true }, // Reference to the course the student is enrolling in
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'batch', required: true }, // Reference to the batch the student is enrolled in
  enrollment_date: { type: Date, default: Date.now }, // Date when the student enrolled
  enrollment_status: { type: String, enum: ['active', 'completed', 'dropped', 'suspended'], default: 'active' }, // Current status of the enrollment
  grade: { type: String, enum: ['A', 'B', 'C', 'D', 'F'], default: 'N/A' }, // Optional grade after course completion
});

module.exports = mongoose.model('enrollment', EnrollmentSchema); // Use 'enrollment' as the model name
