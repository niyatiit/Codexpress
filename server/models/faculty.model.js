const mongoose = require('mongoose');

// Define the schema for the Faculty model
const FacultySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to the User model
  department: { type: String, required: true }, // Department the faculty belongs to (e.g., "Computer Science")
  subjects: [{ type: String }], // List of subjects the faculty teaches (e.g., ["Java", "C++"])
  joining_date: { type: Date, default: Date.now }, // Joining date of the faculty
//   country: { type: String, default: 'India' }, // Fixed country field
});

module.exports = mongoose.model('faculty', FacultySchema); // Use 'faculty' as the model name
