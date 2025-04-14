const express = require("express");
const router = express.Router();
const { getUser,updateUser,addNewStudent, getAllUsers, getProfile,getAuthenticatedFaculty, updateProfile, getFaculties, getStudents } = require("../controllers/userController");
const {authenticate}=require("../middleware/authMiddleware")
// Define specific routes first
router.get("/", getAllUsers);
router.get("/me", getProfile);
router.post("/",addNewStudent)
// Update user profile
router.put("/me", updateProfile);

router.get("/faculty",getFaculties); // Fetch users with role "faculty"
router.get("/faculty/:userId",authenticate,getAuthenticatedFaculty); // Fetch "faculty"
router.get("/student", getStudents); // Fetch users with role "student"
// Define dynamic routes last   
router.get("/:id",authenticate, getUser); // Fetch a specific user by ID
router.put("/:id",authenticate, updateUser); // Fetch a specific user by ID

module.exports = router;