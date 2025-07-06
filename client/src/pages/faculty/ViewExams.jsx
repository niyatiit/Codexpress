import React, { useState } from "react";
import { Link } from "react-router-dom";

const ViewExams = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  const courses = ["Java Basics", "React Fundamentals", "Node.js"];
  const batches = ["Batch 1", "Batch 2", "Batch 3", "Batch 4"];

  const exams = [
    {
      course: "Java Basics",
      batch: "Batch 1",
      examName: "Midterm Exam",
      id: 1,
    },
    { course: "Java Basics", batch: "Batch 1", examName: "Final Exam", id: 2 },
    {
      course: "React Fundamentals",
      batch: "Batch 3",
      examName: "Module 1 Exam",
      id: 3,
    },
    {
      course: "React Fundamentals",
      batch: "Batch 3",
      examName: "Module 2 Exam",
      id: 4,
    },
  ];

  const examDetails = {
    1: [
      { rank: 1, name: "Alice", marks: 90 },
      { rank: 2, name: "Bob", marks: 85 },
      { rank: 3, name: "Charlie", marks: 80 },
      { rank: 4, name: "David", marks: 75 },
      { rank: 5, name: "Eve", marks: 70 },
    ],
    2: [
      { rank: 1, name: "Frank", marks: 92 },
      { rank: 2, name: "Grace", marks: 88 },
      { rank: 3, name: "Hannah", marks: 84 },
      { rank: 4, name: "Ivy", marks: 80 },
      { rank: 5, name: "Jack", marks: 78 },
    ],
    3: [
      { rank: 1, name: "Tom", marks: 89 },
      { rank: 2, name: "Jerry", marks: 86 },
      { rank: 3, name: "Anna", marks: 82 },
      { rank: 4, name: "Nina", marks: 80 },
      { rank: 5, name: "Leo", marks: 78 },
    ],
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedBatch("");
    setSelectedExam("");
  };

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
    setSelectedExam("");
  };

  const handleExamClick = (examId) => {
    setSelectedExam(examId);
  };

  const filteredExams = exams.filter(
    (exam) => exam.course === selectedCourse && exam.batch === selectedBatch
  );

  const examResults = selectedExam ? examDetails[selectedExam] : [];

  return (
    <div className="view-exams-page p-6">
   
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
            <span className="text-main-600 fw-normal text-15">View Exam </span>
          </li>
        </ul>
      </div>

      {/* Course Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select Course
        </label>
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
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Select Batch
        </label>
        <select
          className="border border-gray-300 rounded-md p-2 w-full"
          value={selectedBatch}
          onChange={handleBatchChange}
        >
          <option value="">-- Select Batch --</option>
          {batches.map((batch, index) => (
            <option key={index} value={batch}>
              {batch}
            </option>
          ))}
        </select>
      </div>

      {/* Exam List */}
      {selectedCourse && selectedBatch && (
        <div className="exam-list mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Available Exams
          </h2>
          {filteredExams.length > 0 ? (
            <ul className="list-disc pl-5">
              {filteredExams.map((exam) => (
                <li
                  key={exam.id}
                  className="text-blue-500 cursor-pointer hover:underline mb-2"
                  onClick={() => handleExamClick(exam.id)}
                >
                  {exam.examName}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No exams available for the selected course and batch.
            </p>
          )}
        </div>
      )}

      {/* Exam Results */}
      {selectedExam && (
        <div className="exam-results mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Top 5 Students
          </h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Rank
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Student Name
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Marks
                </th>
              </tr>
            </thead>
            <tbody>
              {examResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    {result.rank}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {result.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {result.marks}
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

export default ViewExams;
