const mongoose = require('mongoose');

// Define the schema for the Schedule model
const scheduleSchema = new mongoose.Schema({
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, // Reference to the Batch model
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to the Course model
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true }, // Reference to the Faculty model
  day: { type: String, required: true }, // Day of the week (e.g., "Monday")
  start_time: { type: String, required: true }, // Start time in HH:mm format (e.g., "09:00")
  end_time: { type: String, required: true }, // End time in HH:mm format (e.g., "12:00")
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date
});

module.exports = mongoose.model('Schedule', scheduleSchema); // Use 'schedule' as the model name
