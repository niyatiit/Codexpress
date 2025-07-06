const mongoose = require('mongoose');

const assignmentSubmissionSchema = new mongoose.Schema({
  assignment_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Assignment', 
    required: true 
  },
  student_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  file_url: { 
    type: String, 
    required: true 
  },
  original_filename: {
    type: String,
    required: true
  },
  submitted_at: { 
    type: Date, 
    default: Date.now 
  },
  status: {
    type: String,
    enum: ['submitted', 'late', 'graded', 'rejected'],
    default: 'submitted'
  },
  grade: {
    type: Number,
    min: 0,
    max: 100
  },
  feedback: {
    type: String
  },
  feedback_at: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for faster queries
assignmentSubmissionSchema.index({ assignment_id: 1, student_id: 1 }, { unique: true });

module.exports = mongoose.model('AssignmentSubmission', assignmentSubmissionSchema);