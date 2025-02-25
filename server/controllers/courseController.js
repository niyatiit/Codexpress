const Course = require('../models/course.model')
const Faculty = require('../models/faculty.model')
const Batch = require("../models/batch.model"); // Ensure you import the Batch model

// GET /courses/:id/payment
// exports.getPaymentPage = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.status(200).json({
//       success: true,
//       course: {
//         id: course._id,
//         name: course.name,
//         price: course.price,
//         discount: course.discount,
//         finalPrice: course.price - (course.price * course.discount) / 100,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch course details", error });
//   }
// };

// POST /courses/:id/enroll
// exports.enrollStudent = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     const studentId = req.user.id; // Assuming the student ID is available in the request (from auth middleware)

//     // Check if the student is already enrolled
//     if (course.enrolledStudents.includes(studentId)) {
//       return res.status(400).json({ message: "You are already enrolled in this course" });
//     }

//     // Enroll the student
//     course.enrolledStudents.push(studentId);
//     course.total_students_enrolled += 1;
//     await course.save();

//     res.status(200).json({ success: true, message: "Enrollment successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Enrollment failed", error });
//   }
// };

// ✅ Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Get All Courses Error:", error);
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};


// ✅ Get a single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error("Get Course By ID Error:", error);
    res.status(500).json({ message: "Error fetching course", error: error.message });
  }
};

exports.addNewCourse = async (req, res) => {
  try {
    const {
      name,
      code,
      duration,
      price,
      discount,
      category,
      description,
      thumbnail,
      status,
      tags,
      syllabus,
    } = req.body;

    // Validate required fields
    if (!name || !code || !duration || !price || !category || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if a course with the same code already exists
    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ error: "Course code must be unique" });
    }

    // Transform tags and syllabus from strings to arrays
    const tagsArray = typeof tags === "string" ? tags.split(",").map((tag) => tag.trim()) : tags;
    const syllabusArray = typeof syllabus === "string" ? syllabus.split("\n").map((line) => line.trim()) : syllabus;

    // Create the new course
    const course = new Course({
      name,
      code,
      duration,
      price,
      discount: discount || 0, // Default discount to 0 if not provided
      category,
      description,
      thumbnail: thumbnail || "", // Default to empty string if not provided
      status: status || "open", // Default status to "open" if not provided
      tags: tagsArray || [], // Default to empty array if not provided
      syllabus: syllabusArray || [], // Default to empty array if not provided
    });

    // Save the course to the database
    await course.save();

    // Send success response
    res.status(201).json(course);
  } catch (error) {
    console.error("Error adding new course:", error);
    res.status(400).json({ error: error.message });
  }
};


exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Find course by ID and update with new data
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are applied
    });

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing course
// const updateCourse = async (req, res) => {
//   const { name, description, duration, fee } = req.body;

//   // Validate required fields
//   if (!name || !description || !duration || !fee) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const updatedCourse = await Course.findByIdAndUpdate(
//       req.params.id,
//       { name, description, duration, fee },
//       { new: true }
//     );

//     if (!updatedCourse) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.status(200).json(updatedCourse);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating course", error: error.message });
//   }
// };

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
};

// Assign a course to a faculty
exports.assignCourseToFaculty = async (req, res) => {
  const { courseId, facultyId } = req.body;

  // Validate required fields
  if (!courseId || !facultyId) {
    return res.status(400).json({ message: "Course ID and Faculty ID are required" });
  }

  try {
    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the faculty exists
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Check if the faculty is already assigned to the course
    if (course.facultyIds.includes(facultyId)) {
      return res.status(400).json({ message: "Faculty is already assigned to this course" });
    }

    // Assign faculty to the course
    course.facultyIds.push(facultyId);
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error assigning course to faculty", error: error.message });
  }
};

// Get all courses assigned to a faculty
exports.getCoursesByFaculty = async (req, res) => {
  try {
    // Check if the faculty exists
    const faculty = await Faculty.findById(req.params.facultyId);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // Fetch courses assigned to the faculty
    const courses = await Course.find({ facultyIds: req.params.facultyId });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses by faculty", error: error.message });
  }
};

// Add a resource to a course
exports.addResourceToCourse = async (req, res) => {
  const { title, type, url } = req.body;

  // Validate required fields
  if (!title || !type || !url) {
    return res.status(400).json({ message: "Title, type, and URL are required" });
  }

  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Add the resource to the course
    course.resources.push({ title, type, url });
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error adding resource to course", error: error.message });
  }
};


exports.getBatchesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log("backend", req.params);

    // Validate courseId
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Find batches linked to the given courseId
    const batches = await Batch.find({
      course_id: courseId
    });
    console.log(batches);

    // Check if batches exist
    if (!batches || batches.length === 0) {
      return res.status(404).json({ message: "No batches found for this course" });
    }

    // Return the batches
    res.status(200).json({
      success: true,
      message: "Batches retrieved successfully",
      data: batches,
    });
  } catch (error) {
    console.error("Error fetching batches by course:", error);

    // Handle specific errors
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Course ID format" });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      message: "Server error while fetching batches",
      error: error.message,
    });
  }
};