import React from "react";
import { Link } from "react-router-dom";

const UpcomingExams = () => {
  // List of upcoming exams (This data can come from a backend API in a real-world scenario)
  const exams = [
    {
      id: 1,
      title: "Java Programming Final Exam",
      course: "Java",
      date: "2025-02-15",
      time: "10:00 AM",
      duration: "2 Hours",
      registrationDeadline: "2025-02-14",
      isRegistered: false, // Can be dynamic based on if the student has registered or not
    },
    {
      id: 2,
      title: "React.js Advanced Exam",
      course: "React.js",
      date: "2025-02-20",
      time: "1:00 PM",
      duration: "1.5 Hours",
      registrationDeadline: "2025-02-18",
      isRegistered: true,
    },
    {
      id: 3,
      title: "Node.js Certification Exam",
      course: "Node.js",
      date: "2025-02-25",
      time: "3:00 PM",
      duration: "3 Hours",
      registrationDeadline: "2025-02-24",
      isRegistered: false,
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
            <span className="text-main-600 fw-normal text-15">Upcoming Exams</span>
          </li>
        </ul>
      </div>

      {/* Upcoming Exams Table */}
      <div className="card p-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>

        {/* Table */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Exam Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{exam.title}</td>
                <td className="border border-gray-300 px-4 py-2">{exam.course}</td>
                <td className="border border-gray-300 px-4 py-2">{exam.date}</td>
                <td className="border border-gray-300 px-4 py-2">{exam.time}</td>
                <td className="border border-gray-300 px-4 py-2">{exam.duration}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-2">
                   

                    {/* More Details Button */}
                    <Link
                      to={`/student/exam-details/${exam.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      More Details
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingExams;
