const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to the Course model
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, // Reference to the Batch model
  amount: { type: Number, required: true }, // The amount of payment
  payment_date: { type: Date, default: Date.now }, // The date when the payment was made
  payment_method: { type: String, enum: ['credit_card', 'debit_card', 'net_banking', 'upi', 'cash'], required: true }, // Payment method used
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }, // Status of the payment
  reference_number: { type: String, required: true, unique: true }, // A unique reference number for the payment
  description: { type: String }, // An optional description about the payment
  payment_for: { type: String, enum: ['course_fee', 'exam_fee', 'other'], required: true }, // What the payment is for
});

module.exports = mongoose.model('Payment', paymentSchema);