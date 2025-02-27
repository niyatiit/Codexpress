const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  addNewCourse,
  updateCourse,
  deleteCourse,
  assignCourseToFaculty,
  getCoursesByFaculty,
  addResourceToCourse,
  removeResourceFromCourse,
  getBatchesByCourse,
  checkEnrollment,
  enrollInCourse
} = require("../controllers/courseController");
const {authenticate}=require("../middleware/authMiddleware")

// Public routes
router.get("/", getAllCourses); // Get all courses
router.get("/:id", authenticate,getCourseById); // Get a single course by ID
router.get("/:id/is-enrolled",authenticate, checkEnrollment);

// Admin-only routes
router.post("/add", addNewCourse); // Add a new course
router.put("/update/:id", updateCourse); // Update an existing course
// router.delete("/delete/:id", deleteCourse); // Delete a course

// Faculty-related routes
router.post("/assign-faculty", assignCourseToFaculty); // Assign a course to a faculty
router.get("/faculty/:facultyId", getCoursesByFaculty); // Get all courses assigned to a faculty



// Enroll in a course
router.post("/:id/enroll",enrollInCourse);

// Course resources routes (optional)
router.post("/:id/add-resource", addResourceToCourse); // Add a resource to a course
// router.delete("/:id/remove-resource/:resourceId", removeResourceFromCourse); // Remove a resource from a course

router.get('/:courseId/batches',getBatchesByCourse)
module.exports = router;