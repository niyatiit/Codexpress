import React, { useState } from "react";
import { Link } from "react-router-dom";

const MarkAttendance = () => {
  // Sample data for courses, batches, and students
  const courses = [
    { id: "1", name: "Computer Science" },
    { id: "2", name: "Business Management" },
    { id: "3", name: "Design & Development" },
  ];

  const batches = [
    { id: "1", name: "Batch A", course: "Computer Science" },
    { id: "2", name: "Batch B", course: "Computer Science" },
    { id: "3", name: "Batch X", course: "Business Management" },
    { id: "4", name: "Batch Y", course: "Design & Development" },
  ];

  const allStudents = [
    { id: "1", name: "John Doe", batch: "Batch A" },
    { id: "2", name: "Jane Smith", batch: "Batch B" },
    { id: "3", name: "Alice Johnson", batch: "Batch A" },
    { id: "4", name: "Bob Brown", batch: "Batch X" },
    { id: "5", name: "Charlie Lee", batch: "Batch Y" },
  ];

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [studentsInBatch, setStudentsInBatch] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState("");

  // Filter batches based on the selected course
  const handleCourseChange = (e) => {
    const courseName = e.target.value;
    setSelectedCourse(courseName);
    setSelectedBatch(""); // Reset batch selection
    setStudentsInBatch([]); // Reset student list
  };

  // Filter students based on the selected batch
  const handleBatchChange = (e) => {
    const batchName = e.target.value;
    setSelectedBatch(batchName);

    // Filter students based on the selected batch
    const filteredStudents = allStudents.filter(
      (student) => student.batch === batchName
    );
    setStudentsInBatch(filteredStudents);
  };

  // Handle attendance change (Present/Absent)
  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const handleSubmitAttendance = () => {
    if (!selectedBatch || !attendanceDate) {
      setMessage("Please select a batch and date.");
      return;
    }

    if (Object.keys(attendance).length === 0) {
      setMessage("Please mark attendance for all students.");
      return;
    }

    // Here, you can submit the attendance to your backend for saving
    setMessage("Attendance marked successfully!");
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
              <span className="text-main-600 fw-normal text-15">Mark Attendance</span>
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

      {/* Batch Selection (Filtered by Course) */}
      {selectedCourse && (
        <div className="form-group mb-16">
          <label htmlFor="batch">Select Batch:</label>
          <select
            id="batch"
            value={selectedBatch}
            onChange={handleBatchChange}
            className="form-control"
          >
            <option value="">--Select a Batch--</option>
            {batches
              .filter((batch) => batch.course === selectedCourse)
              .map((batch) => (
                <option key={batch.id} value={batch.name}>
                  {batch.name}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Date Selection */}
      {selectedBatch && (
        <div className="form-group mb-16">
          <label htmlFor="attendanceDate">Select Date:</label>
          <input
            type="date"
            id="attendanceDate"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="form-control"
          />
        </div>
      )}

      {/* Student List */}
      {selectedBatch && studentsInBatch.length > 0 && (
        <div className="student-list mb-16">
          <h5>Students in {selectedBatch}</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {studentsInBatch.map((student) => (
                <tr className=" text-black" key={student.id}>
                  <td className=" text-black">{student.name}</td>
                  <td>
                    <div className="attendance-actions">
                      <button
                        className={`btn btn-sm ${attendance[student.id] === "present" ? "btn-success" : "btn-success"}`}
                        onClick={() => handleAttendanceChange(student.id, "present")}
                      >
                        Present
                      </button>
                      <button
                        className={`btn btn-sm ${attendance[student.id] === "absent" ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={() => handleAttendanceChange(student.id, "absent")}
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submit Button */}
      <button onClick={handleSubmitAttendance} className="btn btn-main rounded-pill py-9">
        Submit Attendance
      </button>

      {/* Message Display */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default MarkAttendance;
