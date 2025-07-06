import React from "react";
import { Link } from "react-router-dom";

const ManageFees = () => {
  return (
    <div className="dashboard-body">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/admin" className="text-gray-800 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Manage Fees</span>
            </li>
          </ul>
        </div>

        <div>
          <Link to="/add-fees" className="btn btn-main rounded-pill py-9 bg-green-600 hover:bg-green-700 text-white">
            Add New Record
          </Link>
        </div>
      </div>

      {/* Fees Management Table */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">Fees Records</h5>
          <div className="filters flex-align gap-4">
            <select className="form-select text-gray-800 border-gray-300">
              <option value="">Select Batch</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <select className="form-select text-gray-800 border-gray-300">
              <option value="">Select Course</option>
              <option value="React">React</option>
              <option value="Node">Node</option>
            </select>
            <input
              type="text"
              placeholder="Search by name..."
              className="form-control text-gray-800 border border-gray-300"
            />
          </div>
        </div>

        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-gray-800">Student Name</th>
                <th className="text-gray-800">Batch</th>
                <th className="text-gray-800">Course</th>
                <th className="text-gray-800">Pending Fees</th>
                <th className="text-gray-800">Status</th>
                <th className="text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-gray-800">John Doe</td>
                <td className="text-gray-800">2023</td>
                <td className="text-gray-800">React</td>
                <td className="text-gray-800">$500</td>
                <td>
                  <span className="badge bg-red-100 text-red-600">Pending</span>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white me-2">
                    Update
                  </button>
                  <button className="btn btn-sm btn-success text-green-600 border-green-600 hover:bg-green-600 hover:text-white me-2">
                    Mark Paid
                  </button>
                </td>
              </tr>
              <tr>
                <td className="text-gray-800">Jane Smith</td>
                <td className="text-gray-800">2024</td>
                <td className="text-gray-800">Node</td>
                <td className="text-gray-800">$0</td>
                <td>
                  <span className="badge bg-green-100 text-green-600">Paid</span>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageFees;
