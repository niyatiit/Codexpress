import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AssignFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch faculties and courses on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch faculties
        const facultiesResponse = await axios.get("http://localhost:3000/faculty");
        setFaculties(facultiesResponse.data.faculties);
        console.log(facultiesResponse.data.faculties);

        // Fetch courses
        const coursesResponse = await axios.get("http://localhost:3000/courses");
        setCourses(coursesResponse.data.courses);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFaculty || !selectedCourse) {
      setError("Please select both a faculty and a course.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Submit assignment to backend
      const response = await axios.post("http://localhost:3000/courses/assign-faculty", {
        facultyId: selectedFaculty,
        courseId: selectedCourse,
      });

      if (response.data.success) {
        setSuccess("Faculty assigned successfully!");
        setSelectedFaculty("");
        setSelectedCourse("");
      } else {
        setError("Failed to assign faculty. Please try again.");
      }
    } catch (error) {
      console.error("Error assigning faculty:", error);
      setError("Failed to assign faculty. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-body">
      {/* Breadcrumb */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/admin" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Assign Faculty</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Card for Assignment Details */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100">
          <h5 className="mb-0">Assignment Details</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row gy-20">
              {/* Select Faculty */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Select Faculty</label>
                <select
                  className="form-select py-9"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  required
                >
                  <option key="123t43uy3u2o" disabled>
                    Select a faculty
                  </option>
                  {faculties.map((faculty) => (
                    <option key={faculty._id} value={faculty._id}>
                      {faculty.user_id.first_name} {faculty.user_id.last_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Course */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Select Course</label>
                <select
                  className="form-select py-9"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  {courses.map((course) => (
                    <option key={course.id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Error and Success Messages */}
              {error && (
                <div className="col-sm-12">
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                </div>
              )}
              {success && (
                <div className="col-sm-12">
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="col-sm-12 flex-align justify-content-end gap-8 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-main rounded-pill py-9"
                  onClick={() => {
                    setSelectedFaculty("");
                    setSelectedCourse("");
                    setError("");
                    setSuccess("");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-main rounded-pill py-9" disabled={loading}>
                  {loading ? "Assigning..." : "Assign Faculty"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignFaculty;