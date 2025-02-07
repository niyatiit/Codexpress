import React from "react";

const Schedule = () => {
  return (
    <div className="dashboard-body">
      {/* Page Header */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <span className="text-gray-800 fw-normal text-15">Dashboard</span>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Schedule</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Schedule List */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">My Schedule</h5>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search schedule..."
              className="form-control text-gray-800 border border-gray-300"
            />
          </div>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-gray-800">Date</th>
                <th className="text-gray-800">Time</th>
                <th className="text-gray-800">Event</th>
                <th className="text-gray-800">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-gray-800">01-02-2025</td>
                <td className="text-gray-800">10:00 AM - 12:00 PM</td>
                <td className="text-gray-800">Java Class</td>
                <td className="text-gray-800">
                  <button className="btn btn-sm btn-primary text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600">
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td className="text-gray-800">02-02-2025</td>
                <td className="text-gray-800">2:00 PM - 3:30 PM</td>
                <td className="text-gray-800">Exam Preparation</td>
                <td className="text-gray-800">
                  <button className="btn btn-sm btn-primary text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600">
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td className="text-gray-800">03-02-2025</td>
                <td className="text-gray-800">11:00 AM - 1:00 PM</td>
                <td className="text-gray-800">Project Discussion</td>
                <td className="text-gray-800">
                  <button className="btn btn-sm btn-primary text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600">
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
