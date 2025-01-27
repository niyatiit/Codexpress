const mongoose = require('mongoose');

// Define the schema for the Role model
const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Role name (e.g., 'Admin', 'Student', 'Faculty')
  description: { type: String },                        // Optional description of the role
  created_at: { type: Date, default: Date.now },        // Automatically set the creation date
});

module.exports = mongoose.model('role', RoleSchema); // Use 'role' as the model name
