import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv"; // For exporting student data if needed

const IssueCertificate = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [isCertificateIssued, setIsCertificateIssued] = useState(false);

  // Example Data
  const students = [
    { id: 1, name: "John Doe", batch: "Java", course: "Full Stack" },
    { id: 2, name: "Jane Smith", batch: "C++", course: "C Programming" },
    { id: 3, name: "Alan Walker", batch: "Web Development", course: "Web Dev Basics" },
  ];

  const batches = [
    "Java", "C++", "Web Development", "React", "Node.js"
  ];

  const handleCertificateIssuance = () => {
    // In a real scenario, here you'd interact with the backend to issue the certificate
    setIsCertificateIssued(true);
    setTimeout(() => setIsCertificateIssued(false), 3000); // Reset after a few seconds
  };

  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/admin" className="text-gray-800 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Issue Certificate</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">Issue Certificate to Student</h5>
        </div>
        <div className="card-body">
          {/* Student and Batch Selection */}
          <div className="filters mb-4 flex-wrap gap-4">
            <div className="d-flex">
              <select
                className="form-control"
                value={selectedStudent}
                onChange={e => setSelectedStudent(e.target.value)}
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>

              <select
                className="form-control ms-4"
                value={selectedBatch}
                onChange={e => setSelectedBatch(e.target.value)}
                disabled={!selectedStudent}
              >
                <option value="">Select Batch</option>
                {batches.map(batch => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Issue Certificate Button */}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-main rounded-pill py-9 text-white bg-blue-600 hover:bg-blue-700"
              onClick={handleCertificateIssuance}
              disabled={!selectedStudent || !selectedBatch}
            >
              Issue Certificate
            </button>
            <div>
              <CSVLink
                data={students}
                headers={[
                  { label: "Student ID", key: "id" },
                  { label: "Name", key: "name" },
                  { label: "Batch", key: "batch" },
                  { label: "Course", key: "course" },
                ]}
                filename="students_list.csv"
                className="btn btn-sm btn-outline-success text-green-600 border-green-600 hover:text-white hover:bg-green-600"
              >
                Export Student List
              </CSVLink>
            </div>
          </div>

          {/* Confirmation Message */}
          {isCertificateIssued && (
            <div className="alert alert-success mt-4" role="alert">
              Certificate has been successfully issued to {students.find(student => student.id === selectedStudent)?.name}.
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-4">
            <h6>Certificate Information</h6>
            <p>
              Once the certificate is issued, it will be added to the student's dashboard, where they can view or download it.
              You can select a student and issue the certificate for the selected course and batch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCertificate;
