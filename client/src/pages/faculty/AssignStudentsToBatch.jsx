import React, { useState } from "react";
import { Link } from "react-router-dom";

const AssignStudentsToBatch = () => {
  // Sample data for students, batches, and courses
  const courses = [
    { id: "1", name: "Computer Science" },
    { id: "2", name: "Business Management" },
    { id: "3", name: "Design & Development" },
  ];

  const allStudents = [
    { id: "1", name: "John Doe", course: "Computer Science" },
    { id: "2", name: "Jane Smith", course: "Business Management" },
    { id: "3", name: "Alice Johnson", course: "Computer Science" },
    { id: "4", name: "Bob Brown", course: "Design & Development" },
  ];

  const batches = [
    { id: "1", name: "Batch A", course: "Computer Science", startDate: "01-02-2025", endDate: "01-08-2025" },
    { id: "2", name: "Batch B", course: "Business Management", startDate: "01-03-2025", endDate: "01-09-2025" },
    { id: "3", name: "Batch C", course: "Design & Development", startDate: "01-04-2025", endDate: "01-10-2025" },
  ];

  const [selectedCourse, setSelectedCourse] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [message, setMessage] = useState("");

  // Filter students by selected course
  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setSelectedCourse(selectedCourse);

    // Filter students based on course
    const filtered = allStudents.filter((student) => student.course === selectedCourse);
    setFilteredStudents(filtered);
  };

  const handleAssign = () => {
    if (!selectedStudent || !selectedBatch) {
      setMessage("Please select both a student and a batch.");
      return;
    }
    setMessage(`Student ${selectedStudent} has been assigned to Batch ${selectedBatch}!`);
  };

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Navigation */}
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
              <span className="text-main-600 fw-normal text-15">Assign Students to Batch</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Course Selection */}
      <div className="form-group mb-16">
        <label htmlFor="course">Select Course:</label>
        <select
          id="course"
          value={selectedCourse}
          onChange={handleCourseChange}
          className="form-control"
        >
          <option value="">--Select a Course--</option>
          {courses.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Student Selection (Filtered based on course) */}
      {selectedCourse && (
        <div className="form-group mb-16">
          <label htmlFor="student">Select Student:</label>
          <select
            id="student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="form-control"
          >
            <option value="">--Select a Student--</option>
            {filteredStudents.map((student) => (
              <option key={student.id} value={student.name}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Batch Selection */}
      {selectedCourse && (
        <div className="form-group mb-16">
          <label htmlFor="batch">Select Batch:</label>
          <select
            id="batch"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="form-control"
          >
            <option value="">--Select a Batch--</option>
            {batches
              .filter((batch) => batch.course === selectedCourse) // Filter batches based on course
              .map((batch) => (
                <option key={batch.id} value={batch.name}>
                  {batch.name} (Start: {batch.startDate}, End: {batch.endDate})
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Assign Button */}
      <button onClick={handleAssign} className="btn btn-main rounded-pill py-9">
        Assign
      </button>

      {/* Message Display */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssignStudentsToBatch;
