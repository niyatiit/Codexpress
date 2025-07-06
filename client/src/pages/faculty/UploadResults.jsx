import React from "react";
import { Link } from "react-router-dom";

const UploadResults = () => {
  return (
    <div className="upload-results-page p-6 space-y-8">
      <div className="mb-8">
        <ul className="flex-align gap-4 mb-4">
          <li>
            <Link
              to="/faculty"
              className="text-gray-800 fw-normal text-15 hover-text-main-600"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-500 fw-normal d-flex">
              <i className="ph ph-caret-right"></i>
            </span>
          </li>
          <li>
            <span className="text-main-600 fw-normal text-15">
              Upload Result
            </span>
          </li>
        </ul>
      </div>

      {/* Form Section */}
      <div className="card p-36 bg-white shadow-md rounded-lg space-y-6">
        {/* Course Selection */}
        <div className="form-group">
          <label
            htmlFor="course"
            className="form-label text-gray-700 font-medium"
          >
            Select Course
          </label>
          <select
            id="course"
            className="form-control border-gray-300 rounded-md p-2 w-full text-gray-800"
          >
            <option value="">Select a course</option>
            <option value="Java Basics">Java Basics</option>
            <option value="React Fundamentals">React Fundamentals</option>
            <option value="Node.js">Node.js</option>
          </select>
        </div>

        {/* Batch Selection */}
        <div className="form-group">
          <label
            htmlFor="batch"
            className="form-label text-gray-700 font-medium"
          >
            Select Batch
          </label>
          <select
            id="batch"
            className="form-control border-gray-300 rounded-md p-2 w-full text-gray-800"
          >
            <option value="">Select a batch</option>
            <option value="Batch 1">Batch 1</option>
            <option value="Batch 2">Batch 2</option>
            <option value="Batch 3">Batch 3</option>
          </select>
        </div>

        {/* Exam Selection */}
        <div className="form-group">
          <label
            htmlFor="exam"
            className="form-label text-gray-700 font-medium"
          >
            Select Exam
          </label>
          <select
            id="exam"
            className="form-control border-gray-300 rounded-md p-2 w-full text-gray-800"
          >
            <option value="">Select an exam</option>
            <option value="Midterm Exam">Midterm Exam</option>
            <option value="Final Exam">Final Exam</option>
            <option value="Module 1 Test">Module 1 Test</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="form-group">
          <label
            htmlFor="fileUpload"
            className="form-label text-gray-700 font-medium"
          >
            Upload Results File
          </label>
          <input
            type="file"
            id="fileUpload"
            className="form-control border-gray-300 rounded-md p-2 w-full text-gray-800"
          />
          <p className="text-sm text-gray-500 mt-2">
            Accepted formats: .xls, .xlsx, .csv
          </p>
        </div>

        {/* Action Buttons */}
        <div className="form-actions flex justify-end gap-4">
          <button
            type="button"
            className="btn bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            type="button"
            className="btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Upload Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadResults;
