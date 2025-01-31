import React from "react";
import { Link } from "react-router-dom";

const ManageFaculty = () => {
  return (
    <div className="dashboard-body">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link
                to="/admin"
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
              <span className="text-main-600 fw-normal text-15">
                Manage Faculty
              </span>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/add-faculty" className="btn btn-main rounded-pill py-9">
            Add Faculty
          </Link>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-16">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, or department"
        />
      </div>

      {/* Faculty Table */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100">
          <h5 className="mb-0">Faculty List</h5>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Joining Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>john@example.com</td>
                <td>Computer Science</td>
                <td>1234567890</td>
                <td>01-01-2023</td>
                <td>
                                  <Link to="/admin/edit/course/2" className="btn btn-outline-main py-9 rounded-pill">
                                    Edit
                                  </Link>
                                  <button className="btn btn-danger py-9 rounded-pill ml-2">
                                    Delete
                                  </button>
                                </td>
                              
              </tr>
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>jane@example.com</td>
                <td>Design</td>
                <td>9876543210</td>
                <td>01-03-2022</td>
                <td>
                  <Link
                    to="/admin/edit/course/2"
                    className="btn btn-outline-main py-9 rounded-pill"
                  >
                    Edit
                  </Link>
                  <button className="btn btn-danger py-9 rounded-pill ml-2">
                    Delete
                  </button>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination mt-16 flex-center">
        <button className="btn btn-sm btn-outline-secondary me-2">
          Previous
        </button>
        <button className="btn btn-sm btn-outline-secondary">Next</button>
      </div>
    </div>
  );
};

export default ManageFaculty;
