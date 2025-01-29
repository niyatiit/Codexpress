import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddStudent = () => {

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
              <span className="text-main-600 fw-normal text-15">Add New Student</span>
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
        <div className="card-header border-bottom border-gray-100 flex-align gap-8">
          <h5 className="mb-0">Student Details</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="row gy-20">
              {/* Personal Details */}
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">First Name</label>
                <input
                  type="text"
                  className="form-control py-11"
                  placeholder="Enter first name"
                  name="firstName"
                />
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Last Name</label>
                <input
                  type="text"
                  className="form-control py-11"
                  placeholder="Enter last name"
                  name="lastName"
                />
              </div>

              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Email Address</label>
                <input
                  type="email"
                  className="form-control py-11"
                  placeholder="Enter email"
                  name="email"
                />
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Phone Number</label>
                <input
                  type="tel"
                  className="form-control py-11"
                  placeholder="Enter phone number"
                  name="phone"
                />
              </div>

              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Date of Birth</label>
                <input
                  type="date"
                  className="form-control py-11"
                  name="dob"
                />
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Gender</label>
                <select className="form-select py-9" name="gender">
                  <option disabled selected>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Course Selection */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Select Course</label>
                <select className="form-select py-9" name="course">
                  <option disabled selected>Select Course</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business Management">Business Management</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  {/* More courses */}
                </select>
              </div>

              {/* Address and Profile Image */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Address</label>
                <textarea
                  className="form-control py-11"
                  placeholder="Enter address"
                  name="address"
                ></textarea>
              </div>

              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Profile Image</label>
                <input
                  type="file"
                  className="form-control py-11"
                  name="profileImage"
                />
              </div>

              <div className="flex-align justify-content-end gap-8">
                <Link to="/students" className="btn btn-outline-main rounded-pill py-9">Cancel</Link>
                <button type="submit" className="btn btn-main rounded-pill py-9">Add Student</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
