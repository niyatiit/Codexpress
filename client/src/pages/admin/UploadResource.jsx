import React from "react";
import { Link } from "react-router-dom";

const UploadResource = () => {
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
              <span className="text-main-600 fw-normal text-15">Upload Resource</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Form for Uploading Resource */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100">
          <h5 className="mb-0">Upload New Resource</h5>
        </div>
        <div className="card-body">
          <form>
            {/* Resource Title */}
            <div className="mb-16">
              <label className="form-label fw-medium text-gray-700">Resource Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the resource title"
                required
              />
            </div>

            {/* Resource Description */}
            <div className="mb-16">
              <label className="form-label fw-medium text-gray-700">Description</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Provide a brief description of the resource"
                required
              ></textarea>
            </div>

            {/* Resource File Upload */}
            <div className="mb-16">
              <label className="form-label fw-medium text-gray-700">Upload File</label>
              <input
                type="file"
                className="form-control"
                accept=".pdf,.doc,.ppt,.xls,.zip,.jpg,.png,.mp4"
                required
              />
              <small className="text-gray-500">Supported formats: PDF, DOC, PPT, XLS, ZIP, JPG, PNG, MP4</small>
            </div>

            {/* Course Selection */}
            <div className="mb-16">
              <label className="form-label fw-medium text-gray-700">Assign to Course</label>
              <select className="form-control" required>
                <option value="">Select Course</option>
                <option value="1">Full Stack Development</option>
                <option value="2">Data Science</option>
                <option value="3">Java Programming</option>
                <option value="4">UI/UX Design</option>
              </select>
            </div>

            {/* Batch Selection */}
            <div className="mb-16">
              <label className="form-label fw-medium text-gray-700">Assign to Batch</label>
              <select className="form-control" required>
                <option value="">Select Batch</option>
                <option value="A">Batch A</option>
                <option value="B">Batch B</option>
                <option value="C">Batch C</option>
              </select>
            </div>

            {/* Tags */}
            <div className="mb-16">
              <label className="form-label fw-medium text-gray-700">Tags</label>
              <input
                type="text"
                className="form-control"
                placeholder="Add tags (e.g., Java, React, AI)"
              />
              <small className="text-gray-500">Separate tags with commas</small>
            </div>

            {/* Submit Button */}
            <div className="flex-between mt-16">
              <button type="reset" className="btn btn-outline-secondary rounded-pill px-16">
                Reset
              </button>
              <button type="submit" className="btn btn-main rounded-pill px-16">
                Upload Resource
              </button>
            </div>
          </form>
        </div>
      </div>

   
    </div>
  );
};

export default UploadResource;
