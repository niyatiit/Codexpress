const mongoose = require('mongoose');

// Define the schema for the QuizOption model
const quizOptionSchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestion', required: true }, // Reference to the QuizQuestion model
  option_text: { type: String, required: true }, // The text for the option
  is_correct: { type: Boolean, required: true }, // Whether this option is correct
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date
});

module.exports = mongoose.model('QuizOption', quizOptionSchema); // Use 'quizOption' as the model name
