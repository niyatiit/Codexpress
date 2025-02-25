const express = require("express");
const router = express.Router();
const {getAllFaculty,getFacultyById,updateFaculty}=require('../controllers/facultyController')

router.get("/",getAllFaculty)
router.get("/:id", getFacultyById);

router.put("/update/:id",updateFaculty)

module.exports = router;
