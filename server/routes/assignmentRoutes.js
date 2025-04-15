const express = require("express");
const upload = require("../config/multerConfig");
const assignmentController = require("../controllers/assignmentController");
const submissionController = require("../controllers/assignmentSubmissionController");
const Assignment = require("../models/assignment.model");
const assignmentMulter = require("../utils/assignmentMulterConfig");

const router = express.Router();

// Route to create assignments for multiple batches
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, description, due_date, course_id, faculty_id, batch_ids } = req.body;
    const file_url = req.file ? req.file.path : null;

    const batchIdsArray = JSON.parse(batch_ids);

    const assignments = batchIdsArray.map((batch_id) => ({
      title,
      description,
      due_date,
      course_id,
      faculty_id,
      batch_id,
      file_url,
    }));

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

// Fetch assignments for a specific course and batch
router.get("/course/:courseId/batch/:batchId", async (req, res) => {
  try {
    const { courseId, batchId } = req.params;

    const assignments = await Assignment.find({
      course_id: courseId,
      batch_id: batchId
    })
      .populate("course_id", "name")
      .populate("batch_id", "name")
      .sort({ due_date: 1 });

    res.status(200).json({
      success: true,
      data: assignments
    });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch assignments",
      error: error.message,
    });
  }
});

// Fetch 5 most recent assignments
router.get("/recent", async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .sort({ created_at: -1 })
      .limit(5)
      .populate("course_id", "name")
      .populate("batch_id", "name");

    res.status(200).json({ assignments });
  } catch (error) {
    console.error("Error fetching recent assignments:", error);
    res.status(500).json({ error: "Failed to fetch recent assignments" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("course_id", "name")
      .populate("batch_id", "name")
      .populate("faculty_id", "name");

    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch assignment",
      error: error.message,
    });
  }
});

// Fetch all assignments
router.get("/", assignmentController.getAssignments);

router.post(
  "/submit/:assignment_id",
  assignmentMulter.single("file"),
  submissionController.submitAssignment
);

router.get(
  "/submissions/:assignment_id",
  submissionController.getSubmissionsForAssignment
);

router.get(
  "/submission/:submission_id",
  submissionController.getSubmission
);

router.put(
  "/grade/:submission_id",
  submissionController.gradeAssignment
);

module.exports = router;