const mongoose = require('mongoose');

// Define the schema for the Payment model
const paymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user (student/faculty) making the payment
  amount: { type: Number, required: true }, // The amount of payment
  payment_date: { type: Date, default: Date.now }, // The date when the payment was made
  payment_method: { type: String, enum: ['credit_card', 'debit_card', 'net_banking', 'upi', 'cash'], required: true }, // Payment method used
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }, // Status of the payment
  reference_number: { type: String, unique: true }, // A unique reference number for the payment
  description: { type: String }, // An optional description about the payment
  payment_for: { type: String, enum: ['course_fee', 'exam_fee', 'other'], required: true }, // What the payment is for (course fee, exam fee, etc.)
});

module.exports = mongoose.model('Payment', paymentSchema); // Use 'payment' as the model name
