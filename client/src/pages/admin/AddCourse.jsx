import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddCourse = () => {
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
              <span className="text-main-600 fw-normal text-15">Add New Course</span>
            </li>
          </ul>
        </div>

        <div className="flex-align justify-content-end gap-8">
          <button className="btn btn-outline-main bg-main-100 border-main-100 text-main-600 rounded-pill py-9">
            Save as Draft
          </button>
          <button className="btn btn-main rounded-pill py-9" disabled>
            Publish Course
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-align gap-8">
          <h5 className="mb-0">Course Details</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="row gy-20">
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Course Title</label>
                <input
                  type="text"
                  className="form-control py-11"
                  placeholder="Name of the Lesson"
                />
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Course Category</label>
                <select className="form-select py-9">
                  <option disabled selected>Select Course Category</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business">Business</option>
                  <option value="Management">Management</option>
                </select>
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Course Level</label>
                <select className="form-select py-9">
                  <option disabled selected>Select Course Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Course Description</label>
                <textarea
                  className="form-control py-11"
                  placeholder="Enter course description"
                ></textarea>
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Course Price</label>
                <input
                  type="number"
                  className="form-control py-11"
                  placeholder="Enter price"
                />
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Course Duration</label>
                <input
                  type="text"
                  className="form-control py-11"
                  placeholder="Duration (e.g., 30 hours)"
                />
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Instructor Name</label>
                <input
                  type="text"
                  className="form-control py-11"
                  placeholder="Instructor Name"
                />
              </div>
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Course Image</label>
                <input
                  type="file"
                  className="form-control py-11"
                />
              </div>

              <div className="flex-align justify-content-end gap-8">
                <Link to="/mentor-courses" className="btn btn-outline-main rounded-pill py-9">Cancel</Link>
                <button type="submit" className="btn btn-main rounded-pill py-9">Add Course</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
