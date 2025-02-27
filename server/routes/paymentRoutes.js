const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Payment } = require("../models/payment.model"); // Payment model
const { Enrollment } = require("../models/enrollment.model"); // Enrollment model
const { authenticate } = require("../middleware/authMiddleware"); // Authentication middleware

// Retrieve Stripe session details
router.get("/success", async (req, res) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.json({ session });
  } catch (error) {
    console.error("Failed to retrieve session details:", error);
    res.status(500).json({ error: "Failed to retrieve session details." });
  }
});

// Create a Stripe checkout session
router.post("/create-checkout-session", authenticate, async (req, res) => {
  const { courseId, price, success_url, cancel_url } = req.body;
  const userId = req.user._id; // Get userId from authenticated user

  try {
    // Validate required fields
    if (!courseId || !price || !success_url || !cancel_url) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Course Payment",
            },
            unit_amount: price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: success_url,
      cancel_url: cancel_url,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
    });

    res.json({ url: session.url }); // Return the checkout session URL
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Stripe webhook endpoint
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    // Verify the webhook event
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle successful payment
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { courseId, userId } = session.metadata;

      // Update Payment Table
      await Payment.create({
        userId,
        courseId,
        amount: session.amount_total / 100, // Convert back to dollars
        status: "Paid",
        transactionId: session.id,
      });

      // Update Enrollment Table
      await Enrollment.updateOne(
        { userId, courseId },
        { $set: { paymentStatus: "Paid" } }
      );

      console.log("Payment Successful:", session.id);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;