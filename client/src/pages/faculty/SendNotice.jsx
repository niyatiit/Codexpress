import React, { useState } from "react";
import { Link } from "react-router-dom";

const SendNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [batch, setBatch] = useState("");
  const [course, setCourse] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && batch && course) {
      setSuccessMessage("Notice sent successfully!");
      setTitle("");
      setDescription("");
      setBatch("");
      setCourse("");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear the message after 3 seconds
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="send-notice-page p-6 space-y-8">
      {/* Header */}
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
              Send Notice
            </span>
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
        className="card bg-white p-36 shadow-md rounded-lg space-y-6"
      >
        {/* Notice Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Notice Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter notice title"
            className="form-control border-gray-300 rounded-md p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Notice Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium">
            Notice Description
          </label>
          <textarea
            id="description"
            placeholder="Enter notice description"
            className="form-control border-gray-300 rounded-md p-2 w-full"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="btn bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-600"
          >
            Send Notice
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendNotice;
