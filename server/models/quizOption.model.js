const mongoose = require('mongoose');

// Define the schema for the QuizOption model
const QuizOptionSchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'quizQuestion', required: true }, // Reference to the QuizQuestion model
  option_text: { type: String, required: true }, // The text for the option
  is_correct: { type: Boolean, required: true }, // Whether this option is correct
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date
});

module.exports = mongoose.model('quizOption', QuizOptionSchema); // Use 'quizOption' as the model name
