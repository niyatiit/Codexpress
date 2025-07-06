const express = require("express");
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  addNewCourse,
  updateCourse,
  deleteCourse,
  getCoursesByFaculty,
  addResourceToCourse,
  removeResourceFromCourse,
  getBatchesByCourse,
  checkEnrollment,
  enrollInCourse,
  unassignFaculty,
  assignFacultyToCourse
} = require("../controllers/courseController");
const { authenticate } = require("../middleware/authMiddleware")
const reviewController = require("../controllers/reviewController")
// Public routes
router.get("/", getAllCourses); // Get all courses
router.get("/:id", authenticate, getCourseById); // Get a single course by ID
router.get("/:id/is-enrolled", authenticate, checkEnrollment);

// Admin-only routes
router.post("/add", addNewCourse); // Add a new course
router.put("/update/:id", updateCourse); // Update an existing course
// router.delete("/delete/:id", deleteCourse); // Delete a course

// Faculty-related routes
router.get("/faculty/:facultyId", getCoursesByFaculty); // Get all courses assigned to a faculty

router.post("/assign-faculty", assignFacultyToCourse);


// Enroll in a course
router.post("/:id/enroll", enrollInCourse);

// Course resources routes (optional)
router.post("/:id/add-resource", addResourceToCourse); // Add a resource to a course
// router.delete("/:id/remove-resource/:resourceId", removeResourceFromCourse); // Remove a resource from a course
router.delete('/courses/:courseId/unassign-faculty/:facultyId', 
  authenticate, 
  unassignFaculty
);

router.post('/:courseId/reviews', reviewController.submitReview);
router.get('/:courseId/batches', getBatchesByCourse)
module.exports = router;