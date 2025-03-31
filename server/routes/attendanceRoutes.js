const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { validateAttendance, validateAttendanceQuery } = require('../middleware/validation');

// Mark attendance for a batch
router.post('/', validateAttendance, attendanceController.markAttendance);

// Get attendance records (with optional filters)
router.get('/', validateAttendanceQuery, attendanceController.getAttendance);

// Get attendance for a specific user
router.get('/user/:userId', attendanceController.getUserAttendance);

// Get attendance for a specific batch
router.get('/batch/:batchId', attendanceController.getBatchAttendance);

// Update attendance record
router.put('/:id', validateAttendance, attendanceController.updateAttendance);

module.exports = router;