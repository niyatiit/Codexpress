const Assignment = require("../models/assignment.model");
const Course = require("../models/course.model");

// @desc    Get all assignments (optional filter by course_id)
// @route   GET /api/assignments
exports.getAssignments = async (req, res) => {
  try {
    const { course_id } = req.query;

    let query = {};
    if (course_id) {
      query.course_id = course_id;
    }

    const assignments = await Assignment.find(query)
      .populate("course_id", "name")
      .populate("batch_id", "name");

    const formattedAssignments = assignments.map((assignment) => ({
      _id: assignment._id,
      title: assignment.title,
      course_id: assignment.course_id._id,
      course_name: assignment.course_id.name,
      batch_id: assignment.batch_id._id,
      batch_name: assignment.batch_id.name,
      due_date: assignment.due_date,
      file_url: assignment.file_url,
    }));
    

    res.status(200).json({ assignments: formattedAssignments });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};

// @desc    Submit assignment by student
// @route   POST /api/assignments/submit/:assignment_id
exports.submitAssignment = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    const user_id = req.user._id; // user ID from auth middleware
    const file_url = req.file?.path;

    if (!file_url) {
      return res.status(400).json({ message: "File is required" });
    }

    const assignment = await Assignment.findById(assignment_id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const alreadySubmitted = assignment.submissions.some(
      (sub) => sub.user_id.toString() === user_id.toString()
    );
    if (alreadySubmitted) {
      return res.status(400).json({ message: "Assignment already submitted" });
    }

    assignment.submissions.push({
      user_id,
      file_url,
      submission_date: new Date(),
    });

    await assignment.save();
    res.status(200).json({ message: "Assignment submitted successfully" });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ error: "Failed to submit assignment" });
  }
};
