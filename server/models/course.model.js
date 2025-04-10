const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // Course name
  code: { type: String, required: true, unique: true, uppercase: true }, // Course code
  duration: { type: String, required: true, match: /^[0-9]+ (month|months|year|years)$/ }, // Course duration
  price: { type: Number, required: true, min: 0 }, // Course price
  discount: { type: Number, default: 0, min: 0, max: 100 }, // Discount percentage
  prerequisites: [{ type: String, trim: true }], // Prerequisites for the course
  category: { type: String, enum: ['Development', 'Design', 'Data Science'], required: true }, // Course category
  description: { type: String, trim: true }, // Course description
  thumbnail: { type: String }, // URL or path to the course thumbnail
  status: { type: String, enum: ['open', 'closed', 'upcoming'], default: 'open' }, // Course status
  rating: { type: Number, min: 0, max: 5, default: 0 }, // Course rating
  reviews: [{
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the Student model
    comment: { type: String, trim: true }, // Review comment
    rating: { type: Number, min: 0, max: 5 } // Review rating
  }],
  total_students_enrolled: { type: Number, default: 0, min: 0 }, // Total students enrolled
  tags: [{ type: String, trim: true }], // Course tags
  syllabus: [{ type: String, trim: true }], // Course syllabus
  batch_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }], // Reference to all batches for this course
  resources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);