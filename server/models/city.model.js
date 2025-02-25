const mongoose = require('mongoose');

// Define the schema for the City model
const citySchema = new mongoose.Schema({
  name: { type: String, required: true },           // Name of the city
  state: { type: mongoose.Schema.Types.ObjectId,ref:'State' },          // State to which the city belongs
  created_at: { type: Date, default: Date.now },    // Automatically set the creation date
});

// Export the model
module.exports = mongoose.model('City', citySchema); // Use 'city' as the model name
