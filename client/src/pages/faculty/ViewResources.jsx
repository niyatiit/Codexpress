import React from "react";
import { Link } from "react-router-dom";

const ViewResources = () => {
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
                Manage Resources
              </span>
            </li>
          </ul>
        </div>
        <div>
          <Link
            to="/upload-resource"
            className="btn btn-main rounded-pill py-9"
          >
            Upload New Resource
          </Link>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="card mb-24">
        <div className="card-body">
          <div className="flex-align gap-16 flex-wrap">
            {/* Search Bar */}
            <div className="form-group flex-grow-1">
              <label className="form-label fw-medium text-gray-700">
                Search Resources
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title or description"
              />
            </div>
            {/* Filter by Course */}
            <div className="form-group">
              <label className="form-label fw-medium text-gray-700">
                Filter by Course
              </label>
              <select className="form-control">
                <option value="">All Courses</option>
                <option value="1">Full Stack Development</option>
                <option value="2">Data Science</option>
                <option value="3">Java Programming</option>
                <option value="4">UI/UX Design</option>
              </select>
            </div>
            {/* Filter by Batch */}
            <div className="form-group">
              <label className="form-label fw-medium text-gray-700">
                Filter by Batch
              </label>
              <select className="form-control">
                <option value="">All Batches</option>
                <option value="A">Batch A</option>
                <option value="B">Batch B</option>
                <option value="C">Batch C</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Table */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">Uploaded Resources</h5>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Course</th>
                <th>Batch</th>
                <th>Uploaded By</th>
                <th>Date Uploaded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>React Basics</td>
                <td>A beginner's guide to React.js</td>
                <td>Full Stack Development</td>
                <td>Batch A</td>
                <td>John Doe</td>
                <td>01-28-2025</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Data Science Toolkit</td>
                <td>Essential tools for Data Science</td>
                <td>Data Science</td>
                <td>Batch B</td>
                <td>Jane Smith</td>
                <td>01-27-2025</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewResources;
