const express = require('express');
const router = express.Router();
const Notice = require('../models/notice.model');

router.post('/', async (req, res) => {
  try {
    const { title, description, created_by, course_id, batches } = req.body;

    if (!title || !description || !created_by || !course_id || batches.length === 0) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const notice = new Notice({ title, description, created_by, course_id, batches });
    await notice.save();

    res.json({ success: true, message: "Notice created successfully." });
  } catch (error) {
    console.error("Error creating notice:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
