const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }, // Reference to the Batch model (not required)
  enrollment_date: { type: Date, default: Date.now }, // Enrollment date (defaults to current date)
  status: { type: String, enum: ['active', 'inactive', 'completed'], default: 'active' }, // Student status
});

module.exports = mongoose.model('Student', studentSchema);