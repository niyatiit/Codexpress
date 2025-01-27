const mongoose = require('mongoose');

// Define the schema for the LeaveApplication model
const LeaveApplicationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to the user (student/faculty) who is applying for leave
  leave_type: { type: String, enum: ['sick', 'vacation', 'personal', 'emergency'], required: true }, // Type of leave being requested
  reason: { type: String, required: true }, // Reason for taking the leave
  start_date: { type: Date, required: true }, // Leave start date
  end_date: { type: Date, required: true }, // Leave end date
  application_date: { type: Date, default: Date.now }, // Date when the application was made
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Status of the leave application (pending, approved, or rejected)
  approved_by: { type: mongoose.Schema.Types.ObjectId, ref: 'faculty', required: false }, // Reference to the faculty/staff who approved the leave (if applicable)
  reason_for_rejection: { type: String, required: false }, // Reason for rejection (if the leave is rejected)
});

module.exports = mongoose.model('leaveApplication', LeaveApplicationSchema); // Use 'leaveApplication' as the model name
