import React from "react";

const Certificates = () => {
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
              <span className="text-main-600 fw-normal text-15">Certificates</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Certificates List */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">My Certificates</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-gray-800">Course Name</th>
                <th className="text-gray-800">Completion Date</th>
                <th className="text-gray-800">Certificate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-gray-800">Full Stack Web Development</td>
                <td className="text-gray-800">15-01-2025</td>
                <td>
                  <button className="btn btn-sm btn-primary text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600">
                    View
                  </button>
                  <button className="btn btn-sm btn-outline-success text-green-600 border-green-600 hover:text-white hover:bg-green-600 ms-2">
                    Download
                  </button>
                </td>
              </tr>
              <tr>
                <td className="text-gray-800">Java Programming</td>
                <td className="text-gray-800">10-12-2024</td>
                <td>
                  <button className="btn btn-sm btn-primary text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600">
                    View
                  </button>
                  <button className="btn btn-sm btn-outline-success text-green-600 border-green-600 hover:text-white hover:bg-green-600 ms-2">
                    Download
                  </button>
                </td>
              </tr>
              <tr>
                <td className="text-gray-800">Python for Beginners</td>
                <td className="text-gray-800">20-11-2024</td>
                <td>
                  <button className="btn btn-sm btn-primary text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600">
                    View
                  </button>
                  <button className="btn btn-sm btn-outline-success text-green-600 border-green-600 hover:text-white hover:bg-green-600 ms-2">
                    Download
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

export default Certificates;
