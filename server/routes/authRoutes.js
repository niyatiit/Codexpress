const express = require("express");
const {
  signup,
  studentLogin,
  forgotPassword,
  resetPassword,
  adminLogin,
  facultyLogin,
} = require("../controllers/authController");

const router = express.Router();

// Authentication Routes
router.post("/signup", signup);
router.post("/login", studentLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/admin-login", adminLogin);
router.post("/faculty-login", facultyLogin);

module.exports = router;
