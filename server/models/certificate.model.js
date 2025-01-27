const mongoose = require('mongoose');

// Define the schema for the Certificate model
const CertificateSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to the user (student/faculty) receiving the certificate
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true }, // Reference to the course for which the certificate is issued
  certificate_number: { type: String, unique: true, required: true }, // Unique certificate number
  issue_date: { type: Date, default: Date.now }, // Date when the certificate is issued
  expiry_date: { type: Date }, // Optional expiry date for the certificate (if applicable)
  certificate_type: { type: String, enum: ['completion', 'achievement', 'participation'], required: true }, // Type of certificate (completion, achievement, participation)
  issued_by: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Reference to the user (admin/faculty) who issued the certificate
  status: { type: String, enum: ['issued', 'revoked'], default: 'issued' }, // Status of the certificate (issued or revoked)
});

module.exports = mongoose.model('certificate', CertificateSchema); // Use 'certificate' as the model name
