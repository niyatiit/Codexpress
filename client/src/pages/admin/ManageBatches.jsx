import React from "react";
import { Link } from "react-router-dom";

const ManageBatches = () => {
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
              <span className="text-main-600 fw-normal text-15">Manage Batches</span>
            </li>
          </ul>
        </div>

        <div>
          <Link to="/add-batch" className="btn btn-main rounded-pill py-9">
            Add New Batch
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0">Courses and Batches</h5>
        </div>
        <div className="card-body">
          <div className="accordion" id="coursesAccordion">
            {/* Course 1 */}
            <div className="accordion-item mb-16">
              <h2 className="accordion-header" id="courseOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCourseOne"
                  aria-expanded="false"
                  aria-controls="collapseCourseOne"
                >
                  Computer Science
                </button>
              </h2>
              <div
                id="collapseCourseOne"
                className="accordion-collapse collapse"
                aria-labelledby="courseOne"
                data-bs-parent="#coursesAccordion"
              >
                <div className="accordion-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Batch Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Batch A</td>
                        <td>01-02-2025</td>
                        <td>01-08-2025</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                          <button className="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Batch B</td>
                        <td>01-03-2025</td>
                        <td>01-09-2025</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                          <button className="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Course 2 */}
            <div className="accordion-item mb-16">
              <h2 className="accordion-header" id="courseTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCourseTwo"
                  aria-expanded="false"
                  aria-controls="collapseCourseTwo"
                >
                  Business Management
                </button>
              </h2>
              <div
                id="collapseCourseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="courseTwo"
                data-bs-parent="#coursesAccordion"
              >
                <div className="accordion-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Batch Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Batch X</td>
                        <td>01-04-2025</td>
                        <td>01-10-2025</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                          <button className="btn btn-sm btn-outline-danger">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBatches;
