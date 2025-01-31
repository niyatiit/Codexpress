import React from "react";
import { Link } from "react-router-dom";

const ManageNotifications = () => {
  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
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
              <span className="text-main-600 fw-normal text-15">Manage Notifications</span>
            </li>
          </ul>
        </div>

        <div>
          <Link to="/add-notification" className="btn btn-main rounded-pill py-9">
            Add Notification
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">Notifications</h5>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search notifications..."
              className="form-control text-gray-800"
            />
          </div>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-gray-800">Title</th>
                <th className="text-gray-800">Recipient Group</th>
                <th className="text-gray-800">Date Sent</th>
                <th className="text-gray-800">Status</th>
                <th className="text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-gray-800">Exam Reminder</td>
                <td className="text-gray-800">Students</td>
                <td className="text-gray-800">01-02-2025</td>
                <td className="text-gray-800">Sent</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="text-gray-800">Meeting Schedule</td>
                <td className="text-gray-800">Faculty</td>
                <td className="text-gray-800">05-02-2025</td>
                <td className="text-gray-800">Draft</td>
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

export default ManageNotifications;
