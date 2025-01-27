const mongoose = require('mongoose');

// Define the schema for the City model
const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },           // Name of the city
  state: { type: String, required: true },          // State to which the city belongs
//   country: { type: String, required: true },        // Country to which the city belongs
//   population: { type: Number, required: false },    // Optional field for the city's population
  area_code: { type: String, required: false },     // Optional field for the city's area code
  created_at: { type: Date, default: Date.now },    // Automatically set the creation date
});

// Export the model
module.exports = mongoose.model('city', CitySchema); // Use 'city' as the model name
