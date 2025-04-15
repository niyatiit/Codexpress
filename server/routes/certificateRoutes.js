const express = require('express');
const router = express.Router();
const {
  generateCertificate,
  getStudentCertificates,
  verifyCertificate,
  getAllCertificates
} = require('../controllers/certificateController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
router.get('/',authenticate,getAllCertificates)
// Student routes
router.get('/student', authenticate, getStudentCertificates);
router.post('/generate', authenticate, generateCertificate);

// Public verification route
router.get('/verify', verifyCertificate);

// Admin routes (could be added later)
// router.get('/', authenticate, authorize('admin'), getAllCertificates);

module.exports = router;