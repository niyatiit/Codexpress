import React from "react";
import { Link } from "react-router-dom";

const ViewQuizzes = () => {
  const quizzes = [
    {
      id: 1,
      title: "Java Basics Quiz",
      course: "Java",
      batch: "Batch A",
      duration: "30 mins",
      totalMarks: 50,
    },
    {
      id: 2,
      title: "React Fundamentals",
      course: "React",
      batch: "Batch B",
      duration: "45 mins",
      totalMarks: 60,
    },
    {
      id: 3,
      title: "Node.js Intermediate",
      course: "Node.js",
      batch: "Batch C",
      duration: "40 mins",
      totalMarks: 70,
    },
  ];

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb mb-4">
        <ul className="flex-align gap-4">
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
            <span className="text-main-600 fw-normal text-15">View Quiz</span>
          </li>
        </ul>
      </div>

      {/* Quizzes Table */}
      <div className="card p-36">
        <h2 className="text-xl font-semibold mb-4">Quizzes</h2>

        {/* Table */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Quiz Title
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Course
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Batch
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Duration
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Total Marks
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {quiz.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {quiz.course}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {quiz.batch}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {quiz.duration}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {quiz.totalMarks}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-2">
                    {/* View Button */}
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      View Details
                    </button>
                    {/* Delete Button */}
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500">Showing 1-3 of 3</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded bg-gray-100">
              1
            </button>
            <button
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuizzes;
