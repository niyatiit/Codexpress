import React, { useState } from "react";
import { Link } from "react-router-dom";

const QuizResponses = () => {
  const [responses, setResponses] = useState([
    {
      id: 1,
      studentName: "John Doe",
      quizTitle: "Java Basics Quiz",
      submissionDate: "2025-02-09",
      score: "8/10",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      quizTitle: "React Fundamentals",
      submissionDate: "2025-02-08",
      score: "7/10",
    },
    {
      id: 3,
      studentName: "Emily Johnson",
      quizTitle: "Node.js Quiz",
      submissionDate: "2025-02-07",
      score: "9/10",
    },
  ]);

  return (
    <div className="dashboard-body">
      {/* Breadcrumb */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb">
          <ul className="flex-align gap-4">
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
              <span className="text-main-600 fw-normal text-15">Quiz Responses</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Card Header */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">Quiz Responses</h5>
        </div>

        {/* Table */}
        <div className="card-body">
          {responses.length > 0 ? (
            <table className="table border text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="py-2 px-4 border-b">#</th>
                  <th className="py-2 px-4 border-b">Student Name</th>
                  <th className="py-2 px-4 border-b">Quiz Title</th>
                  <th className="py-2 px-4 border-b">Submission Date</th>
                  <th className="py-2 px-4 border-b">Score</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((response, index) => (
                  <tr key={response.id}>
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{response.studentName}</td>
                    <td className="py-2 px-4 border-b">{response.quizTitle}</td>
                    <td className="py-2 px-4 border-b">{response.submissionDate}</td>
                    <td className="py-2 px-4 border-b">{response.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500 py-4">No responses available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResponses;
