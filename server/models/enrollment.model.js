const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courses: [
    {
      course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      },
      batch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch', // Assuming you have a Batch model
        default: null, // Optional, if batches are not always applicable
      },
      enrollment_status: {
        type: String,
        enum: ['pending', 'enrolled', 'cancelled'],
        default: 'pending',
      },
      payment_status: {
        type: String,
        enum: ['unpaid', 'paid', 'failed'],
        default: 'unpaid',
      },
      enrolled_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);