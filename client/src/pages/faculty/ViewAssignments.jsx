import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  // Fetch all assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const params = {};
        if (selectedCourse) params.course_id = selectedCourse;

        const response = await axios.get("http://localhost:3000/assignments", { params });
        setAssignments(response.data.assignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, [selectedCourse]);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Filter assignments based on selected course
  const filteredAssignments = assignments.filter(
    (assignment) => !selectedCourse || assignment.course_id === selectedCourse
  );

  return (
    <div className="dashboard-body p-6">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/faculty" className="text-gray-800 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">View Assignments</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="card rounded-md">
        <div className="bg-blue-100 card-header">
          <h5 className="text-md">Recent Assignments</h5>
        </div>
        <div className="card-body">
          {/* Course Filter */}
          <div className="flex gap-4 mb-4">
            <select
              className="form-control"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Assignments Table */}
          <table className="table-auto w-full text-sm border-collapse border border-gray-200">
            <thead>
              <tr className="bg-blue-200">
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Course</th>
                <th className="border px-4 py-2">Batch</th>
                <th className="border px-4 py-2">Due Date</th>
                <th className="border px-4 py-2">File</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td className="border px-4 py-2">{assignment.title}</td>
                    <td className="border px-4 py-2">{assignment.course_name}</td>
                    <td className="border px-4 py-2">{assignment.batch_name}</td>
                    <td className="border px-4 py-2">
                      {new Date(assignment.due_date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      {assignment.file_url ? (
                      <a
                      href={assignment.file_url} // Link to the file URL
                      download // This attribute forces the browser to download the file
                      target="_blank" // Open the file in a new tab (optional)
                      rel="noopener noreferrer" // Security best practice for target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Download
                    </a>
                    
                      ) : (
                        "No file"
                      )}
                    </td>
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border px-4 py-2 text-center text-gray-500">
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignments;