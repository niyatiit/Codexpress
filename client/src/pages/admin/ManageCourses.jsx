import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        setCourses(response.data.courses);
        console.log(response.data.courses);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/courses/${id}`);
      setCourses(courses.filter((course) => course._id !== id)); // Remove the deleted course from the list
      alert("Course deleted successfully!");
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-danger">Error: {error}</div>;
  }

  return (
    <div className="dashboard-body">
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
              <span className="text-main-600 fw-normal text-15">Manage Courses</span>
            </li>
          </ul>
        </div>

        <div className="flex-align justify-content-end gap-8">
          <Link to="/admin/add/course" className="btn btn-main rounded-pill py-9">
            Add New Course
          </Link>
        </div>
      </div>

      <div className="card w-100 p-2" style={{ padding: "0" }}>
        <div className="card-header border-bottom border-gray-100 flex-align gap-8">
          <h5 className="mb-0">Courses List</h5>
        </div>
        <div className="card-body" style={{ padding: "5px" }}>
          <table className="table table-hover w-100" style={{ marginBottom: "0" }}>
            <thead >
              <tr className="p-4">
                <th>#</th>
                <th>Course Title</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-20">
                    No courses found.
                  </td>
                </tr>
              ) : (
                courses.map((course, index) => (
                  <tr key={course._id}>

                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/courses/${course._id}`}>
                      {course.name}
                      
                      </Link>
                      </td>
                    <td>{course.category}</td>
                    <td>{course.duration}</td>
                    <td>₹{course.price}</td>
                    <td>
                      <span
                        className={`badge ${course.status === "open"
                            ? "bg-success"
                            : course.status === "closed"
                              ? "bg-danger"
                              : "bg-warning"
                          }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/admin/edit/course/${course._id}`}
                        className="btn btn-outline-main py-2 px-3 rounded-md"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="btn btn-danger py-2 rounded-md ml-3"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;