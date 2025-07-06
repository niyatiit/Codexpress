const express = require("express");
const router = express.Router();
const { addNewBatch, updateBatch,getAllBatches,getBatchesByCourse,assignStudentToBatch, deleteBatch,getBatchById } = require("../controllers/batchController");

router.post("/add", addNewBatch); // Add a new batch
router.get("/:id", getBatchById); // Add a new batch
router.put("/update/:id", updateBatch); // Add a new batch
// Get all batches
router.get("/", getAllBatches);
router.get("/course/:course_id", getBatchesByCourse);

// Delete a batch by ID
router.delete("/delete/:id", deleteBatch);

// Assign a student to a batch
router.post("/assign-student", assignStudentToBatch);

module.exports = router;
