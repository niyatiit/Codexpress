const mongoose = require('mongoose');

// Define the schema for the Student model
const studentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, // Reference to the Batch model
  enrollment_date: { type: Date, default: Date.now }, // Enrollment date (defaults to current date)
  country: { type: String, default: 'India' }, // Fixed country field
});

module.exports = mongoose.model('Student', studentSchema); // Use 'student' as the model name
