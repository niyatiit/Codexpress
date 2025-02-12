const mongoose = require('mongoose');

// Define the schema for the Faculty model
const FacultySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to the User model
  department: { type: String, required: true }, // Department the faculty belongs to (e.g., "Computer Science")
  subjects: [{ type: String }], // List of subjects the faculty teaches (e.g., ["Java", "C++"])
  qualification: { type: String, required: true }, // Faculty qualification (e.g., "M.Tech in CS")
  experience: { type: Number, required: true, min: 0 }, // Years of teaching experience
  designation: { type: String, required: true }, // Faculty designation (e.g., "Assistant Professor")
  doj: { type: Date, required: true }, // Date of Joining (DOJ)
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }, // Faculty status
  created_at: { type: Date, default: Date.now }, // Record creation timestamp
  updated_at: { type: Date, default: Date.now } // Last updated timestamp
});

module.exports = mongoose.model('faculty', FacultySchema); // Use 'faculty' as the model name
