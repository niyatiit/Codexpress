import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const QuizReports = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState("");

  const courses = ["Java Basics", "React Fundamentals", "Node.js"];
  const batches = ["Batch 1", "Batch 2", "Batch 3", "Batch 4"];

  const quizzes = [
    { course: "Java Basics", batch: "Batch 1", quizName: "Quiz 1", id: 1 },
    { course: "Java Basics", batch: "Batch 1", quizName: "Quiz 2", id: 2 },
    { course: "React Fundamentals", batch: "Batch 3", quizName: "Quiz 1", id: 3 },
    { course: "React Fundamentals", batch: "Batch 3", quizName: "Quiz 2", id: 4 },
  ];

  const topStudentsData = {
    1: [
      { rank: 1, name: "Alice", score: 95 },
      { rank: 2, name: "Bob", score: 92 },
      { rank: 3, name: "Charlie", score: 90 },
      { rank: 4, name: "David", score: 89 },
      { rank: 5, name: "Eve", score: 88 },
    ],
    2: [
      { rank: 1, name: "Frank", score: 93 },
      { rank: 2, name: "Grace", score: 91 },
      { rank: 3, name: "Hannah", score: 89 },
      { rank: 4, name: "Ivy", score: 87 },
      { rank: 5, name: "Jack", score: 85 },
    ],
    3: [
      { rank: 1, name: "Tom", score: 88 },
      { rank: 2, name: "Jerry", score: 85 },
      { rank: 3, name: "Anna", score: 84 },
      { rank: 4, name: "Nina", score: 82 },
      { rank: 5, name: "Leo", score: 81 },
    ],
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedBatch("");
    setSelectedQuiz("");
  };

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
    setSelectedQuiz("");
  };

  const handleQuizClick = (quizId) => {
    setSelectedQuiz(quizId);
  };

  const filteredQuizzes = quizzes.filter(
    (quiz) => quiz.course === selectedCourse && quiz.batch === selectedBatch
  );

  const topStudents = selectedQuiz ? topStudentsData[selectedQuiz] : [];

  const chartData = {
    labels: topStudents.map((student) => student.name),
    datasets: [
      {
        label: "Scores",
        data: topStudents.map((student) => student.score),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="quiz-reports-page p-6">
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
              <span className="text-main-600 fw-normal text-15">Quiz Reports</span>
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
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Select Batch</label>
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

      {/* Quiz List */}
      {selectedCourse && selectedBatch && (
        <div className="quiz-list mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Available Quizzes</h2>
          {filteredQuizzes.length > 0 ? (
            <ul className="list-disc pl-5">
              {filteredQuizzes.map((quiz) => (
                <li
                  key={quiz.id}
                  className="text-blue-500 cursor-pointer hover:underline mb-2"
                  onClick={() => handleQuizClick(quiz.id)}
                >
                  {quiz.quizName}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No quizzes available for the selected course and batch.</p>
          )}
        </div>
      )}

      {/* Top Students Table */}
      {selectedQuiz && (
        <div className="top-students mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Top 5 Students</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">Rank</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Student Name</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {topStudents.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{student.rank}</td>
                  <td className="border border-gray-200 px-4 py-2">{student.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{student.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chart */}
      {selectedQuiz && topStudents.length > 0 && (
        <div className="chart">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Quiz Score Distribution</h2>
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
};

export default QuizReports;
