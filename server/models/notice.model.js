const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true }, // Trimmed to remove unnecessary spaces
  description: { type: String, required: true, trim: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Made required for consistency
  batches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }], // Ensuring at least one batch is selected
  posted_on: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

module.exports = mongoose.model('Notice', noticeSchema);
