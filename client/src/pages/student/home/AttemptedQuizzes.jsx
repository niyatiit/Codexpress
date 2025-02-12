import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Example attempted quizzes data for student (this would be fetched from the backend)
const attemptedQuizzesData = [
  {
    id: 1,
    title: "Java Basics Quiz",
    course: "Java",
    batch: "Batch A",
    marksObtained: 40,
    totalMarks: 50,
    duration: "30 mins",
    timeSpent: "25 mins",
    dateCompleted: "2025-02-10",
    status: "Completed",
  },
  {
    id: 2,
    title: "React Fundamentals",
    course: "React",
    batch: "Batch B",
    marksObtained: 45,
    totalMarks: 60,
    duration: "45 mins",
    timeSpent: "40 mins",
    dateCompleted: "2025-02-08",
    status: "Completed",
  },
  {
    id: 3,
    title: "Node.js Intermediate",
    course: "Node.js",
    batch: "Batch C",
    marksObtained: 60,
    totalMarks: 70,
    duration: "40 mins",
    timeSpent: "35 mins",
    dateCompleted: "2025-02-05",
    status: "Completed",
  },
];

const AttemptedQuizzes = () => {
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);

  useEffect(() => {
    // Set the attempted quizzes data (usually fetched from the backend)
    setAttemptedQuizzes(attemptedQuizzesData);
  }, []);

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
            <span className="text-main-600 fw-normal text-15">Attempted Quizzes</span>
          </li>
        </ul>
      </div>

      {/* Attempted Quizzes Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {attemptedQuizzes.length > 0 ? (
          attemptedQuizzes.map((quiz) => (
            <div key={quiz.id} className="card bg-white shadow-lg rounded-lg p-20 hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
              <p className="text-gray-600 mb-1"><strong>Course:</strong> {quiz.course}</p>
              <p className="text-gray-600 mb-1"><strong>Batch:</strong> {quiz.batch}</p>
              <p className="text-gray-600 mb-1"><strong>Marks Obtained:</strong> {quiz.marksObtained}/{quiz.totalMarks}</p>
              <p className="text-gray-600 mb-1"><strong>Duration:</strong> {quiz.duration}</p>
              <p className="text-gray-600 mb-1"><strong>Time Spent:</strong> {quiz.timeSpent}</p>
              <p className="text-gray-600 mb-1"><strong>Date Completed:</strong> {quiz.dateCompleted}</p>
              <p className="text-green-500 mb-4">{quiz.status}</p>

              {/* Actions */}
              <div className="flex gap-2">
                <Link to={`/student/quiz/results/${quiz.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                  View Results
                </Link>
                <Link to={`/student/quiz/review/${quiz.id}`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-all">
                  Review Quiz
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-4 text-gray-500">
            No attempted quizzes yet.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-gray-500">Showing 1-{attemptedQuizzes.length} of {attemptedQuizzes.length}</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100" disabled>
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded bg-gray-100">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttemptedQuizzes;
