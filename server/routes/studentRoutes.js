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
              path: "courses.course_id",
              select: "name",
          })
          .populate({
              path: "courses.batch_id",
              select: "start_date end_date",
          });

      // Calculate progress for each enrollment
      const enrollmentsWithProgress = enrollments.map((enrollment) => {
          return {
              ...enrollment.toObject(),
              courses: enrollment.courses
                  // Filter out courses without batches
                  .filter(course => course.batch_id)
                  .map((course) => {
                      const { start_date, end_date } = course.batch_id;
                      const now = Date.now();

                      // Convert dates to timestamps
                      const batchStart = new Date(start_date).getTime();
                      const batchEnd = new Date(end_date).getTime();

                      // Calculate durations
                      const totalDuration = batchEnd - batchStart;
                      const elapsedDuration = now - batchStart;

                      // Calculate progress (0-100)
                      let progress = 0;
                      if (totalDuration > 0) { // Prevent division by zero
                          progress = (elapsedDuration / totalDuration) * 100;
                          progress = Math.min(100, Math.max(0, progress)); // Clamp between 0-100
                      }

                      return {
                          ...course.toObject(),
                          progress: Math.round(progress), // Round to nearest integer
                      };
                  }),
          };
      });

      res.status(200).json({ enrollments: enrollmentsWithProgress });
  } catch (error) {
      console.error("Error fetching student progress:", error);
      res.status(500).json({ error: "Failed to fetch student progress" });
  }
});

router.get("/:userId/assigned-batches", async (req, res) => {
  try {
    const { userId } = req.params;

    const enrollments = await Enrollment.find({ user_id: userId })
      .populate({
        path: "courses.course_id",
        select: "name description",
      })
      .populate({
        path: "courses.batch_id",
        select: "name",
      });

    const assigned = [];
    const notassigned = [];

    enrollments.forEach(enrollment => {
      enrollment.courses.forEach(course => {
        if (course.batch_id) {
          assigned.push(course);  // If the course has a batch assigned
        } else {
          notassigned.push(course);  // If the course does not have a batch assigned
        }
      });
    });

    res.status(200).json({ assigned, notassigned });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});


router.get("/check-enrollment", authenticate, checkEnrollmentStatus);
router.get('/enrolled', getEnrolledStudents);

// Assign batch to a student
router.put('/:id/assign-batch', assignBatch);

module.exports = router;