const mongoose = require('mongoose');

// Define the schema for the State model
const StateSchema = new mongoose.Schema({
  name: { type: String, required: true },           // Name of the state
//   abbreviation: { type: String },                  // Optional abbreviation (e.g., "MH" for Maharashtra)
//   country: { type: String, default: 'India' },     // Country is restricted to India
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'city' }], // References to cities in the state
  created_at: { type: Date, default: Date.now },    // Automatically set the creation date
});

module.exports = mongoose.model('state', StateSchema); // Use 'state' as the model name
