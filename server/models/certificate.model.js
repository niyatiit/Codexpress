const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  batch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Batch',
    required: true
  },
  certificate_number: {
    type: String,
    unique: true,
    required: true
  },
  certificate_url: {
    type: String,
    required: true
  },
  issue_date: {
    type: Date,
    default: Date.now
  },
  certificate_type: {
    type: String,
    enum: ['completion', 'achievement', 'participation'],
    default: 'completion',
    required: true
  },
  issued_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  verification_code: {
    type: String,
    unique: true,
    required: true
  }
}, {
  timestamps: true
});

// Only keep this compound index
certificateSchema.index({ user_id: 1, course_id: 1 });

module.exports = mongoose.model('Certificate', certificateSchema);
