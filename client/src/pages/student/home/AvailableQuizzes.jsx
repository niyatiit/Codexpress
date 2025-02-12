import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Example quizzes data for student (this would be fetched from the backend)
const quizData = [
  {
    id: 1,
    title: "Java Basics Quiz",
    course: "Java",
    batch: "Batch A",
    duration: "30 mins",
    totalMarks: 50,
    dueDate: "2025-02-15",
  },
  {
    id: 2,
    title: "React Fundamentals",
    course: "React",
    batch: "Batch B",
    duration: "45 mins",
    totalMarks: 60,
    dueDate: "2025-02-20",
  },
  {
    id: 3,
    title: "Node.js Intermediate",
    course: "Node.js",
    batch: "Batch C",
    duration: "40 mins",
    totalMarks: 70,
    dueDate: "2025-02-18",
  },
];

const AvailableQuizzes = () => {
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  
  useEffect(() => {
    // Filter quizzes that are available based on the due date (i.e., not past due)
    const filteredQuizzes = quizData.filter((quiz) => {
      const currentDate = new Date();
      const quizDueDate = new Date(quiz.dueDate);
      return quizDueDate >= currentDate;
    });
    setAvailableQuizzes(filteredQuizzes);
  }, []);

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title">Available Quizzes</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/student">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Available Quizzes</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quizzes Table */}
      <div className="card p-36">
        <h2 className="text-xl font-semibold mb-4">Available Quizzes</h2>

        {/* Table */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Quiz Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Batch</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total Marks</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {availableQuizzes.length > 0 ? (
              availableQuizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{quiz.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{quiz.course}</td>
                  <td className="border border-gray-300 px-4 py-2">{quiz.batch}</td>
                  <td className="border border-gray-300 px-4 py-2">{quiz.duration}</td>
                  <td className="border border-gray-300 px-4 py-2">{quiz.totalMarks}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex gap-2">
                      {/* View Details Button */}
                      <Link to={`/student/quiz/${quiz.id}`} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        View Details
                      </Link>
                      {/* Take Quiz Button */}
                      <Link to={`/student/quiz/start/${quiz.id}`} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        Take Quiz
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No quizzes available at the moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500">Showing 1-{availableQuizzes.length} of {availableQuizzes.length}</p>
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
    </div>
  );
};

export default AvailableQuizzes;
