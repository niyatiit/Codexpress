const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // Batch name
  start_date: { type: Date, required: true }, // Batch start date
  end_date: { type: Date, required: true }, // Batch end date
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to the Course model
  faculty_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // Assigned instructors
  total_seats: { type: Number, required: true, min: 1 }, // Total seats in the batch
  seats_available: { type: Number, default: function () { return this.total_seats; }, min: 0 }, // Available seats
  batch_type: { type: String, enum: ['Weekend', 'Weekday', 'Crash Course'], default: 'Weekday' }, // Type of batch
  batch_description: { type: String, trim: true } // Batch description
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);