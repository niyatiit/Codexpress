const Assignment = require("../models/assignment.model");
const AssignmentSubmission = require("../models/assignmentSubmission.model");
const Course = require("../models/course.model");
const User = require('../models/user.model');
const mongoose=require("mongoose")
// const assignmentMulter=require("../utils/assignmentMulterConfig")
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
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/assignment-submissions');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only certain file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(extname)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, DOCX, and TXT files are allowed'), false);
  }
};

// Configure upload middleware
const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
}).single('file'); // 'file' should match the field name in FormData

exports.submitAssignment = async (req, res) => {
  // First handle the file upload
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    try {
      const { assignment_id } = req.params;
      const student_id = req.user.id;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      // Check if assignment exists
      const assignment = await Assignment.findById(assignment_id);
      if (!assignment) {
        fs.unlinkSync(req.file.path);
        return res.status(404).json({
          success: false,
          message: 'Assignment not found'
        });
      }

      // Determine if submission is late
      const isLate = new Date() > new Date(assignment.due_date);
      const status = isLate ? 'late' : 'submitted';

      // Check for existing submission
      const existingSubmission = await AssignmentSubmission.findOne({
        assignment_id,
        student_id
      });

      let submission;
      const file_url = `/assignment-submissions/${req.file.filename}`;

      if (existingSubmission) {
        // Delete the old file
        const oldFilePath = path.join(__dirname, '../uploads', existingSubmission.file_url);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }

        // Update existing submission
        submission = await AssignmentSubmission.findByIdAndUpdate(
          existingSubmission._id,
          {
            file_url,
            original_filename: req.file.originalname,
            submitted_at: new Date(),
            status,
            $unset: { grade: 1, feedback: 1, feedback_at: 1 }
          },
          { new: true }
        );
      } else {
        // Create new submission
        submission = await AssignmentSubmission.create({
          assignment_id,
          student_id,
          file_url,
          original_filename: req.file.originalname,
          status
        });
      }

      res.status(200).json({
        success: true,
        message: 'Assignment submitted successfully',
        data: submission
      });

    } catch (error) {
      console.error('Error submitting assignment:', error);
      
      // Delete the uploaded file if error occurs
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({
        success: false,
        message: 'Failed to submit assignment',
        error: error.message
      });
    }
  });
};

// Get submission for a specific assignment and student
exports.getSubmissionForAssignmentOfStudent = async (req, res) => {
  try {
    const { assignment_id, user_id } = req.params;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(assignment_id) || 
        !mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    // Check if assignment exists
    const assignment = await Assignment.findById(assignment_id);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    // Check if user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find the submission
    const submission = await AssignmentSubmission.findOne({
      assignment_id,
      student_id: user_id
    }).populate('student_id', 'first_name last_name email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found for this student and assignment'
      });
    }

    res.status(200).json({
      success: true,
      data: submission
    });

  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submission',
      error: error.message
    });
  }
};

// Get all submissions for a specific assignment
exports.getSubmissionsForAssignment = async (req, res) => {
  try {
    const { assignment_id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(assignment_id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid assignment ID format'
      });
    }

    // Check if assignment exists
    const assignment = await Assignment.findById(assignment_id);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    // Find all submissions for this assignment
    const submissions = await AssignmentSubmission.find({
      assignment_id
    })
    .populate('student_id', 'first_name last_name email')
    .sort({ submitted_at: -1 });

    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions',
      error: error.message
    });
  }
};

exports.getFacultySubmissions = async (req, res) => {
  try {
    const facultyId = req.user.id;

    // First get all assignments created by this faculty
    const facultyAssignments = await Assignment.find({ faculty_id: facultyId });

    if (!facultyAssignments.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No assignments found for this faculty'
      });
    }

    // Get submissions for these assignments
    const submissions = await AssignmentSubmission.find({
      assignment_id: { $in: facultyAssignments.map(a => a._id) }
    })
    .populate('student_id', 'first_name last_name email')
    .populate('assignment_id', 'title due_date')
    .sort({ submitted_at: -1 });

    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });

  } catch (error) {
    console.error('Error fetching faculty submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch submissions',
      error: error.message
    });
  }
};

// Get assignments created by faculty with submission counts
exports.getFacultyAssignments = async (req, res) => {
  try {
    const facultyId = req.user.id;

    const assignments = await Assignment.find({ faculty_id: facultyId })
      .populate('course_id', 'name')
      .populate('batch_id', 'name')
      .sort({ created_at: -1 });

    // Get submission counts for each assignment
    const assignmentsWithCounts = await Promise.all(
      assignments.map(async (assignment) => {
        const counts = await AssignmentSubmission.aggregate([
          { $match: { assignment_id: assignment._id } },
          { $group: { 
            _id: '$status', 
            count: { $sum: 1 } 
          }}
        ]);

        const countsObj = counts.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {});

        return {
          ...assignment.toObject(),
          submissionCounts: countsObj
        };
      })
    );

    res.status(200).json({
      success: true,
      data: assignmentsWithCounts
    });

  } catch (error) {
    console.error('Error fetching faculty assignments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch assignments',
      error: error.message
    });
  }
};