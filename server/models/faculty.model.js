const mongoose = require("mongoose");

// Define the schema for the Faculty model
const facultySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensure one user can only have one faculty profile
    }, // Reference to the User model

    department: {
      type: String,
      required: true,
      enum: ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology"], // Predefined departments
    }, // Department the faculty belongs to

    courses: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
      default: [], // List of courses the faculty teaches
    },

    qualifications: {
      type: [
        {
          degree: { type: String, required: true }, // Degree (e.g., "M.Tech in CS")
          institution: { type: String, required: true }, // Institution (e.g., "MIT")
          year: { type: Number, required: true }, // Year of completion
        },
      ],
      default: [], // Default empty array to prevent errors
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    }, // Years of teaching experience

    designation: {
      type: String,
      required: true,
      enum: ["Assistant Professor", "Associate Professor", "Professor"], // Predefined designations
    }, // Faculty designation

    doj: {
      type: Date,
      required: true,
    }, // Date of Joining (DOJ)

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    }, // Faculty status
  },
  { timestamps: true } // Auto-adds `createdAt` and `updatedAt`
);

// Export the model
module.exports = mongoose.model("Faculty", facultySchema);
