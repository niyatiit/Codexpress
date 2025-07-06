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
// In your attendance controller file
exports.checkAttendanceExists = async (req, res) => {
  try {
    const { date, batch_id, course_id } = req.query;

    if (!date || !batch_id || !course_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters'
      });
    }

    const attendance = await Attendance.findOne({
      date: new Date(date),
      batch_id,
      course_id
    });

    res.json({
      exists: !!attendance
    });
  } catch (error) {
    console.error('Error checking attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking attendance'
    });
  }
};
exports.getStudentAttendanceHistory = async (req, res) => {
  try {
    const studentId = req.user.id.toString();

    const records = await Attendance.find({
      'attendance.user_id': studentId
    })
      .select('date batch_id course_id attendance')
      .populate('batch_id', 'name')
      .populate('course_id', 'name')
      .sort({ date: -1 });

    // Filter only this student's attendance from the array
    const result = records.map((record) => {
      const studentRecord = record.attendance.find(a => a.user_id.toString() === studentId.toString());
      return {
        _id: record._id,
        date: record.date,
        status: studentRecord?.status || 'N/A',
        batch: record.batch_id.name,
        course: record.course_id.name
      };
    });
    console.log("result : ",result)

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Error fetching student attendance history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
      error: error.message
    });
  }
};
exports.getAttendanceSummary = async (req, res) => {
  try {
    // Destructure query parameters from the request
    const { courseId, batchId, startDate, endDate } = req.query;

    // Validate required parameters
    if (!courseId || !batchId || !startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters." });
    }

    // Convert startDate and endDate into Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Query the attendance records that match the courseId, batchId and date range.
    // If your course_id and batch_id fields are stored as ObjectId, then convert them.
    const attendanceRecords = await Attendance.find({
      course_id: new mongoose.Types.ObjectId(courseId),
      batch_id: new mongoose.Types.ObjectId(batchId),
      date: { $gte: start, $lte: end },
    }).lean();

    // Initialize accumulators
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;
    let studentIds = new Set();
    const dailyData = [];

    // Process each attendance record to build daily data and accumulate summary info
    attendanceRecords.forEach((record) => {
      // Counters for the current day
      let presentCount = 0;
      let absentCount = 0;
      let lateCount = 0;

      // Loop through the attendance array in the record
      record.attendance.forEach((entry) => {
        // Count each status accordingly
        if (entry.status === "Present") {
          presentCount++;
        } else if (entry.status === "Absent") {
          absentCount++;
        } else if (entry.status === "Late") {
          lateCount++;
        }
        // Add student id to the set to track total students overall
        studentIds.add(entry.user_id.toString());
      });

      // Add the daily summary into the dailyData array.
      // Optionally, format the date as needed.
      dailyData.push({
        date: record.date, // You can use a formatted string if required
        present: presentCount,
        absent: absentCount,
        late: lateCount,
      });

      // Accumulate totals
      totalPresent += presentCount;
      totalAbsent += absentCount;
      totalLate += lateCount;
    });

    // Assuming that each record logs attendance for all students,
    // the total number of unique student ids encountered is the totalStudents.
    const totalStudents = studentIds.size;

    // Build the summary object
    const summary = {
      totalStudents,
      totalPresent,
      totalAbsent,
      totalLate,
    };

    // Return the data as JSON
    return res.status(200).json({ dailyData, summary });
  } catch (error) {
    console.error("Error in getAttendanceSummary:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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