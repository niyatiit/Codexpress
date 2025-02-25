const mongoose = require('mongoose');

// Define the schema for the Enrollment model
const enrollmentSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the student (User model)
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to the course the student is enrolling in
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, // Reference to the batch the student is enrolled in
  enrollment_date: { type: Date, default: Date.now }, // Date when the student enrolled
  enrollment_status: { type: String, enum: ['active', 'completed', 'dropped', 'suspended'], default: 'active' }, // Current status of the enrollment
});

module.exports = mongoose.model('Enrollment', enrollmentSchema); // Use 'enrollment' as the model name
