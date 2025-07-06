const Enrollment = require('../models/enrollment.model');
const Payment = require('../models/payment.model');

// Enroll a user in a course
exports.enrollUser = async (req, res) => {
  try {
    const { user_id, course_id, batch_id } = req.body;

    // Check if the user is already enrolled in the course and batch
    const existingEnrollment = await Enrollment.findOne({ user_id, course_id, batch_id });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'User is already enrolled in this course and batch' });
    }

    // Create a new enrollment
    const enrollment = new Enrollment({
      user_id,
      course_id,
      batch_id,
      enrollment_status: 'active',
      payment_status: 'unpaid', // Default to unpaid
    });

    await enrollment.save();

    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ message: 'Error enrolling user', error: error.message });
  }
};

// Update enrollment status
exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { enrollment_status } = req.body;

    const enrollment = await Enrollment.findByIdAndUpdate(
      enrollmentId,
      { enrollment_status },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.status(200).json({ success: true, data: enrollment });
  } catch (error) {
    console.error('Update enrollment error:', error);
    res.status(500).json({ message: 'Error updating enrollment status', error: error.message });
  }
};

// Get all enrollments for a user (including multiple courses)
exports.getUserEnrollments = async (req, res) => {
  try {
    const { user_id } = req.params;

    const enrollments = await Enrollment.find({ user_id })
      .populate('course_id') // Populate course details
      .populate('batch_id'); // Populate batch details

    res.status(200).json({ success: true, data: enrollments });
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({ message: 'Error fetching enrollments', error: error.message });
  }
};