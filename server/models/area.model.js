const mongoose = require('mongoose');

// Define the schema for the Area model
const AreaSchema = new mongoose.Schema({
  name: { type: String, required: true },          // Name of the area (e.g., "Downtown")
  city: { type: mongoose.Schema.Types.ObjectId, ref:"city" },          // City to which the area belongs
  state: {type: mongoose.Schema.Types.ObjectId, ref:"state" },         // State to which the area belongs
  zip_code: { type: String, required: false },     // Optional field for the area's ZIP code
  created_at: { type: Date, default: Date.now },   // Automatically set the creation date
});

// Export the model
module.exports = mongoose.model('area', AreaSchema); // Use 'area' as the model name
