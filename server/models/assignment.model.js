const mongoose = require('mongoose');

// Define the schema for the Assignment model
const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the assignment
  description: { type: String, required: true }, // Description of the assignment
  due_date: { type: Date, required: true }, // Due date for the assignment
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true }, // Reference to the Course model
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'faculty', required: true }, // Reference to the Faculty model
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'batch', required: true }, // Reference to the Batch model
  student_submissions: [{ 
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'student' }, // Reference to the Student model
    submission_date: { type: Date }, // Date when the student submitted the assignment
    file_url: { type: String }, // URL to the submitted file
    grade: { type: String, enum: ['A', 'B', 'C', 'D', 'F'], default: 'F' }, // Grade given to the student for the assignment
  }],
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date
});

module.exports = mongoose.model('assignment', AssignmentSchema); // Use 'assignment' as the model name
