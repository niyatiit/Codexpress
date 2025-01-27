const mongoose = require('mongoose');

// Define the schema for the Batch model
const BatchSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Name of the batch (e.g., "Batch A", "Batch 1")
  start_date: { type: Date, required: true },   // Start date of the batch
  end_date: { type: Date, required: true },     // End date of the batch
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true }, // Reference to the Course model
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'faculty', required: true }, // Reference to the Faculty model
  student_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }], // Array of student references
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date
});

module.exports = mongoose.model('batch', BatchSchema); // Use 'batch' as the model name
