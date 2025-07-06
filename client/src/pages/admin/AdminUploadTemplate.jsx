import React, { useState } from 'react';

const AdminUploadTemplate = () => {
  const [templateName, setTemplateName] = useState('');
  const [course, setCourse] = useState('');
  const [courses, setCourses] = useState([
    { id: '1', name: 'Web Development Fundamentals' },
    { id: '2', name: 'Data Science Basics' },
    { id: '3', name: 'Mobile App Development' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle template upload logic here
    console.log({
      templateName,
      course,
      file: e.target.templateFile.files[0]
    });
    alert('Template uploaded successfully!');
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
              <span className="text-main-600 fw-normal text-15">Upload Certificate Template</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">Upload New Certificate Template</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="form">
            <div className="mb-16">
              <label htmlFor="templateName" className="form-label fw-medium">
                Template Name
              </label>
              <input
                type="text"
                id="templateName"
                className="form-control"
                placeholder="e.g., Web Development Certificate"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                required
              />
            </div>

            <div className="mb-16">
              <label htmlFor="course" className="form-label fw-medium">
                Associated Course
              </label>
              <select
                id="course"
                className="form-select"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-16">
              <label htmlFor="templateFile" className="form-label fw-medium">
                Template File (PDF or Image)
              </label>
              <input
                type="file"
                id="templateFile"
                className="form-control"
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
              <small className="text-gray-500">Upload the certificate template design</small>
            </div>

            <div className="flex gap-16">
              <button type="reset" className="btn btn-outline-secondary rounded-pill">
                Clear
              </button>
              <button type="submit" className="btn btn-main rounded-pill">
                Upload Template
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUploadTemplate;