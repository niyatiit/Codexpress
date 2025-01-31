import React, { useState } from "react";
import { Link } from "react-router-dom";

const ManageCertificates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  // Sample data
  const certificates = [
    {
      id: "c1",
      studentName: "John Doe",
      course: "Full Stack Development",
      batch: "Batch A (Jan 2025)",
      issuedDate: "2025-01-30",
    },
    {
      id: "c2",
      studentName: "Jane Smith",
      course: "Data Science",
      batch: "Batch X (Mar 2025)",
      issuedDate: "2025-01-29",
    },
    {
      id: "c3",
      studentName: "Alice Brown",
      course: "Full Stack Development",
      batch: "Batch B (Feb 2025)",
      issuedDate: "2025-01-28",
    },
  ];

  const courses = [
    { id: "1", name: "Full Stack Development" },
    { id: "2", name: "Data Science" },
    { id: "3", name: "Cybersecurity" },
  ];

  const batches = {
    "1": [
      { id: "1a", name: "Batch A (Jan 2025)" },
      { id: "1b", name: "Batch B (Feb 2025)" },
    ],
    "2": [
      { id: "2a", name: "Batch X (Mar 2025)" },
      { id: "2b", name: "Batch Y (Apr 2025)" },
    ],
  };

  // Filter certificates based on search, course, and batch
  const filteredCertificates = certificates.filter((certificate) => {
    const matchesSearch =
      certificate.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse
      ? certificate.course === courses.find((c) => c.id === selectedCourse)?.name
      : true;
    const matchesBatch = selectedBatch
      ? certificate.batch ===
        batches[selectedCourse]?.find((b) => b.id === selectedBatch)?.name
      : true;
    return matchesSearch && matchesCourse && matchesBatch;
  });

  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link
                to="/admin"
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
                Manage Certificates
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">Certificates</h5>
          <div className="search-bar flex gap-4">
            <input
              type="text"
              placeholder="Search by student name..."
              className="form-control text-gray-800 border border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="form-control"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedBatch("");
              }}
            >
              <option value="">Filter by Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <select
              className="form-control"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              disabled={!selectedCourse}
            >
              <option value="">Filter by Batch</option>
              {batches[selectedCourse]?.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-gray-800">Student Name</th>
                <th className="text-gray-800">Course</th>
                <th className="text-gray-800">Batch</th>
                <th className="text-gray-800">Issued Date</th>
                <th className="text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.length > 0 ? (
                filteredCertificates.map((certificate) => (
                  <tr key={certificate.id}>
                    <td className="text-gray-800">{certificate.studentName}</td>
                    <td className="text-gray-800">{certificate.course}</td>
                    <td className="text-gray-800">{certificate.batch}</td>
                    <td className="text-gray-800">{certificate.issuedDate}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600 me-2">
                        View
                      </button>
                      <button className="btn btn-sm btn-outline-primary text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600 me-2">
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger text-red-600 border-red-600 hover:text-white hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500">
                    No certificates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCertificates;
