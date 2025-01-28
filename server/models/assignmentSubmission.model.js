const mongoose = require('mongoose');

// Define the schema for the AssignmentSubmission model
const AssignmentSubmissionSchema = new mongoose.Schema({
  assignment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'assignment', required: true }, // Reference to the Assignment model
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true }, // Reference to the Student model
  submission_date: { type: Date, required: true }, // Date when the student submitted the assignment
  file_url: { type: String, required: true }, // URL to the submitted file
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date
});

module.exports = mongoose.model('assignmentSubmission', AssignmentSubmissionSchema); // Use 'assignmentSubmission' as the model name
