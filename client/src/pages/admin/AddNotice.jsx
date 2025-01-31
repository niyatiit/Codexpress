import React, { useState } from "react";

const AddNotice = () => {
  const [recipientType, setRecipientType] = useState("Student");

  const handleRecipientChange = (e) => {
    setRecipientType(e.target.value);
  };

  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <a href="/admin" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Add Notice</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">Create and Send Notification</h5>
        </div>
        <div className="card-body">
          <form className="form">
            {/* Notice Title */}
            <div className="mb-16">
              <label htmlFor="title" className="form-label fw-medium">
                Notice Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Enter the notice title"
                required
              />
            </div>

            {/* Notice Description */}
            <div className="mb-16">
              <label htmlFor="description" className="form-label fw-medium">
                Description
              </label>
              <textarea
                id="description"
                className="form-control"
                rows="4"
                placeholder="Enter detailed description for the notice"
                required
              ></textarea>
            </div>

            {/* Recipient Type */}
            <div className="mb-16">
              <label htmlFor="recipientType" className="form-label fw-medium">
                Recipient Type
              </label>
              <select
                id="recipientType"
                className="form-select"
                value={recipientType}
                onChange={handleRecipientChange}
              >
                <option value="Student">Students</option>
                <option value="Faculty">Faculty</option>
              </select>
            </div>

            {/* Batch/Department Selection */}
            <div className="mb-16">
              <label
                htmlFor={recipientType === "Student" ? "batch" : "department"}
                className="form-label fw-medium"
              >
                {recipientType === "Student" ? "Batch" : "Department"}
              </label>
              <select
                id={recipientType === "Student" ? "batch" : "department"}
                className="form-select"
              >
                {recipientType === "Student" ? (
                  <>
                    <option value="">Select Batch</option>
                    <option value="Batch A">Batch A</option>
                    <option value="Batch B">Batch B</option>
                  </>
                ) : (
                  <>
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Business Management">Business Management</option>
                  </>
                )}
              </select>
            </div>

            {/* Attachment Upload */}
            <div className="mb-16">
              <label htmlFor="attachment" className="form-label fw-medium">
                Attach File (Optional)
              </label>
              <input
                type="file"
                id="attachment"
                className="form-control"
                accept=".pdf, .docx, .jpg, .png"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-16">
              <button type="reset" className="btn btn-outline-secondary rounded-pill">
                Clear
              </button>
              <button type="submit" className="btn btn-main rounded-pill">
                Send Notification
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotice;
