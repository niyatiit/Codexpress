const { body, query, param } = require('express-validator');

exports.validateAttendance = [
  body('date').isISO8601().toDate().withMessage('Invalid date format'),
  body('batch_id').isMongoId().withMessage('Invalid batch ID'),
  body('course_id').isMongoId().withMessage('Invalid course ID'),
  body('attendance').isArray({ min: 1 }).withMessage('Attendance data is required'),
  body('attendance.*.student_id').isMongoId().withMessage('Invalid user ID'),
  body('attendance.*.status').isIn(['Present', 'Absent', 'Late']).withMessage('Invalid status')
];

exports.validateAttendanceQuery = [
  query('batchId').optional().isMongoId(),
  query('courseId').optional().isMongoId(),
  query('userId').optional().isMongoId(),  // Changed from studentId to userId
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601()
];