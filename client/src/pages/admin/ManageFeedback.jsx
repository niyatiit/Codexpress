import React from 'react';
import { Link } from 'react-router-dom';

const ManageFeedback = () => {
  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/admin" className="text-black fw-normal text-15 hover:text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Manage Feedback</span>
            </li>
          </ul>
        </div>

        <div>
          <Link to="/add-feedback" className="btn btn-main rounded-pill py-9 text-black bg-blue-600 hover:bg-blue-700">
            Add Feedback
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-black">Feedback</h5>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search feedback..."
              className="form-control text-black border border-gray-300"
            />
          </div>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-black">Name</th>
                <th className="text-black">Rating</th>
                <th className="text-black">Comment</th>
                <th className="text-black">Date</th>
                <th className="text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-black">John Doe</td>
                <td className="text-black">4</td>
                <td className="text-black">Great platform! It really helped me improve my skills.</td>
                <td className="text-black">01-02-2025</td>
                <td>
                  <button className="btn btn-sm btn-primary text-black border-blue-600 hover:text-white hover:bg-blue-600 me-2">Edit</button>
                  <button className="btn btn-sm btn-danger text-black border-red-600 hover:text-white hover:bg-red-600">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="text-black">Jane Smith</td>
                <td className="text-black">5</td>
                <td className="text-black">Amazing content and user-friendly interface. Highly recommend!</td>
                <td className="text-black">05-02-2025</td>
                <td>
                  <button className="btn btn-sm btn-primary text-black border-blue-600 hover:text-white hover:bg-blue-600 me-2">Edit</button>
                  <button className="btn btn-sm btn-danger text-black border-red-600 hover:text-white hover:bg-red-600">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageFeedback;
