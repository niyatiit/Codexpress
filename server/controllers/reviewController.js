const Course = require('../models/course.model'); // Adjust the path as necessary
const Enrollment = require('../models/enrollment.model'); // Adjust the path as necessary

exports.submitReview = async (req, res) => {
  const { enrollmentId, courseId, comment, rating } = req.body;

  try {
    // Check if the student is enrolled in the course
    const enrollment = await Enrollment.findOne({
      user_id: enrollmentId,
      'courses.course_id': courseId,
      'courses.enrollment_status': 'enrolled',
    });

    if (!enrollment) {
      return res.status(403).json({ message: 'You are not enrolled in this course or your enrollment is not active.' });
    }

    // Find the course and add the review
    const course = await Course.findById({_id:courseId});
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    // Add the review
    course.reviews.push({
      student_id: enrollmentId,
      comment,
      rating,
    });

    // Optionally, you can update the course's overall rating here
    // For simplicity, let's assume we calculate the average rating
    const totalRatings = course.reviews.reduce((sum, review) => sum + review.rating, 0);
    course.rating = totalRatings / course.reviews.length;

    await course.save();

    res.status(201).json({ success:true,message: 'Review submitted successfully.', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while submitting the review.' });
  }
};