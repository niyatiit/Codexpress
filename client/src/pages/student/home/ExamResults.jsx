import React from "react";
import { Link } from "react-router-dom";

const ExamResults = () => {
  // List of exam results (This data can be fetched from an API in a real-world scenario)
  const examResults = [
    {
      id: 1,
      title: "Java Programming Final Exam",
      course: "Java",
      marksObtained: 45,
      totalMarks: 50,
      feedback: "Good attempt. Focus more on exception handling.",
    },
    {
      id: 2,
      title: "React.js Advanced Exam",
      course: "React.js",
      marksObtained: 55,
      totalMarks: 60,
      feedback: "Well done! Keep practicing state management.",
    },
    {
      id: 3,
      title: "Node.js Certification Exam",
      course: "Node.js",
      marksObtained: 65,
      totalMarks: 70,
      feedback: "Great job. Make sure to work on error handling.",
    },
  ];

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb mb-4">
        <ul className="flex-align gap-4">
          <li>
            <Link
              to="/student"
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
            <span className="text-main-600 fw-normal text-15">Exam Results</span>
          </li>
        </ul>
      </div>

      {/* Exam Results Table */}
      <div className="card p-28">
        <h2 className="text-xl font-semibold mb-4">Exam Results</h2>

        {/* Table */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Exam Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Marks Obtained</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total Marks</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {examResults.map((result) => (
              <tr key={result.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{result.title}</td>
                <td className="border border-gray-300 px-4 py-2">{result.course}</td>
                <td className="border border-gray-300 px-4 py-2">{result.marksObtained}</td>
                <td className="border border-gray-300 px-4 py-2">{result.totalMarks}</td>
                <td className="border border-gray-300 px-4 py-2">{result.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamResults;
