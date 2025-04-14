const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { validateAttendance, validateAttendanceQuery } = require('../middleware/validation');
const auth=require("../middleware/authMiddleware")
// Mark attendance for a batch
router.post('/', auth.userVerification, attendanceController.markDailyAttendance);

// Get attendance records (with optional filters)
router.get('/', validateAttendanceQuery, attendanceController.getDailyAttendance);


// Update attendance record
router.put('/:id', validateAttendance, attendanceController.updateStudentAttendance);

module.exports = router;