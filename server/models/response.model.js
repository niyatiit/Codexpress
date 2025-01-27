const mongoose = require('mongoose');

// Define the schema for the Response model
const ResponseSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true }, // Reference to the Student model
  quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: 'quiz', required: true }, // Reference to the Quiz model
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'quizQuestion', required: true }, // Reference to the QuizQuestion model
  selected_option: { type: mongoose.Schema.Types.ObjectId, ref: 'quizOption', required: true }, // Reference to the QuizOption model
  is_correct: { type: Boolean, required: true }, // Whether the selected option is correct
  feedback: { type: String }, // Feedback for the student regarding the answer
  response_time: { type: Date, default: Date.now }, // Time when the student submitted the response
  submitted: { type: Boolean, default: false }, // Whether the response is marked as completed
});

module.exports = mongoose.model('response', ResponseSchema); // Use 'response' as the model name
