const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true }, // Full name of the user
  email: { type: String, required: true, unique: true }, // Unique email
  password: { type: String, required: true }, // Encrypted password
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'role', required: true }, // Reference to Role model
  phone: { type: String, required: true, unique: true }, // Contact number
  profile_picture: { type: String, default: "" }, // Optional profile picture URL
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }, // Gender field
  dob: { type: Date }, // Date of birth
  address: { type: String, required: true }, // Address of the user
  pincode: { type: String, required: true }, // Postal code
  state: { type: mongoose.Schema.Types.ObjectId, ref: 'state', required: true }, // Reference to State model
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'city', required: true }, // Reference to City model
  nationality: { type: String, default: "Indian" }, // Nationality field
  is_active: { type: Boolean, default: true }, // User status (Active/Inactive)
  is_verified: { type: Boolean, default: false }, // Email verification status
  last_login: { type: Date }, // Last login timestamp
  created_at: { type: Date, default: Date.now }, // Automatically set creation date
  updated_at: { type: Date, default: Date.now } // Automatically update when modified
});

// Middleware to update `updated_at` before saving changes
UserSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('user', UserSchema);
