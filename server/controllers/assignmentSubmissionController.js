const AssignmentSubmission = require('../models/assignmentSubmission.model');
const Assignment = require('../models/assignment.model');
const User = require('../models/user.model');
const fs = require('fs');
const path = require('path');

// Submit an assignment
exports.submitAssignment = async (req, res) => {
  try {
    const { assignment_id } = req.params;
    const student_id = req.user.id; // Assuming user is authenticated

    // Check if assignment exists
    const assignment = await Assignment.findById(assignment_id);
    console.log("here : ",assignment)
    if (!assignment) {
      // Delete the uploaded file if assignment doesn't exist
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }

    // Check if student is enrolled in the course/batch
    // const isEnrolled = await User.findOne({
    //   _id: student_id,
    //   enrolled_courses: {
    //     $elemMatch: {
    //       course_id: assignment.course_id,
    //       batch_id: assignment.batch_id,
    //       enrollment_status: 'enrolled'
    //     }
    //   }
    // });

    // if (!isEnrolled) {
    //   // Delete the uploaded file if student is not enrolled
    //   if (req.file) {
    //     fs.unlinkSync(req.file.path);
    //   }
    //   return res.status(403).json({
    //     success: false,
    //     message: 'You are not enrolled in this course/batch'
    //   });
    // }

    // Determine if submission is late
    const isLate = new Date() > new Date(assignment.due_date);
    const status = isLate ? 'late' : 'submitted';

    // Check for existing submission
    const existingSubmission = await AssignmentSubmission.findOne({
      assignment_id,
      student_id
    });

    let submission;
    const file_url = `/assignment-submissions/${path.basename(req.file.path)}`;

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
          $unset: { grade: 1, feedback: 1, feedback_at: 1 } // Remove previous grading if resubmitting
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
};

// Get all submissions for an assignment (for faculty)
exports.getSubmissionsForAssignment = async (req, res) => {
  try {
    const { assignment_id } = req.params;

    const submissions = await AssignmentSubmission.find({ assignment_id })
      .populate('student_id', 'name email')
      .sort({ submitted_at: -1 });

    res.status(200).json({
      success: true,
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

// Get a single submission
exports.getSubmission = async (req, res) => {
  try {
    const { submission_id } = req.params;

    const submission = await AssignmentSubmission.findById(submission_id)
      .populate('student_id', 'name email')
      .populate('assignment_id', 'title due_date');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
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

// Grade an assignment (for faculty)
exports.gradeAssignment = async (req, res) => {
  try {
    const { submission_id } = req.params;
    const { grade, feedback } = req.body;

    if (grade && (grade < 0 || grade > 100)) {
      return res.status(400).json({
        success: false,
        message: 'Grade must be between 0 and 100'
      });
    }

    const submission = await AssignmentSubmission.findByIdAndUpdate(
      submission_id,
      {
        grade,
        feedback,
        feedback_at: new Date(),
        status: 'graded'
      },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Assignment graded successfully',
      data: submission
    });
  } catch (error) {
    console.error('Error grading assignment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to grade assignment',
      error: error.message
    });
  }
};