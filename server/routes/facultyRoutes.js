const express = require("express");
const router = express.Router();
const {getAllFaculty,getFacultyById,createFaculty,updateFaculty,updateProfile}=require('../controllers/facultyController')

router.post("/create", createFaculty);
router.get("/",getAllFaculty)

router.put("/update/:id",updateFaculty)
router.put("/profile",updateProfile)
router.get("/:id", getFacultyById);
module.exports = router;
