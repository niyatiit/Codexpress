import React from "react";
import { Link } from "react-router-dom";

const AddBatch = () => {
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
              <span className="text-main-600 fw-normal text-15">Add New Batch</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0">Batch Details</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="row gy-20">
              {/* Batch Information */}
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Batch Name</label>
                <input
                  type="text"
                  className="form-control py-11"
                  placeholder="Enter batch name"
                  name="batchName"
                />
              </div>

              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Course</label>
                <select className="form-select py-9" name="course">
                  <option disabled selected>Select Course</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business Management">Business Management</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Start Date</label>
                <input
                  type="date"
                  className="form-control py-11"
                  name="startDate"
                />
              </div>

              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">End Date</label>
                <input
                  type="date"
                  className="form-control py-11"
                  name="endDate"
                />
              </div>

              {/* Timing and Days */}
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Batch Timing</label>
                <input
                  type="time"
                  className="form-control py-11"
                  name="batchTiming"
                />
              </div>

              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Days</label>
                <select className="form-select py-9" name="days" multiple>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              {/* Batch Capacity and Faculty */}
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Batch Capacity</label>
                <input
                  type="number"
                  className="form-control py-11"
                  placeholder="Enter batch capacity"
                  name="capacity"
                />
              </div>

              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Assigned Faculty</label>
                <select className="form-select py-9" name="faculty">
                  <option disabled selected>Select Faculty</option>
                  <option value="Dr. John Doe">Dr. John Doe</option>
                  <option value="Prof. Jane Smith">Prof. Jane Smith</option>
                  <option value="Dr. Mike Brown">Dr. Mike Brown</option>
                </select>
              </div>

              {/* Description */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Description</label>
                <textarea
                  className="form-control py-11"
                  placeholder="Enter batch description"
                  name="description"
                ></textarea>
              </div>

              <div className="flex-align justify-content-end gap-8">
                <Link to="/batches" className="btn btn-outline-main rounded-pill py-9">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-main rounded-pill py-9">
                  Save Batch
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBatch;
