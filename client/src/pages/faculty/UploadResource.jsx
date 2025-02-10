import React, { useState } from "react";
import { Link } from "react-router-dom";

const UploadResource = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedCourse || !selectedBatch || !selectedFile) {
      alert("Please fill out all fields and select a file to upload.");
      return;
    }
    alert(`Resource for ${selectedCourse} - ${selectedBatch} is ready for upload.`);
  };

  return (
    <div className="upload-resource-page p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <ul className="flex-align gap-4 mb-20">
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
            <span className="text-main-600 fw-normal text-15">Upload Schedual </span>
          </li>
        </ul>
      </div>

      {/* Form Card */}
      <div className="card bg-white p-26 shadow-md rounded-lg space-y-6">
        {/* Select Course */}
        <div>
          <label
            htmlFor="selectedCourse"
            className="block text-gray-700 font-medium"
          >
            Select Course
          </label>
          <select
            id="selectedCourse"
            className="form-control border-gray-300 rounded-md p-2 w-full"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Select Course --</option>
            <option value="Java">Java</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
          </select>
        </div>

        {/* Select Batch */}
        <div>
          <label
            htmlFor="selectedBatch"
            className="block text-gray-700 font-medium"
          >
            Select Batch
          </label>
          <select
            id="selectedBatch"
            className="form-control border-gray-300 rounded-md p-2 w-full"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">-- Select Batch --</option>
            <option value="Batch A">Batch A</option>
            <option value="Batch B">Batch B</option>
            <option value="Batch C">Batch C</option>
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label
            htmlFor="fileUpload"
            className="block text-gray-700 font-medium"
          >
            Upload File
          </label>
          <input
            id="fileUpload"
            type="file"
            className="form-control border-gray-300 rounded-md p-2 w-full"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <p className="text-gray-600 mt-2">
              Selected File: <strong>{selectedFile.name}</strong>
            </p>
          )}
        </div>

        {/* Upload Button */}
        <div>
          <button
            onClick={handleUpload}
            className="btn bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-600"
          >
            Upload Resource
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadResource;
