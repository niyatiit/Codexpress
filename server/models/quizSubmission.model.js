const mongoose = require('mongoose');

// Define the schema for the QuickSubmission model
const QuickSubmissionSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true }, // Reference to the Student model
  quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'quiz', required: true }, // Reference to the Quiz model
  answers: [{
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'quizQuestion', required: true }, // Reference to the QuizQuestion model
    selected_option: { type: mongoose.Schema.Types.ObjectId, ref: 'quizOption', required: true } // Reference to the QuizOption model
  }],
  submission_time: { type: Date, default: Date.now }, // Time when the submission was made
  score: { type: Number, default: 0 }, // Score for the submission, will be calculated later
  submitted: { type: Boolean, default: false }, // Whether the submission is marked as completed
});

module.exports = mongoose.model('quickSubmission', QuickSubmissionSchema); // Use 'quickSubmission' as the model name
