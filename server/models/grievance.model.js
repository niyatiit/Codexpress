const mongoose = require('mongoose');

// Define the schema for the Grievance model
const grievanceSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user (student/faculty) who raised the grievance
  grievance_type: { type: String, enum: ['academic', 'administrative', 'others'], required: true }, // Type of grievance
  description: { type: String, required: true }, // Detailed description of the grievance
  raised_on: { type: Date, default: Date.now }, // Date when the grievance was raised
  resolved_on: { type: Date }, // Date when the grievance was resolved
  status: { type: String, enum: ['pending', 'resolved', 'closed'], default: 'pending' }, // Status of the grievance (pending, resolved, or closed)
  handled_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: false }, // Reference to the faculty or staff who is handling the grievance (if applicable)
  response: { type: String }, // Response or action taken on the grievance
});

module.exports = mongoose.model('Grievance', grievanceSchema); // Use 'grievance' as the model name
