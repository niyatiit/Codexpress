import React from "react";
import { Link } from "react-router-dom";

const Schedule = () => {
  return (
    <div className="dashboard-body">
      {/* Page Header */}
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title text-gray-800">My Schedule</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/student" className="text-blue-600 hover:text-blue-800">
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      My Schedule
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule List */}
      <div className="card bg-white shadow-xl rounded-xl">
        <div className="card-header border-b border-gray-200 flex justify-between items-center p-4">
          <h5 className="mb-0 text-gray-800 text-xl font-semibold">My Schedule</h5>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search schedule..."
              className="form-control text-gray-800 border border-gray-300 rounded-lg p-2"
            />
          </div>
        </div>
        <div className="card-body p-4">
          <table className="table table-striped w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-gray-800 py-3 px-4 text-left">Date</th>
                <th className="text-gray-800 py-3 px-4 text-left">Time</th>
                <th className="text-gray-800 py-3 px-4 text-left">Event</th>
                <th className="text-gray-800 py-3 px-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="text-gray-800 py-3 px-4">01-02-2025</td>
                <td className="text-gray-800 py-3 px-4">10:00 AM - 12:00 PM</td>
                <td className="text-gray-800 py-3 px-4">Java Class</td>
                <td className="text-gray-800 py-3 px-4">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105">
                    View Details
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="text-gray-800 py-3 px-4">02-02-2025</td>
                <td className="text-gray-800 py-3 px-4">2:00 PM - 3:30 PM</td>
                <td className="text-gray-800 py-3 px-4">Exam Preparation</td>
                <td className="text-gray-800 py-3 px-4">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105">
                    View Details
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="text-gray-800 py-3 px-4">03-02-2025</td>
                <td className="text-gray-800 py-3 px-4">11:00 AM - 1:00 PM</td>
                <td className="text-gray-800 py-3 px-4">Project Discussion</td>
                <td className="text-gray-800 py-3 px-4">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 px-4 transition duration-300 ease-in-out transform hover:scale-105">
                    View Details
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

export default Schedule;
