const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    required: true,
    index: true  // For faster querying by date
  },
  batch_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Batch', 
    required: true 
  },
  course_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  faculty_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attendance: [{
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['Present', 'Absent', 'Late'],
      default: 'Absent'
    },
    _id: false  // Disable automatic _id for subdocuments
  }],
  created_at: { 
    type: Date, 
    default: Date.now 
  }
}, {
  // Add compound index to prevent duplicate attendance for same date+batch+course
  indexes: [
    {
      unique: true,
      partialFilterExpression: { date: { $type: 'date' } },
      fields: { date: 1, batch_id: 1, course_id: 1 }
    }
  ]
});

// Add virtual for easier status counting
attendanceSchema.virtual('summary').get(function() {
  const present = this.attendance.filter(a => a.status === 'Present').length;
  const absent = this.attendance.filter(a => a.status === 'Absent').length;
  const late = this.attendance.filter(a => a.status === 'Late').length;
  const total = this.attendance.length;
  
  return {
    present,
    absent,
    late,
    total,
    percentage: total > 0 ? Math.round((present + late * 0.5) / total * 100) : 0
  };
});

module.exports = mongoose.model('Attendance', attendanceSchema);