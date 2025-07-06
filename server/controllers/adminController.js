const Enrollment = require("../models/enrollment.model");
const Faculty = require("../models/faculty.model");
const Course = require("../models/course.model");
const Payment = require("../models/payment.model");

// Get total enrollments and trends for the current month
const getEnrollmentStats = async (req, res) => {
  try {
    const startDate = new Date();
    startDate.setDate(1); // First day of the month

    // Count total enrollments this month
    const totalEnrollments = await Enrollment.countDocuments({
      createdAt: { $gte: startDate },
    });

    // Get enrollments per day for trends
    const enrollmentsPerDay = await Enrollment.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      count: totalEnrollments,
      trends: enrollmentsPerDay.map((item) => ({
        date: item._id,
        count: item.count,
      })),
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ message: "Error fetching enrollment statistics." });
  }
};

// ✅ Get recent enrollments (limit to 5) - FIXED
const getRecentEnrollments = async (req, res) => {
  try {
    const recentEnrollments = await Enrollment.find({})
      .sort({ createdAt: -1 }) // Sort by most recent
      .limit(5) // Limit to 5 results
      .populate({
        path: "studentId",
        select: "username email", // Populate student details
      })
      .populate({
        path: "courseId",
        select: "name", // Populate course details
      });

    res.json({ enrollments: recentEnrollments });
  } catch (error) {
    console.error("Error fetching recent enrollments:", error);
    res.status(500).json({ message: "Error fetching recent enrollments." });
  }
};

// ✅ Get top courses by enrollment count - FIXED
const getTopCourses = async (req, res) => {
  try {
    const topCourses = await Course.aggregate([
      {
        $lookup: {
          from: "enrollments", // Make sure the collection name matches
          localField: "_id",
          foreignField: "courseId",
          as: "enrollments",
        },
      },
      {
        $project: {
          name: 1,
          enrollmentCount: { $size: "$enrollments" }, // Count enrollments for each course
        },
      },
      { $sort: { enrollmentCount: -1 } }, // Sort by highest enrollment
      { $limit: 5 }, // Limit to top 5 courses
    ]);

    res.json({ courses: topCourses });
  } catch (error) {
    console.error("Error fetching top courses:", error);
    res.status(500).json({ message: "Error fetching top courses." });
  }
};

// ✅ Get total faculty count
const getFacultyCount = async (req, res) => {
  try {
    const totalFaculties = await Faculty.countDocuments();
    res.json({ count: totalFaculties });
  } catch (error) {
    console.error("Error fetching faculties:", error);
    res.status(500).json({ message: "Error fetching faculty count." });
  }
};

// ✅ Get total course count
const getCourseCount = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments();
    res.json({ count: totalCourses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching course count." });
  }
};

// ✅ Get total payments received
const getTotalPayments = async (req, res) => {
  try {
    const totalPayments = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({ total: totalPayments.length ? totalPayments[0].total : 0 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Error fetching total payments." });
  }
};

module.exports = {
  getEnrollmentStats,
  getRecentEnrollments,
  getTopCourses,
  getFacultyCount,
  getCourseCount,
  getTotalPayments,
};
