const express = require("express");
const {
  getEnrollmentStats,
  getFacultyCount,
  getCourseCount,
  getTotalPayments,
  getRecentEnrollments,
  getTopCourses,
} = require("../controllers/adminController");

const router = express.Router();

// Routes for admin dashboard data
router.get("/enrollments", getEnrollmentStats);
router.get("/faculties", getFacultyCount);
router.get("/courses", getCourseCount);
router.get("/payments", getTotalPayments);
router.get("/recent-enrollments", getRecentEnrollments); // New route for recent enrollments
router.get("/top-courses", getTopCourses); // New route for top courses

module.exports = router;