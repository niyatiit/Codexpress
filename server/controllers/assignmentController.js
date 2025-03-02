const Assignment = require("../models/assignment.model");
const Course = require("../models/course.model");

// Fetch all assignments with optional filtering by course
exports.getAssignments = async (req, res) => {
  try {
    const { course_id } = req.query;

    let query = {};
    if (course_id) {
      query.course_id = course_id;
    }

    const assignments = await Assignment.find(query)
      .populate("course_id", "name") // Populate course name
      .populate("batch_id", "name"); // Populate batch name

    // Format the response
    const formattedAssignments = assignments.map((assignment) => ({
      _id: assignment._id,
      title: assignment.title,
      course_id: assignment.course_id._id, // Include course_id for filtering
      course_name: assignment.course_id.name,
      batch_id: assignment.batch_id._id, // Include batch_id for filtering
      batch_name: assignment.batch_id.name, // Include batch_name
      due_date: assignment.due_date,
      file_url: assignment.file_url, // Include file URL
    }));

    res.status(200).json({ assignments: formattedAssignments });
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
};