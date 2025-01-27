const mongoose = require('mongoose');

// Define the schema for the Feedback model
const FeedbackSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'student', required: true }, // Reference to the Student model
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'faculty', required: true }, // Reference to the Faculty model (if feedback is related to a faculty)
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true }, // Reference to the Course model (if feedback is related to a course)
  feedback_text: { type: String, required: true }, // The actual feedback text provided by the student
  rating: { type: Number, min: 1, max: 5, required: true }, // Rating given by the student (e.g., 1 to 5 stars)
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date of the feedback
  updated_at: { type: Date, default: Date.now }, // Timestamp for when the feedback was last updated
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' }, // The status of the feedback (whether it's pending or resolved)
});

module.exports = mongoose.model('feedback', FeedbackSchema); // Use 'feedback' as the model name
