const mongoose = require('mongoose');

// Define the schema for the Course model
const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // Course name
  code: { type: String, required: true, unique: true, uppercase: true }, // Unique course code
  duration: { type: String, required: true, match: /^[0-9]+ (month|months|year|years)$/ }, // Duration format validation
  faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'faculty', required: true }, // Faculty reference
  
  // Pricing and Discounts
  price: { type: Number, required: true, min: 0 }, // Course price
  discount: { type: Number, default: 0, min: 0, max: 100 }, // Discount percentage (e.g., 10 for 10% off)
  
  // Additional Course Info
  prerequisites: [{ type: String, trim: true }], // List of required skills/courses
  category: { 
    type: String, 
    enum: ['Development', 'Design', 'Marketing', 'Finance', 'Business', 'Data Science'], 
    required: true 
  }, // Course category
  max_students: { type: Number, default: 50, min: 1 }, // Maximum students allowed
  description: { type: String, trim: true }, // Course description
  thumbnail: { type: String }, // Image URL
  created_at: { type: Date, default: Date.now }, // Automatically set creation date
  
  // Enrollment Status
  status: { 
    type: String, 
    enum: ['Open', 'Closed', 'Upcoming'], 
    default: 'Open' 
  }, // Course enrollment status
  
  // Ratings & Reviews
  rating: { type: Number, min: 0, max: 5, default: 0 }, // Course rating (out of 5)
  reviews: [{ 
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'student' }, 
    comment: { type: String, trim: true },
    rating: { type: Number, min: 0, max: 5 }
  }], // Student reviews

  // Batch Information
  batches: [{
    batch_name: { type: String, required: true }, // Batch name (e.g., "Morning Batch")
    start_date: { type: Date, required: true }, // Start date of the batch
    end_date: { type: Date, required: true }, // End date of the batch
    timings: { type: String, required: true } // Batch timings (e.g., "10 AM - 12 PM")
  }]
});

// Export the model
module.exports = mongoose.model('course', CourseSchema);
