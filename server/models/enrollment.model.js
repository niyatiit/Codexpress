const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to the Course model
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, // Reference to the Batch model
  enrollment_date: { type: Date, default: Date.now }, // Date when the student enrolled
  enrollment_status: { type: String, enum: ['active', 'completed', 'dropped', 'suspended'], default: 'active' }, // Enrollment status
  payment_status: { type: String, enum: ['paid', 'unpaid', 'partial'], default: 'unpaid' }, // Payment status for enrollment
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);