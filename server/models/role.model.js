const mongoose = require("mongoose");

// Define the schema for the Role model
const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Role name (e.g., 'Admin', 'Student', 'Faculty')
  description: { type: String }, // Optional description of the role
  created_at: { type: Date, default: Date.now }, // Automatically set the creation date
});

// Ensure model name starts with an uppercase letter and matches references
module.exports = mongoose.model("Role", roleSchema); 
