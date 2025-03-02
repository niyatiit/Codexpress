const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const User = require("../models/user.model")
const Enrollment = require("../models/enrollment.model")
const enrollmentController = require('../controllers/enrollmentController');

// Enroll a user in a course
// router.post('/enroll', enrollmentController.enrollUser);

// Update enrollment status
// router.put('/enrollments/:enrollmentId', enrollmentController.updateEnrollmentStatus);

// Get all enrollments for a user (including multiple courses)
router.get('/user/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id; // Corrected

    // Check if the user exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch enrollments for the user
    const enrollments = await Enrollment.find({ user_id: userId });

    // Return the enrollments
    res.status(200).json({ enrollments });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/courses/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Check if the user exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch enrollments for the user and populate the course_id field
    const enrollments = await Enrollment.find({ user_id: userId }).populate({
      path: 'courses.course_id', // Path to populate
      model: 'Course', // Model to use for population
    });

    // Extract and format the enrolled courses
    const enrolledCourses = enrollments.flatMap((enrollment) =>
      enrollment.courses.map((course) => ({
        ...course.course_id.toObject(), // Spread the course details
        status: course.enrollment_status, // Add enrollment status to the course object
      }))
    );

    // Return the enrolled courses
    res.status(200).json({ courses: enrolledCourses });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get("/check-enrollment", async (req, res) => {
  const { userId, courseId } = req.query;

  if (!userId || !courseId) {
    return res.status(400).json({ error: "Missing userId or courseId." });
  }

  try {
    // Ensure ObjectId conversion only if IDs are valid
    const userObjectId = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : null;
    const courseObjectId = mongoose.Types.ObjectId.isValid(courseId)
      ? new mongoose.Types.ObjectId(courseId)
      : null;

    if (!userObjectId || !courseObjectId) {
      return res.status(400).json({ error: "Invalid userId or courseId format." });
    }

    console.log("Checking for enrollment:", {
      userId: userObjectId,
      courseId: courseObjectId,
    });

    const enrollment = await Enrollment.findOne({
      user_id: userObjectId,
      "courses.course_id": courseObjectId,
      "courses.enrollment_status": "enrolled",
    });

    console.log("Enrollment found:", enrollment);

    res.json({ isEnrolled: !!enrollment });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    res.status(500).json({ error: "Failed to check enrollment status." });
  }
});
// Fetch a single enrollment by ID
router.get("/course/:id", async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate("user_id", "username email")
      .populate("courses.course_id", "name");

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollment", error: error.message });
  }
});

// Fetch enrollments by status
router.get("/", async (req, res) => {
  try {
    const { status, date } = req.query;

    // Build the query
    const query = {};
    if (status) {
      query["courses.enrollment_status"] = status;
    }
    if (date) {
      query["courses.enrolled_at"] = {
        $gte: new Date(date).setHours(0, 0, 0, 0), // Start of the day
        $lt: new Date(date).setHours(23, 59, 59, 999), // End of the day
      };
    }

    // Fetch enrollments with filters
    const enrollments = await Enrollment.find(query)
      .populate("user_id", "username email first_name last_name")
      .populate("courses.course_id", "name");

    res.status(200).json({ success:true,enrollments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrollments", error: error.message });
  }
});
router.get("/users", async (req, res) => {
  try {
    // Fetch enrollments and populate user_id, course_id, and batch_id
    const enrollments = await Enrollment.find()
      .populate({
        path: "user_id",
        select: "first_name last_name email phone", // Select specific fields from User
      })
      .populate({
        path: "courses.course_id",
        select: "name description", // Select specific fields from Course
      })
      .populate({
        path: "courses.batch_id",
        select: "name start_date end_date", // Select specific fields from Batch
      });

    // Format the response
    const formattedEnrollments = enrollments.map((enrollment) => {
      return {
        _id: enrollment._id,
        user: {
          id: enrollment.user_id._id,
          name: `${enrollment.user_id.first_name} ${enrollment.user_id.last_name}`,
          email: enrollment.user_id.email,
          phone: enrollment.user_id.phone,
        },
        courses: enrollment.courses.map((course) => ({
          course: {
            id: course.course_id._id,
            name: course.course_id.name,
            description: course.course_id.description,
          },
          batch: course.batch_id
            ? {
              id: course.batch_id._id,
              name: course.batch_id.name,
              start_date: course.batch_id.start_date,
              end_date: course.batch_id.end_date,
            }
            : null,
          enrollment_status: course.enrollment_status,
          payment_status: course.payment_status,
          enrolled_at: course.enrolled_at,
        })),
      };
    });

    res.status(200).json({
      success: true,
      data: formattedEnrollments,
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
});
module.exports = router;