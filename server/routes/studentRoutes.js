const express = require('express')
const router = express.Router()
const { checkEnrollmentStatus, getEnrolledStudents, assignBatch } = require('../controllers/studentController');
const { userVerification, authenticate } = require('../middleware/authMiddleware')
const mongoose=require('mongoose')
const Assignment = require("../models/assignment.model");
const Enrollment = require("../models/enrollment.model");
const Batch = require("../models/batch.model");

// Fetch student's course progress

router.get("/progress/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Fetch enrollments for the user and populate nested fields
      const enrollments = await Enrollment.find({ user_id: userId })
        .populate({
          path: "courses.course_id", // Populate course_id inside the courses array
          select: "name", // Only select the 'name' field of the course
        })
        .populate({
          path: "courses.batch_id", // Populate batch_id inside the courses array
          select: "start_date end_date", // Only select the 'start_date' and 'end_date' fields of the batch
        });
  
      // Calculate progress for each enrollment
      const enrollmentsWithProgress = enrollments.map((enrollment) => {
        return {
          ...enrollment.toObject(),
          courses: enrollment.courses.map((course) => {
            if (course.batch_id) {
              const { start_date, end_date } = course.batch_id;
              const totalDuration = end_date - start_date; // Total duration in milliseconds
              const elapsedDuration = Date.now() - start_date; // Elapsed duration in milliseconds
  
              let progress = (elapsedDuration / totalDuration) * 100;
              progress = Math.min(100, Math.max(0, progress)); // Ensure progress is between 0 and 100
  
              return {
                ...course.toObject(),
                progress: Math.round(progress), // Round to the nearest integer
              };
            } else {
              // If batch_id is null, set progress to 0
              return {
                ...course.toObject(),
                progress: 0,
              };
            }
          }),
        };
      });
  
      res.status(200).json({ enrollments: enrollmentsWithProgress });
    } catch (error) {
      console.error("Error fetching student progress:", error);
      res.status(500).json({ error: "Failed to fetch student progress" });
    }
  });


router.get("/check-enrollment", authenticate, checkEnrollmentStatus);
router.get('/enrolled', getEnrolledStudents);

// Assign batch to a student
router.put('/:id/assign-batch', assignBatch);

module.exports = router;