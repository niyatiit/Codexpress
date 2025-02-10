import React, { useState } from "react";
import { Link } from "react-router-dom";
const ViewResults = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  // Sample data for results
  const resultsData = [
    { studentName: "John Doe", marks: 95, status: "Pass" },
    { studentName: "Jane Smith", marks: 87, status: "Pass" },
    { studentName: "Alice Brown", marks: 45, status: "Fail" },
    { studentName: "Bob Johnson", marks: 76, status: "Pass" },
  ];

  return (
    <div className="view-results-page p-6 space-y-8">
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
              View Result
            </span>
          </li>
        </ul>
      </div>

      {/* Filters Section */}
      <div className="card p-36 bg-white shadow-md rounded-lg space-y-6">
        {/* Course Selection */}
        <div className="form-group">
          <label
            htmlFor="course"
            className="form-label text-gray-700 font-medium"
          >
            Select Course
          </label>
          <select
            id="course"
            className="form-control border-gray-300 rounded-md p-2 w-full text-gray-800"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select a course</option>
            <option value="Java Basics">Java Basics</option>
            <option value="React Fundamentals">React Fundamentals</option>
            <option value="Node.js">Node.js</option>
          </select>
        </div>

        {/* Batch Selection */}
        <div className="form-group">
          <label
            htmlFor="batch"
            className="form-label text-gray-700 font-medium"
          >
            Select Batch
          </label>
          <select
            id="batch"
            className="form-control border-gray-300 rounded-md p-2 w-full text-gray-800"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">Select a batch</option>
            <option value="Batch 1">Batch 1</option>
            <option value="Batch 2">Batch 2</option>
            <option value="Batch 3">Batch 3</option>
          </select>
        </div>

        {/* Exam Selection */}
        <div className="form-group">
          <label
            htmlFor="exam"
            className="form-label text-gray-700 font-medium"
          >
            Select Exam
          </label>
          <select
            id="exam"
            className="form-control border-gray-300 rounded-md p-2 w-full text-gray-800"
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
          >
            <option value="">Select an exam</option>
            <option value="Midterm Exam">Midterm Exam</option>
            <option value="Final Exam">Final Exam</option>
            <option value="Module 1 Test">Module 1 Test</option>
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="card p-36 bg-white shadow-md rounded-lg space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Results</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 p-2 text-left">
                Student Name
              </th>
              <th className="border border-gray-300 p-2 text-left">Marks</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {resultsData.map((result, index) => (
              <tr key={index} className="hover:bg-gray-50 text-gray-800">
                <td className="border border-gray-300 p-2">
                  {result.studentName}
                </td>
                <td className="border border-gray-300 p-2">{result.marks}</td>
                <td className="border border-gray-300 p-2">{result.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewResults;
