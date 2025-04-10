const express = require("express");
const router = express.Router();
const {getAllFaculty,getFacultyById,getFacultyCourses,createFaculty,updateFaculty,getAssignedCourses,updateProfile}=require('../controllers/facultyController')

router.post("/create", createFaculty);
router.get("/",getAllFaculty)
router.get("/:id/courses",getFacultyCourses)

router.put("/update/:id",updateFaculty)
router.put("/profile",updateProfile)
router.get("/:id", getFacultyById);
router.get("/:userId/assigned-courses", getAssignedCourses);

module.exports = router;
