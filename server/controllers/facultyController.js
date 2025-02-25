const Faculty = require("../models/faculty.model");

exports.getAllFaculty = async (req, res) => {
    try {
        const faculties = await Faculty.find().populate("user_id")
        res.status(200).json({ faculties });
    } catch (err) { // Ensure consistency in variable naming
        console.error("Get All Faculties Error:", err);
        res.status(500).json({ message: "Error fetching faculties", error: err.message });
    }
};
exports.updateFaculty = async (req, res) => {
    try {
      const { department, designation, doj, experience, status } = req.body;
      const faculty = await Faculty.findByIdAndUpdate(
        req.params.id,
        { department, designation, doj, experience, status },
        { new: true }
      );
      if (!faculty) {
        return res.status(404).json({ success: false, message: "Faculty not found" });
      }
      res.status(200).json({ success: true, data: faculty });
    } catch (error) {
      console.error("Error updating faculty:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  // Fetch faculty by ID
exports.getFacultyById = async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id).populate("user_id");
      if (!faculty) {
        return res.status(404).json({ success: false, message: "Faculty not found" });
      }
      res.status(200).json({ success: true, data: faculty });
    } catch (error) {
      console.error("Error fetching faculty:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  