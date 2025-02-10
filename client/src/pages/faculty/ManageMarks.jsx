import React, { useState } from "react";
import { Link } from "react-router-dom";

const ManageMarks = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  const courses = ["Java Basics", "React Fundamentals", "Node.js"];
  const batches = ["Batch 1", "Batch 2", "Batch 3", "Batch 4"];
  const exams = ["Midterm Exam", "Final Exam", "Module 1 Exam", "Module 2 Exam"];

  const students = [
    { id: 1, name: "Alice", marks: 90 },
    { id: 2, name: "Bob", marks: 85 },
    { id: 3, name: "Charlie", marks: 80 },
    { id: 4, name: "David", marks: 75 },
    { id: 5, name: "Eve", marks: 70 },
  ];

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedBatch("");
    setSelectedExam("");
  };

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
    setSelectedExam("");
  };

  const handleExamChange = (e) => {
    setSelectedExam(e.target.value);
  };

  const handleMarksChange = (id, value) => {
    console.log(`Marks updated for student ${id}: ${value}`);
  };

  return (
    <div className="manage-marks-page p-6">
      {/* Header */}
      <div className="mb-8">
      <ul className="flex-align gap-4 mb-4">
            <li>
              <Link to="/faculty" className="text-gray-800 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Manage Marks </span>
            </li>
          </ul>
      </div>

      {/* Course Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Select Course</label>
        <select
          className="border border-gray-300 rounded-md p-2 w-full"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {/* Batch Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Select Batch</label>
        <select
          className="border border-gray-300 rounded-md p-2 w-full"
          value={selectedBatch}
          onChange={handleBatchChange}
          disabled={!selectedCourse}
        >
          <option value="">-- Select Batch --</option>
          {batches.map((batch, index) => (
            <option key={index} value={batch}>
              {batch}
            </option>
          ))}
        </select>
      </div>

      {/* Exam Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Select Exam</label>
        <select
          className="border border-gray-300 rounded-md p-2 w-full"
          value={selectedExam}
          onChange={handleExamChange}
          disabled={!selectedBatch}
        >
          <option value="">-- Select Exam --</option>
          {exams.map((exam, index) => (
            <option key={index} value={exam}>
              {exam}
            </option>
          ))}
        </select>
      </div>

      {/* Student Marks Table */}
      {selectedExam && (
        <div className="student-marks">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Marks</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">Student ID</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Student Name</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{student.id}</td>
                  <td className="border border-gray-200 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <input
                      type="number"
                      className="border border-gray-300 rounded-md p-1 w-20"
                      defaultValue={student.marks}
                      onChange={(e) => handleMarksChange(student.id, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMarks;
