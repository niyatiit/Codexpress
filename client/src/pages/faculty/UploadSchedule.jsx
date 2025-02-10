import React, { useState } from "react";
import { Link } from "react-router-dom";

const UploadSchedule = () => {
  const [batch, setBatch] = useState("");
  const [course, setCourse] = useState("");
  const [scheduleFile, setScheduleFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    setScheduleFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (batch && course && scheduleFile) {
      setSuccessMessage("Schedule uploaded successfully!");
      setBatch("");
      setCourse("");
      setScheduleFile(null);
      setTimeout(() => setSuccessMessage(""), 3000); // Clear the success message after 3 seconds
    } else {
      alert("Please fill out all fields and upload a file.");
    }
  };

  return (
    <div className="upload-schedule-page p-6 space-y-8">
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

      {/* Success Message */}
      {successMessage && (
        <div className="alert bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="card bg-white p-26 shadow-md rounded-lg space-y-6"
      >
        {/* Select Course */}
        <div>
          <label htmlFor="course" className="block text-gray-700 font-medium">
            Select Course
          </label>
          <select
            id="course"
            className="form-control border-gray-300 rounded-md p-2 w-full"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">-- Select Course --</option>
            <option value="Java">Java</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
          </select>
        </div>

        {/* Select Batch */}
        <div>
          <label htmlFor="batch" className="block text-gray-700 font-medium">
            Select Batch
          </label>
          <select
            id="batch"
            className="form-control border-gray-300 rounded-md p-2 w-full"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          >
            <option value="">-- Select Batch --</option>
            <option value="Batch A">Batch A</option>
            <option value="Batch B">Batch B</option>
            <option value="Batch C">Batch C</option>
          </select>
        </div>

        {/* Upload Schedule File */}
        <div>
          <label
            htmlFor="scheduleFile"
            className="block text-gray-700 font-medium"
          >
            Upload Schedule File
          </label>
          <input
            id="scheduleFile"
            type="file"
            className="form-control border-gray-300 rounded-md p-2 w-full"
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="btn bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-600"
          >
            Upload Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadSchedule;
