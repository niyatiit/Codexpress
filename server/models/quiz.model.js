const mongoose = require('mongoose');

// Define the schema for the Quiz model
const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the quiz
  description: { type: String }, // Description of the quiz
  questions: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: 'quizQuestion' }], // Array of references to quiz questions
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true }, // Reference to the Course model
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'faculty', required: true }, // Reference to the Faculty model
  duration: { type: Number, required: true }, // Duration of the quiz in minutes
  start_date: { type: Date, required: true }, // Start date and time for the quiz
  end_date: { type: Date, required: true }, // End date and time for the quiz
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date
});

module.exports = mongoose.model('quiz', QuizSchema); // Use 'quiz' as the model name
