const Attendance = require('../models/attendance.model');
const Batch = require('../models/batch.model');
const Course = require('../models/course.model');
const mongoose = require('mongoose');

// Mark daily attendance
exports.markDailyAttendance = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { date, batch_id, course_id, attendance } = req.body;
    const faculty_id = req.user.id; // Faculty marking the attendance

    // Validate required fields
    const missingFields = [];
    if (!date) missingFields.push('date');
    if (!batch_id) missingFields.push('batch_id');
    if (!course_id) missingFields.push('course_id');
    if (!attendance) missingFields.push('attendance');

    if (missingFields.length > 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields
      });
    }

    // Validate MongoDB IDs
    const invalidIds = [];
    if (!mongoose.Types.ObjectId.isValid(batch_id)) invalidIds.push('batch_id');
    if (!mongoose.Types.ObjectId.isValid(course_id)) invalidIds.push('course_id');
    if (attendance.some(a => !mongoose.Types.ObjectId.isValid(a.user_id))) {
      invalidIds.push('user_id in attendance array');
    }

    if (invalidIds.length > 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format',
        invalidIds
      });
    }

    // Check if batch belongs to course
    const batch = await Batch.findOne({
      _id: batch_id,
      course_id: course_id
    }).session(session);

    if (!batch) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Batch not found or does not belong to the specified course'
      });
    }

    // Validate attendance array structure
    if (!Array.isArray(attendance) )
      {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Attendance must be an array'
      });
    }

    // Check for duplicate student IDs
    const studentIds = attendance.map(a => a.user_id);
    if (new Set(studentIds).size !== studentIds.length) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Duplicate student IDs found in attendance data'
      });
    }

    // Create attendance document
    const attendanceDate = new Date(date);
    const attendanceDoc = new Attendance({
      date: attendanceDate,
      batch_id,
      course_id,
      faculty_id,
      attendance
    });

    // Save the document
    const savedAttendance = await attendanceDoc.save({ session });

    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: savedAttendance
    });

  } catch (error) {
    await session.abortTransaction();
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Attendance already marked for this date, batch, and course combination'
      });
    }

    console.error('Error marking attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark attendance',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

exports.getDailyAttendance = async (req, res) => {
  try {
    const { date, batchId, courseId } = req.query;
    // console.log("Request Query:", req.query);

    if (!date || !batchId || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'Date, batchId, and courseId are required parameters'
      });
    }

    // Parse date in UTC to avoid timezone issues
    const attendanceDate = new Date(date);
    const startDate = new Date(Date.UTC(
      attendanceDate.getUTCFullYear(),
      attendanceDate.getUTCMonth(),
      attendanceDate.getUTCDate()
    ));
    const endDate = new Date(Date.UTC(
      attendanceDate.getUTCFullYear(),
      attendanceDate.getUTCMonth(),
      attendanceDate.getUTCDate() + 1
    ));

    const attendance = await Attendance.findOne({
      date: { $gte: startDate, $lt: endDate },
      batch_id: batchId,
      course_id: courseId
    })
      .populate('batch_id', 'name')
      .populate('course_id', 'name code')
      .populate('faculty_id', 'name email')
      .populate('attendance.user_id', 'first_name last_name email');

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'No attendance record found for the selected date'
      });
    }

    const attendanceObj = attendance.toObject();
    attendanceObj.summary = attendance.summary;

    res.status(200).json({
      success: true,
      data: attendanceObj
    });

  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance',
      error: error.message
    });
  }
};


// Update attendance status for a student
exports.updateStudentAttendance = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { date, batch_id, course_id, user_id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['Present', 'Absent', 'Late'].includes(status)) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    // Create date range
    const attendanceDate = new Date(date);
    const startDate = new Date(attendanceDate.setHours(0, 0, 0, 0));
    const endDate = new Date(attendanceDate.setHours(23, 59, 59, 999));

    // Find and update the attendance record
    const updatedAttendance = await Attendance.findOneAndUpdate(
      {
        date: { $gte: startDate, $lte: endDate },
        batch_id,
        course_id,
        'attendance.user_id': user_id
      },
      {
        $set: { 'attendance.$.status': status }
      },
      {
        new: true,
        runValidators: true,
        session
      }
    )
    .populate('attendance.user_id', 'name rollNumber');

    if (!updatedAttendance) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: 'Attendance updated successfully',
      data: updatedAttendance
    });

  } catch (error) {
    await session.abortTransaction();
    console.error('Error updating attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update attendance',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};