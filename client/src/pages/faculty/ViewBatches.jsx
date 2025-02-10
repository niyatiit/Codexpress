import React, { useState } from "react";
import { Link } from "react-router-dom";

const ViewBatches = () => {
  // Sample courses data with batches
  const courses = [
    {
      id: 1,
      name: "Java",
      batches: [
        {
          id: 1,
          batchType: "Morning",
          // Batch name includes the course name and timing details
          name: "Java – Morning Batch 1",
          startDate: "2025-01-15",
          endDate: "2025-04-15",
        },
        {
          id: 2,
          batchType: "Evening",
          name: "Java – Evening Batch 1",
          startDate: "2025-02-01",
          endDate: "2025-05-01",
        },
        {
          id: 3,
          batchType: "Morning",
          name: "Java – Morning Batch 2",
          startDate: "2025-03-01",
          endDate: "2025-06-01",
        },
      ],
    },
    {
      id: 2,
      name: "Python",
      batches: [
        {
          id: 4,
          batchType: "Morning",
          name: "Python – Morning Batch 1",
          startDate: "2025-03-01",
          endDate: "2025-06-01",
        },
        {
          id: 5,
          batchType: "Evening",
          name: "Python – Evening Batch 1",
          startDate: "2025-03-15",
          endDate: "2025-07-01",
        },
      ],
    },
    {
      id: 3,
      name: "JavaScript",
      batches: [
        {
          id: 6,
          batchType: "Evening",
          name: "JavaScript – Evening Batch 1",
          startDate: "2025-04-01",
          endDate: "2025-08-01",
        },
      ],
    },
  ];

  // State to hold the selected course ID
  const [selectedCourseId, setSelectedCourseId] = useState("2");

  // Find the selected course based on the dropdown value
  const selectedCourse = courses.find(
    (course) => course.id === Number(selectedCourseId)
  );

  // Group batches by batchType if a course is selected
  const morningBatches = selectedCourse
    ? selectedCourse.batches.filter((batch) => batch.batchType === "Morning")
    : [];
  const eveningBatches = selectedCourse
    ? selectedCourse.batches.filter((batch) => batch.batchType === "Evening")
    : [];

  return (
    <div className="dashboard-body">
      {/* Embedded CSS styling */}
      <style>{`
        .dashboard-body {
          padding: 20px;
          font-family: Arial, sans-serif;
          color: #333;
        }
        /* Breadcrumb Styles */
        .breadcrumb-with-buttons {
          margin-bottom: 24px;
        }
        .breadcrumb ul {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0;
          margin: 0;
        }
        .breadcrumb li {
          display: flex;
          align-items: center;
        }
        .text-gray-200 { color: #ccc; }
        .text-gray-500 { color: #aaa; }
        .text-main-600 { color: rgb(18, 109, 255); }
        .fw-normal { font-weight: normal; }
        .text-15 { font-size: 15px; }
        .hover-text-main-600:hover { color: rgb(0, 106, 255); }
        .flex-between { display: flex; justify-content: space-between; }
        .flex-align { display: flex; align-items: center; }
        .flex-wrap { flex-wrap: wrap; }
        .mb-24 { margin-bottom: 24px; }
        /* Form and Dropdown */
        .form-group {
          margin-bottom: 16px;
        }
        .select-course {
          padding: 8px;
          font-size: 1rem;
          border-radius: 4px;
          border: 1px solid #ccc;
          margin-left: 8px;
        }
        /* Table Styles */
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        table th, table td {
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }
        table th {
          background-color: #f8f8f8;
        }
        /* Button Styles */
        .btn {
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.9rem;
          transition: background-color 0.3s ease;
          cursor: pointer;
          border: none;
        }
        .btn-outline-primary {
          // // background-color: rgb(0, 110, 255);
          color: black;
          border: 1px solid rgb(0, 115, 255);
        }
        .btn-outline-primary:hover {
          background-color: rgb(0, 106, 255);
          color: #fff;
        }
        .btn-outline-danger {
          background-color: transparent;
          color: #dc3545;
          border: 1px solid #dc3545;
        }
        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: #fff;
        }
      `}</style>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-with-buttons flex-between flex-wrap mb-24">
        <div className="breadcrumb">
          <ul className="flex-align">
            <li>
              <Link
                to="/admin"
                className="text-gray-200 fw-normal text-15 hover-text-main-600"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">
                View Batches
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Course Selection Dropdown */}
      <div className="form-group">
        <label htmlFor="courseSelect" className="fw-normal text-15">
          Select Course:
        </label>
        <select
          id="courseSelect"
          className="select-course"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">-- Select a Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display Batches for Selected Course */}
      {selectedCourse ? (
        <div>
          <h3 className="text-main-600 fw-normal text-15 mb-24">
            Batches for {selectedCourse.name}
          </h3>

          {/* Morning Batches Section */}
          {morningBatches.length > 0 && (
            <div className="mb-24">
              <h4>Morning Batches</h4>
              <table>
                <thead>
                  <tr>
                    <th>Batch Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {morningBatches.map((batch) => (
                    <tr key={batch.id}>
                      <td>{batch.name}</td>
                      <td>{batch.startDate}</td>
                      <td>{batch.endDate}</td>
                      <td>
                      <button className="btn btn-outline-primary me-2">
                          Edit
                        </button>
                        <button className="btn text-red-500 btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Evening Batches Section */}
          {eveningBatches.length > 0 && (
            <div className="mb-24">
              <h4>Evening Batches</h4>
              <table>
                <thead>
                  <tr>
                    <th>Batch Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {eveningBatches.map((batch) => (
                    <tr key={batch.id}>
                      <td>{batch.name}</td>
                      <td>{batch.startDate}</td>
                      <td>{batch.endDate}</td>
                      <td>
                        <button className="btn btn-outline-primary me-2">
                          Edit
                        </button>
                        <button className="btn text-red-500 btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {morningBatches.length === 0 &&
            eveningBatches.length === 0 && (
              <p>No batches available for this course.</p>
            )}
        </div>
      ) : (
        <p>Please select a course to view its batches.</p>
      )}
    </div>
  );
};

export default ViewBatches;
