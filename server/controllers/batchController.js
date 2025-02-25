const Course=require("../models/course.model")
const Batch=require("../models/batch.model")
const Faculty=require("../models/faculty.model")
exports.addNewBatch = async (req, res) => {
    try {
    
        const newBatch = new Batch(req.body);
        await newBatch.save();
    
        res.status(201).json({ success: true, message: "Batch created successfully!", data: newBatch });
      } catch (error) {
        console.error("Error adding batch:", error);
        res.status(500).json({ success: false, message: error.message });
      }
};
exports.updateBatch = async (req, res) => {
  try {
    const { name, start_date, end_date, batch_type, batch_description, total_seats } = req.body;
    const updatedBatch = await Batch.findByIdAndUpdate(
      req.params.id,
      { name, start_date, end_date, batch_type, batch_description, total_seats },
      { new: true }
    );
    if (!updatedBatch) {
      return res.status(404).json({ success: false, message: "Batch not found" });
    }
    res.status(200).json({ success: true, data: updatedBatch });
  } catch (error) {
    console.error("Error updating batch:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.getBatchById = async (req, res) => {
  try {
    const batchId = req.params.id; // Get batch ID from request parameters

    // Find the batch by ID
    const batch = await Batch.findById(batchId);

    // If batch not found, return 404
    if (!batch) {
      return res.status(404).json({ success: false, message: "Batch not found" });
    }

    // Return the batch data
    res.status(200).json({ success: true, data: batch });
  } catch (error) {
    console.error("Error fetching batch:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};