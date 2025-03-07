const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/payment.model'); // Payment model
const Enrollment = require('../models/enrollment.model'); // Enrollment model
const { authenticate } = require('../middleware/authMiddleware'); // Authentication middleware
const Course = require('../models/course.model'); // Course model

// Retrieve Stripe session details and handle payment success
router.get('/success', async (req, res) => {
  const { session_id } = req.query;
  console.log("Received Session ID:", session_id); // Log the session ID

  try {
    // Validate session_id
    if (!session_id || !session_id.startsWith("cs_test_") || session_id.length > 66) {
      throw new Error("Invalid session ID.");
    }

    // Retrieve session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Check if the payment was successful
    if (session.payment_status === 'paid') {
      const { courseId, userId, batchId } = session.metadata;

      // Check if the payment has already been processed
      const existingPayment = await Payment.findOne({ reference_number: session.id });
      if (existingPayment) {
        return res.status(400).json({ error: "Payment has already been processed." });
      }

      // Check if the student is already enrolled in the course
      const enrollment = await Enrollment.findOne({ user_id: userId });

      if (enrollment) {
        const isAlreadyEnrolled = enrollment.courses.some(
          (c) => c.course_id.toString() === courseId && c.enrollment_status === 'enrolled'
        );

        if (isAlreadyEnrolled) {
          return res.status(400).json({ error: 'Student is already enrolled in this course.' });
        }
      }

      // Save payment to the database
      const payment = await Payment.create({
        user_id: userId,
        course_id: courseId,
        amount: session.amount_total / 100, // Convert back to dollars
        payment_method: 'card',
        status: 'completed',
        reference_number: session.id,
        description: `Payment for course ${courseId} by user ${userId}`,
      });

      console.log('💾 Payment Saved:', payment);

      // Update enrollment
      if (!enrollment) {
        // Create a new enrollment record if it doesn't exist
        const newEnrollment = new Enrollment({
          user_id: userId,
          courses: [{
            course_id: courseId,
            batch_id: batchId || null,
            enrollment_status: 'enrolled',
            payment_status: 'paid',
          }],
        });
        await newEnrollment.save();
        console.log('📚 New Enrollment Created:', newEnrollment);
      } else {
        const courseIndex = enrollment.courses.findIndex(
          (c) => c.course_id.toString() === courseId
        );

        if (courseIndex !== -1) {
          // Update the existing course entry
          enrollment.courses[courseIndex].enrollment_status = 'enrolled';
          enrollment.courses[courseIndex].payment_status = 'paid';
          enrollment.courses[courseIndex].batch_id = batchId || null;
        } else {
          // Add a new course entry
          enrollment.courses.push({
            course_id: courseId,
            batch_id: batchId || null,
            enrollment_status: 'enrolled',
            payment_status: 'paid',
          });
        }

        await enrollment.save();
        console.log('📚 Enrollment Updated:', enrollment);
      }

      // Respond with success message
      res.json({ message: 'Payment and enrollment updated successfully', session });
    } else {
      res.status(400).json({ error: 'Payment not successful.' });
    }
  } catch (error) {
    console.error('🚨 Failed to retrieve session details or update records:', error);
    res.status(500).json({ error: 'Failed to process payment success.' });
  }
});
// Create a Stripe checkout session
router.post('/create-checkout-session', authenticate, async (req, res) => {
  const { courseId, userId, price, success_url, cancel_url, batchId } = req.body;

  try {
    // Validate required fields
    if (!courseId || !userId || !price || !success_url || !cancel_url) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Fetch course details
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }
    if (req.user.role !== "student") {
      return res.status(403).json({ success: false, message: "Only students can enroll." });
    }
    // Check if the student is already enrolled in the course
    let enrollment = await Enrollment.findOne({ user_id: userId });

    if (enrollment) {
      const isAlreadyEnrolled = enrollment.courses.some(
        (c) => c.course_id.toString() === courseId && c.enrollment_status === 'enrolled'
      );

      if (isAlreadyEnrolled) {
        return res.status(400).json({ error: 'You are already enrolled in this course.' });
      }
    }

    // Find or create the enrollment record for the user
    if (!enrollment) {
      // Create a new enrollment record if it doesn't exist
      enrollment = new Enrollment({
        user_id: userId,
        courses: [],
      });
      await course.save();

      console.log(`✅ Updated total_students for course ${courseId}. New count: ${course.total_students}`);

    }

    // Check if the user is already enrolled in the course
    const existingCourseIndex = enrollment.courses.findIndex(
      (c) => c.course_id.toString() === courseId
    );

    if (existingCourseIndex !== -1) {
      // Update the existing course entry
      enrollment.courses[existingCourseIndex].enrollment_status = 'pending';
      enrollment.courses[existingCourseIndex].payment_status = 'unpaid';
      enrollment.courses[existingCourseIndex].batch_id = batchId || null; // Update batch if provided
    } else {
      // Add a new course entry
      enrollment.courses.push({
        course_id: courseId,
        batch_id: batchId || null, // Add batch if provided
        enrollment_status: 'pending',
        payment_status: 'unpaid',
      });
    }
    if (course) {
      course.total_students_enrolled += 1;
      await course.save();
      console.log(`✅ Enrollment confirmed! Updated total_students for ${course.name}: ${course.total_students_enrolled}`);
    }
    // Save the updated enrollment record
    await enrollment.save();

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: course.name,
              description: `Enrollment for ${course.name}`,
              images: [course.thumbnail],
            },
            unit_amount: price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${success_url}`, // Pass session ID to success URL
      cancel_url: cancel_url,
      metadata: {
        courseId: courseId,
        userId: userId,
        batchId: batchId || null, // Include batchId in metadata
      },
    });

    console.log('🔹 Checkout session created:', session.id);
    res.json({ url: session.url }); // Return the checkout session URL
  } catch (error) {
    console.error('🚨 Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;