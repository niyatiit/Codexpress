import React from "react";
import { Link } from "react-router-dom";

const ManageStudents = () => {
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
          <Link to="/add-student" className="btn btn-main rounded-pill py-9">
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
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Status</th>
                <th>Enrollment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Student 1 */}
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>john.doe@example.com</td>
                <td>1234567890</td>
                <td>Full Stack Development</td>
                <td>
                  <span className="badge bg-success">Active</span>
                </td>
                <td>01-01-2023</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>

              {/* Example Student 2 */}
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>jane.smith@example.com</td>
                <td>9876543210</td>
                <td>Java Programming</td>
                <td>
                  <span className="badge bg-warning">Pending</span>
                </td>
                <td>01-03-2023</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>

              {/* Example Student 3 */}
              <tr>
                <td>3</td>
                <td>Michael Brown</td>
                <td>michael.brown@example.com</td>
                <td>1122334455</td>
                <td>Data Science</td>
                <td>
                  <span className="badge bg-danger">Inactive</span>
                </td>
                <td>01-05-2022</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination mt-16 flex-center">
        <button className="btn btn-sm btn-outline-secondary me-2">Previous</button>
        <button className="btn btn-sm btn-outline-secondary">Next</button>
      </div>
    </div>
  );
};

export default ManageStudents;
