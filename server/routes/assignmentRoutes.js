const express = require("express");
const upload = require("../config/multerConfig"); // Import Multer configuration
const Assignment = require("../models/assignment.model"); // Import your Assignment model
const assignmentController = require("../controllers/assignmentController");

const router = express.Router();

// Fetch all assignments

// Route to handle assignment creation with file upload
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, description, due_date, course_id,faculty_id,batch_ids } = req.body;
    const file_url = req.file ? req.file.path : null; // Get the file path

    // Parse batch_ids from JSON string to array
    const batchIdsArray = JSON.parse(batch_ids);

    // Create an assignment for each selected batch
    const assignments = batchIdsArray.map((batch_id) => ({
      title,
      description,
      due_date,
      course_id,
      faculty_id,
      batch_id,
      file_url,
    }));

    // Save all assignments to the database
    const createdAssignments = await Assignment.insertMany(assignments);

    res.status(201).json({
      success: true,
      message: "Assignments created successfully",
      data: createdAssignments,
    });
  } catch (error) {
    console.error("Error creating assignments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create assignments",
      error: error.message,
    });
  }
});

// Fetch recently uploaded assignments
router.get("/recent", async (req, res) => {
  try {
      const assignments = await Assignment.find()
          .sort({ created_at: -1 }) // Sort by most recent
          .limit(5) // Limit to 5 most recent assignments
          .populate("course_id", "name")
          .populate("batch_id", "name");

      res.status(200).json({ assignments });
  } catch (error) {
      console.error("Error fetching recent assignments:", error);
      res.status(500).json({ error: "Failed to fetch recent assignments" });
  }
});
router.get("/", assignmentController.getAssignments);// Fetch all courses


module.exports = router;