const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

// Enroll a user in a course
router.post('/enroll', enrollmentController.enrollUser);

// Update enrollment status
router.put('/enrollments/:enrollmentId', enrollmentController.updateEnrollmentStatus);

// Get all enrollments for a user (including multiple courses)
router.get('/users/:user_id/enrollments', enrollmentController.getUserEnrollments);

module.exports = router;