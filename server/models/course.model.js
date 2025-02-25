const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, uppercase: true },
  duration: { type: String, required: true, match: /^[0-9]+ (month|months|year|years)$/ },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  prerequisites: [{ type: String, trim: true }],
  category: { 
    type: String, 
    enum: ['Development', 'Design', 'Data Science'], 
    required: true 
  },
  description: { type: String, trim: true },
  thumbnail: { type: String },
  status: { type: String, enum: ['open', 'closed', 'upcoming'], default: 'Open' },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviews: [{ 
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, 
    comment: { type: String, trim: true },
    rating: { type: Number, min: 0, max: 5 }
  }],
  total_students_enrolled: { type: Number, default: 0, min: 0 },
  tags: [{ type: String, trim: true }],
  syllabus: [{ type: String, trim: true }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);