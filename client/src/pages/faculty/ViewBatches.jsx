import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewBatches = () => {
  const [courses, setCourses] = useState([]); // List of all courses
  const [selectedCourse, setSelectedCourse] = useState(""); // Selected course ID
  const [batches, setBatches] = useState([]); // List of batches for the selected course
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  // Fetch all courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/faculty/${userId}/assigned-courses`);
      setCourses(response.data.courses); // Set the list of courses
      console.log("Courses fetched:", response.data.courses); // Debugging
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch batches for the selected course
  const fetchBatches = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:3000/courses/${courseId}/batches`);
      console.log("Batches response:", response.data); // Debugging
      setBatches(response.data.data || []); // Ensure the state is updated to an empty array if no data
    } catch (error) {
      console.error("Error fetching batches:", error);
      setBatches([]); // Clear batches in case of an error
    }
  };

  // Handle course selection
  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    console.log("Selected Course ID:", courseId); // Debugging
    setSelectedCourse(courseId); // Update the selected course
    if (courseId) {
      fetchBatches(courseId); // Fetch batches for the selected course
    } else {
      setBatches([]); // Clear batches if no course is selected
    }
  };

  return (
    <div className="dashboard-body p-20">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link
                to="/faculty"
                className="text-gray-200 fw-normal text-15 hover-text-main-600"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">View Batches</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Course Selection Dropdown */}
      <div className="bg-white rounded-lg p-16 shadow-sm">
        <h5 className="text-xl font-semibold mb-4 text-gray-800">Select Course</h5>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="">-- Select a Course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Batches Table */}
      {selectedCourse && (
        <div className="bg-white rounded-lg p-24 mt-6 shadow-sm">
          <h5 className="text-xl font-semibold mb-4 text-gray-800">Available Batches</h5>
          {batches.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Batch Name</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Start Date</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">End Date</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Batch Type</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600">Seats Available</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-700">{batch.name}</td>
                    <td className="p-3 text-sm text-gray-700">
                      {new Date(batch.start_date).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {new Date(batch.end_date).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm text-gray-700">{batch.batch_type}</td>
                    <td className="p-3 text-sm text-gray-700">{batch.seats_available}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No batches available for this course.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewBatches;