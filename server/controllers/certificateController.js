const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const { v4: uuidv4 } = require('uuid');
const Certificate = require('../models/certificate.model');
const Enrollment = require('../models/enrollment.model');
const User = require('../models/user.model');
const Course = require('../models/course.model');
const Batch = require('../models/batch.model');

// Helper function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
// Generate verification code
const generateVerificationCode = () => {
  return uuidv4().replace(/-/g, '').substring(0, 12).toUpperCase();
};


const generateCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, batchId } = req.body;

    // Validate input
    if (!courseId || !batchId) {
      return res.status(400).json({ message: 'Course ID and Batch ID are required' });
    }

    // Check if certificate already exists
    const existingCert = await Certificate.findOne({
      user_id: userId,
      course_id: courseId,
      batch_id: batchId
    });

    if (existingCert) {
      return res.status(400).json({
        message: 'Certificate already exists for this course and batch',
        certificate: existingCert
      });
    }

    // Validate enrollment
    const enrollment = await Enrollment.findOne({
      user_id: userId,
      'courses.course_id': courseId,
      'courses.batch_id': batchId
    });

    if (!enrollment) {
      return res.status(400).json({ message: 'Not enrolled in this course batch' });
    }

    const courseData = enrollment.courses.find(c =>
      c.course_id.toString() === courseId &&
      c.batch_id.toString() === batchId
    );

    if (!courseData) {
      return res.status(400).json({ message: 'Course batch not found in enrollment' });
    }

    // Get user, course, and batch details
    const [student, course, batch] = await Promise.all([
      User.findById(userId).select('username first_name last_name'),
      Course.findById(courseId).select('name code duration'),
      Batch.findById(batchId).select('name start_date end_date')
    ]);

    if (!student || !course || !batch) {
      return res.status(404).json({ message: 'Student, course, or batch not found' });
    }
    const verificationCode = generateVerificationCode(); // ✅ define it before using

    // Configure storage paths
    const baseDir = path.join(__dirname, '../../server/uploads');
    const certDir = path.join(baseDir, 'certificates');

    const certificateNumber = `CERT-${Date.now()}`; // ✅ But it's too late here

    try {
      // Ensure directories exist
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
      }
      if (!fs.existsSync(certDir)) {
        fs.mkdirSync(certDir);
      }
    } catch (dirError) {
      console.error('Directory creation failed:', dirError);
      throw new Error('Failed to create certificate storage directories');
    }

    // Generate certificate PDF
    const templatePath = path.join(__dirname, '../../client/public/assets/images/certificate-template/certificate.png');
    // console.log("Absolute path to certificates directory:", path.join(baseDir, 'certificates'));

    // Verify template exists
    if (!fs.existsSync(templatePath)) {
      throw new Error('Certificate template not found');
    } 

    const backgroundBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const jpgImage = await pdfDoc.embedPng(backgroundBytes);

    // Draw background
    page.drawImage(jpgImage, {
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight(),
    });

    // Set fonts
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Helper function to draw centered text
    const drawCenteredText = (text, y, size = 18, font = fontBold) => {
      if (!text) return;
      const textWidth = font.widthOfTextAtSize(text, size);
      const x = (page.getWidth() - textWidth) / 2;
      page.drawText(text, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });
    };

    drawCenteredText(`${student.first_name} ${student.last_name}`, 480, 28); // Line 1: Name
    drawCenteredText(`${course.name}`, 380, 22);                            // Line 2: Course
    // LEFT aligned text at x
    const drawLeftText = (text, x, y, size = 16, font = fontRegular) => {
      page.drawText(text, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });
    };

    // RIGHT aligned text at x (adjusts x based on width)
    const drawRightText = (text, x, y, size = 16, font = fontRegular) => {
      const textWidth = font.widthOfTextAtSize(text, size);
      page.drawText(text, {
        x: x - textWidth,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });
    };

    // Use these in your draw section:
    drawLeftText(`From ${formatDate(batch.start_date)}`, 70, 290);  // Left side
    drawRightText(`To ${formatDate(batch.end_date)}`, 525, 290);    // Right side

    // 🔐 Add verification code at bottom left
    // page.drawText(`Verification Code: ${verificationCode}`, {
    //   x: 50,
    //   y: 50,
    //   size: 10,
    //   font: fontRegular,
    //   color: rgb(0.5, 0.5, 0.5),
    // });

    // Save PDF with additional checks
    const certFileName = `${certificateNumber}.pdf`;
    const certPath = path.join(certDir, certFileName);

    // Security check - prevent directory traversal
    if (!certPath.startsWith(certDir)) {
      throw new Error('Invalid certificate path');
    }
    // console.log("Attempting to save to:", certPath);
    // console.log("Certificate bytes length:", certBytes.length);
    try {
      const certBytes = await pdfDoc.save();
      fs.writeFileSync(certPath, certBytes);
    } catch (writeError) {
      console.error('Failed to save certificate:', writeError);
      throw new Error('Failed to save certificate file');
    }

    // Create certificate record
    const newCertificate = new Certificate({
      user_id: userId,
      course_id: courseId,
      batch_id: batchId,
      certificate_number: certificateNumber,
      certificate_url: `/certificates/${certFileName}`,
      certificate_type: 'completion',
      issued_by: req.user.id,
      verification_code: verificationCode,
      issue_date: new Date()
    });

    await newCertificate.save();

    res.status(201).json({
      message: 'Certificate generated successfully',
      certificate: newCertificate,
      downloadUrl: `http://localhost:3000/certificates/${certFileName}`
    });

  } catch (error) {
    console.error('Certificate generation failed:', error);
    res.status(500).json({
      message: 'Error generating certificate',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


const getStudentCertificates = async (req, res) => {
  try {
    const userId = req.user.id;

    const certificates = await Certificate.find({ user_id: userId })
      .populate('course_id', 'name code')
      .populate('batch_id', 'name start_date end_date')
      .sort({ issue_date: -1 });

    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ message: 'Error fetching certificates' });
  }
};

const verifyCertificate = async (req, res) => {
  try {
    const { certificateNumber, verificationCode } = req.query;

    if (!certificateNumber && !verificationCode) {
      return res.status(400).json({ message: 'Certificate number or verification code is required' });
    }

    const query = certificateNumber
      ? { certificate_number: certificateNumber }
      : { verification_code: verificationCode };

    const certificate = await Certificate.findOne(query)
      .populate('user_id', 'first_name last_name email')
      .populate('course_id', 'name code description')
      .populate('batch_id', 'name start_date end_date')
      .populate('issued_by', 'name');

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.json({
      isValid: true,
      certificate,
      student: certificate.user_id,
      course: certificate.course_id,
      batch: certificate.batch_id,
      issuedBy: certificate.issued_by
    });
  } catch (error) {
    console.error('Certificate verification failed:', error);
    res.status(500).json({ message: 'Error verifying certificate' });
  }
};

module.exports = {
  generateCertificate,
  getStudentCertificates,
  verifyCertificate
};