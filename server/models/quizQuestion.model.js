const mongoose = require('mongoose');

// Define the schema for the QuizQuestion model
const QuizQuestionSchema = new mongoose.Schema({
  question_text: { type: String, required: true }, // Text of the question
  options: [{ 
    option_text: { type: String, required: true }, // Text for each option
    is_correct: { type: Boolean, required: true }  // Mark correct answer
  }],
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date
});

module.exports = mongoose.model('quizQuestion', QuizQuestionSchema); // Use 'quizQuestion' as the model name
