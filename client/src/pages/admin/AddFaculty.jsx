import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddFaculty = () => {
  const [facultyDetails, setFacultyDetails] = useState({
    name: "",
    email: "",
    department: "",
    phoneNumber: "",
    joiningDate: "",
    qualification: "",
    specialization: "",
    experience: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacultyDetails({
      ...facultyDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Section */}
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
              <span className="text-main-600 fw-normal text-15">Add Faculty</span>
            </li>
          </ul>
        </div>
        <div>
          <Link to="/manage-faculty" className="btn btn-outline-main rounded-pill py-9">
            Manage Faculty
          </Link>
        </div>
      </div>

      {/* Add Faculty Form */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100">
          <h5 className="mb-0">Add New Faculty</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-16">
              <label htmlFor="name" className="form-label">
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={facultyDetails.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter faculty's full name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-16">
              <label htmlFor="email" className="form-label">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={facultyDetails.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter faculty's email"
                required
              />
            </div>

            {/* Department */}
            <div className="mb-16">
              <label htmlFor="department" className="form-label">
                Department <span className="text-danger">*</span>
              </label>
              <select
                id="department"
                name="department"
                value={facultyDetails.department}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="">Select Department</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business Management">Business Management</option>
                <option value="Design">Design</option>
                <option value="Full Stack Development">Full Stack Development</option>
              </select>
            </div>

            {/* Phone Number */}
            <div className="mb-16">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={facultyDetails.phoneNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter faculty's phone number"
                required
              />
            </div>

            {/* Joining Date */}
            <div className="mb-16">
              <label htmlFor="joiningDate" className="form-label">
                Joining Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                value={facultyDetails.joiningDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Qualification */}
            <div className="mb-16">
              <label htmlFor="qualification" className="form-label">
                Qualification <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                value={facultyDetails.qualification}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter faculty's qualification"
              />
            </div>

            {/* Specialization */}
            <div className="mb-16">
              <label htmlFor="specialization" className="form-label">
                Specialization <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={facultyDetails.specialization}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter faculty's specialization"
              />
            </div>

            {/* Experience */}
            <div className="mb-16">
              <label htmlFor="experience" className="form-label">
                Experience (in years) <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={facultyDetails.experience}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter faculty's experience in years"
                min="0"
              />
            </div>

            {/* Address */}
            <div className="mb-16">
              <label htmlFor="address" className="form-label">
                Address <span className="text-muted">(Optional)</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={facultyDetails.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter faculty's address"
                rows="3"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex-between gap-8">
              <button type="submit" className="btn btn-main rounded-pill py-9">
                Add Faculty
              </button>
              <Link to="/manage-faculty" className="btn btn-outline-danger rounded-pill py-9">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFaculty;
