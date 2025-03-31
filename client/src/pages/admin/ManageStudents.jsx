import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageStudents = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Fetch enrollments from backend
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/enrollments/users");
        setEnrollments(response.data.data);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        setError("Failed to fetch enrollments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  // Filter enrollments based on search query
  const filteredEnrollments = enrollments
    .map((enrollment) => ({
      ...enrollment,
      courses: enrollment.courses.filter((course) =>
        `${enrollment.user.name} ${enrollment.user.email} ${course.course.name} ${course.payment_status}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((enrollment) => enrollment.courses.length > 0); // Remove enrollments with no matching courses

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Section */}
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
              <span className="text-main-600 fw-normal text-15">Manage Students</span>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/admin/add/student" className="btn btn-main rounded-pill py-9">
            Add Student
          </Link>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-16">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, course, or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>

      {/* Students Table */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100">
          <h5 className="mb-0">Students List</h5>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Payment Status</th>
                <th>Enrollment Date</th>
                {/* <th>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((enrollment, index) =>
                enrollment.courses.map((course, courseIndex) => (
                  <tr key={`${enrollment._id}-${courseIndex}`}>
                    <td>{enrollment.user.name || "user"}</td>
                    <td>{enrollment.user.email}</td>
                    <td>{enrollment.user.phone || "N/A"}</td>
                    <td>{course.course.name}</td>
                    <td>
                      <span
                        className={`badge ${
                          course.payment_status === "paid"
                            ? "bg-success"
                            : course.payment_status === "unpaid"
                            ? "bg-warning"
                            : "bg-danger"
                        }`}
                      >
                        {course.payment_status}
                      </span>
                    </td>
                    <td>{new Date(course.enrolled_at).toLocaleDateString()}</td>
                    {/* <td>
                      <button className="btn btn-sm btn-primary me-2">Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination mt-16 flex-center">
        <button className="btn btn-secondary me-2">Previous</button>
        <button className="btn btn-secondary">Next</button>
      </div>
    </div>
  );
};

export default ManageStudents;