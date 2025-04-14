const { body, query, param } = require('express-validator');

exports.validateAttendance = [
  body('date').isISO8601().toDate().withMessage('Invalid date format'),
  body('batch_id').isMongoId().withMessage('Invalid batch ID'),
  body('course_id').isMongoId().withMessage('Invalid course ID'),
  body('attendance').isArray({ min: 1 }).withMessage('Attendance data is required'),
  body('attendance.*.student_id').isMongoId().withMessage('Invalid user ID'),
  body('attendance.*.status').isIn(['Present', 'Absent', 'Late']).withMessage('Invalid status')
];


exports.validateAttendanceMarking = [
  body('date').isISO8601().toDate().withMessage('Valid date (ISO format) required'),
  body('batch_id').isMongoId().withMessage('Valid batch ID required'),
  body('course_id').isMongoId().withMessage('Valid course ID required'),
  body('attendance').isArray({ min: 1 }).withMessage('Attendance array with at least one record required'),
  body('attendance.*.user_id').isMongoId().withMessage('Valid user ID required in attendance records'),
  body('attendance.*.status').isIn(['Present', 'Absent', 'Late']).withMessage('Invalid status value')
];

exports.validateAttendanceUpdate = [
  param('date').isISO8601().toDate().withMessage('Valid date (ISO format) required'),
  param('batch_id').isMongoId().withMessage('Valid batch ID required'),
  param('course_id').isMongoId().withMessage('Valid course ID required'),
  param('user_id').isMongoId().withMessage('Valid user ID required'),
  body('status').isIn(['Present', 'Absent', 'Late']).withMessage('Invalid status value')
];

exports.validateAttendanceQuery = [
  query('date').optional().isISO8601().toDate(),
  query('batch_id').optional().isMongoId(),
  query('course_id').optional().isMongoId(),
  query('startDate').optional().isISO8601().toDate(),
  query('endDate').optional().isISO8601().toDate()
];