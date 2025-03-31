const Attendance = require('../models/attendance.model');
const Batch = require('../models/batch.model');
const Enrollment = require('../models/enrollment.model');
const User = require('../models/user.model');
const Course = require('../models/course.model');
const mongoose = require('mongoose');

// Helper function to validate MongoDB IDs

// Mark attendance for multiple students
// Helper function to validate MongoDB ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Mark attendance for multiple students
exports.markAttendance = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { date, batch_id, course_id, attendance } = req.body;
    const marked_by = req.user._id; // Assuming you have auth middleware

    // Validate required fields
    if (!date || !batch_id || !course_id || !attendance) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missing: {
          ...(!date && { date: 'Date is required' }),
          ...(!batch_id && { batch_id: 'Batch ID is required' }),
          ...(!course_id && { course_id: 'Course ID is required' }),
          ...(!attendance && { attendance: 'Attendance data is required' })
        }
      });
    }

    // Validate MongoDB IDs
    if (!mongoose.Types.ObjectId.isValid(batch_id) || 
        !mongoose.Types.ObjectId.isValid(course_id)) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    // Check if batch belongs to course
    const batch = await Batch.findById(batch_id).session(session);
    if (!batch || batch.course_id.toString() !== course_id) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Batch does not belong to the specified course'
      });
    }

    // Validate attendance array
    if (!Array.isArray(attendance) || attendance.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Attendance data must be a non-empty array'
      });
    }

    // Extract student IDs and validate
    const studentIds = attendance.map(item => item.student_id);
    if (new Set(studentIds).size !== studentIds.length) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Duplicate student IDs found'
      });
    }

    // Check if all students exist and are enrolled
    const [students, enrollments] = await Promise.all([
      User.find({ _id: { $in: studentIds } }).session(session),
      Enrollment.find({ 
        batch_id, 
        user_id: { $in: studentIds } 
      }).session(session)
    ]);

    // Validate students
    const invalidStudents = studentIds.filter(id => 
      !students.some(s => s._id.toString() === id)
    );
    if (invalidStudents.length > 0) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Some students not found',
        invalidStudents
      });
    }

    // Validate enrollments
    const notEnrolled = studentIds.filter(id => 
      !enrollments.some(e => e.user_id.toString() === id)
    );
    if (notEnrolled.length > 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Some students are not enrolled in this batch',
        notEnrolled
      });
    }

    // Prepare attendance records
    const attendanceRecords = attendance.map(item => ({
      user_id: item.student_id,
      batch_id,
      course_id,
      date: new Date(date),
      status: item.status,
      marked_by
    }));

    // Insert attendance records
    const result = await Attendance.insertMany(attendanceRecords, { session });

    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: result
    });

  } catch (error) {
    await session.abortTransaction();
    
    // Handle duplicate key error (unique index violation)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Attendance already marked for one or more students today'
      });
    }

    console.error('Attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

// Get attendance records with filters
exports.getAttendance = async (req, res) => {
  try {
    const { batchId, courseId, userId, startDate, endDate, status } = req.query;
    const filter = {};

    // Apply filters if provided
    if (batchId && isValidId(batchId)) filter.batch_id = batchId;
    if (courseId && isValidId(courseId)) filter.course_id = courseId;
    if (userId && isValidId(userId)) filter.user_id = userId;
    if (status) filter.status = status;

    // Date range filtering
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        const start = new Date(startDate);
        if (!isNaN(start.getTime())) filter.date.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        if (!isNaN(end.getTime())) filter.date.$lte = end;
      }
    }

    // Query with population
    const attendance = await Attendance.find(filter)
      .populate({
        path: 'user_id',
        select: 'username email',
        model: User
      })
      .populate('batch_id', 'name')
      .populate('course_id', 'name')
      .sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance
    });

  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance records',
      error: error.message
    });
  }
};

// Get attendance for a specific user with additional details
exports.getUserAttendance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate, status } = req.query;

    // Validate user ID
    if (!isValidId(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    const filter = { user_id: userId };
    
    // Date filtering
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        const start = new Date(startDate);
        if (!isNaN(start.getTime())) filter.date.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        if (!isNaN(end.getTime())) filter.date.$lte = end;
      }
    }

    // Status filtering
    if (status) filter.status = status;

    const attendance = await Attendance.find(filter)
      .populate({
        path: 'batch_id',
        select: 'name startDate endDate',
        model: Batch
      })
      .populate({
        path: 'course_id',
        select: 'name code',
        model: Course
      })
      .sort({ date: -1 });

    // Calculate attendance summary
    const totalRecords = attendance.length;
    const presentCount = attendance.filter(a => a.status === 'Present').length;
    const absentCount = attendance.filter(a => a.status === 'Absent').length;
    const lateCount = attendance.filter(a => a.status === 'Late').length;
    const attendancePercentage = totalRecords > 0 
      ? Math.round((presentCount + lateCount * 0.5) / totalRecords * 100)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        records: attendance,
        summary: {
          totalRecords,
          presentCount,
          absentCount,
          lateCount,
          attendancePercentage
        }
      }
    });

  } catch (error) {
    console.error('Error fetching user attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user attendance',
      error: error.message
    });
  }
};

// Enhanced batch attendance with statistics
exports.getBatchAttendance = async (req, res) => {
  try {
    const { batchId } = req.params;
    const { date, startDate, endDate } = req.query;

    // Validate batch ID
    if (!isValidId(batchId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid batch ID format'
      });
    }

    const filter = { batch_id: batchId };

    // Specific date or date range
    if (date) {
      const attendanceDate = new Date(date);
      if (!isNaN(attendanceDate.getTime())) {
        filter.date = {
          $gte: new Date(attendanceDate.setHours(0, 0, 0, 0)),
          $lt: new Date(attendanceDate.setHours(23, 59, 59, 999))
        };
      }
    } else if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        const start = new Date(startDate);
        if (!isNaN(start.getTime())) filter.date.$gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        if (!isNaN(end.getTime())) filter.date.$lte = end;
      }
    }

    // Get attendance records
    const attendance = await Attendance.find(filter)
      .populate({
        path: 'user_id',
        select: 'username',
        model: User
      })
      .sort({ date: -1 });

    // Get all enrollments for the batch
    const enrollments = await Enrollment.find({ batch_id: batchId })
      .populate('user_id', 'username')
      .select('user_id rollNumber');

    // Create mapping of user IDs to roll numbers
    const enrollmentMap = enrollments.reduce((map, enrollment) => {
      map[enrollment.user_id._id.toString()] = enrollment.rollNumber;
      return map;
    }, {});

    // Group by date and calculate statistics
    const attendanceByDate = attendance.reduce((acc, record) => {
      const dateStr = record.date.toISOString().split('T')[0];
      
      if (!acc[dateStr]) {
        acc[dateStr] = {
          date: record.date,
          users: [],
          stats: {
            total: 0,
            present: 0,
            absent: 0,
            late: 0,
            percentage: 0
          }
        };
      }

      const userData = {
        user_id: record.user_id._id,
        name: record.user_id.username,
        rollNumber: enrollmentMap[record.user_id._id.toString()] || 'N/A',
        status: record.status
      };

      acc[dateStr].users.push(userData);
      
      // Update statistics
      acc[dateStr].stats.total++;
      if (record.status === 'Present') acc[dateStr].stats.present++;
      if (record.status === 'Absent') acc[dateStr].stats.absent++;
      if (record.status === 'Late') acc[dateStr].stats.late++;
      
      acc[dateStr].stats.percentage = Math.round(
        (acc[dateStr].stats.present + acc[dateStr].stats.late * 0.5) / 
        acc[dateStr].stats.total * 100
      );

      return acc;
    }, {});

    // Convert to array and sort by date
    const result = Object.values(attendanceByDate).sort((a, b) => b.date - a.date);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error fetching batch attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch batch attendance',
      error: error.message
    });
  }
};

// Enhanced attendance update with validation
exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate attendance ID
    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid attendance record ID'
      });
    }

    // Validate status
    const validStatuses = ['Present', 'Absent', 'Late'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
        validStatuses
      });
    }

    // Find and update the record
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate({
      path: 'user_id',
      select: 'username',
      model: User
    }).populate('batch_id', 'name');

    if (!updatedAttendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance updated successfully',
      data: updatedAttendance
    });

  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update attendance',
      error: error.message
    });
  }
};