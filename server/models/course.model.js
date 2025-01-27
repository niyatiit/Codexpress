const mongoose = require('mongoose');

// Define the schema for the Course model
const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },         // Name of the course (e.g., "Full Stack Development")
  code: { type: String, required: true, unique: true }, // Unique course code (e.g., "CSE101")
  duration: { type: String, required: true },     // Duration of the course (e.g., "6 months")
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'faculty' }, // Reference to the faculty teaching the course
  description: { type: String },                 // Optional description of the course
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date
});

module.exports = mongoose.model('course', CourseSchema); // Use 'course' as the model name
