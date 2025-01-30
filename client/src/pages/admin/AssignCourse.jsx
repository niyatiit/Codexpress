import React, { useState } from "react";
import { Link } from "react-router-dom";
const AssignCourse = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

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
              <span className="text-main-600 fw-normal text-15">Assign Course</span>
            </li>
          </ul>
        </div>

        <div className="flex-align justify-content-end gap-8">
          <button className="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">
            Save as Draft
          </button>
          <button className="btn btn-main rounded-pill py-9" disabled>
            Publish Student Info
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100">
          <h5 className="mb-0">Assignment Details</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="row gy-20">
              {/* Select Student */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Select Student</label>
                <select
                  className="form-select py-9"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  <option disabled selected>Select a student</option>
                  <option value="student1">John Doe</option>
                  <option value="student2">Jane Smith</option>
                </select>
              </div>

              {/* Select Course */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Select Course</label>
                <select
                  className="form-select py-9"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option disabled selected>Select a course</option>
                  <option value="course1">Full Stack Development</option>
                  <option value="course2">Data Science</option>
                </select>
              </div>

              {/* Select Batch */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Select Batch</label>
                <select
                  className="form-select py-9"
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  disabled={!selectedCourse}
                >
                  <option disabled selected>Select a batch</option>
                  <option value="batch1">Batch A (Jan - June)</option>
                  <option value="batch2">Batch B (July - Dec)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex-align justify-content-end gap-8 mt-4">
                <button type="button" className="btn btn-outline-main rounded-pill py-9">
                  Cancel
                </button>
                <button type="submit" className="btn btn-main rounded-pill py-9">
                  Assign Course
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignCourse;
