const mongoose = require('mongoose');

// Define the schema for the Notice model
const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the notice
  description: { type: String, required: true }, // Detailed description of the notice
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'faculty', required: true }, // Reference to the faculty who created the notice
  posted_on: { type: Date, default: Date.now }, // Date when the notice was posted
  valid_until: { type: Date, required: true }, // The date until which the notice is valid
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }, // Status of the notice (active or inactive)
});

module.exports = mongoose.model('notice', NoticeSchema); // Use 'notice' as the model name
