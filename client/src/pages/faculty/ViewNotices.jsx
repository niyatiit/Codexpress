import React, { useState } from "react";
import { Link } from "react-router-dom";

const ViewNotices = () => {
  // Sample data for notices
  const notices = [
    {
      id: 1,
      title: "Exam Schedule Update",
      description: "The midterm exams are rescheduled to next week. Please check the updated timetable.",
      date: "2025-02-10",
    },
    {
      id: 2,
      title: "Holiday Announcement",
      description: "The institute will remain closed on February 14th for Valentine's Day.",
      date: "2025-02-09",
    },
    {
      id: 3,
      title: "New Course Launch",
      description: "A new course on Advanced React.js will start from March 1st. Enroll now!",
      date: "2025-02-05",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Filtered notices based on search input
  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-notices-page p-6 space-y-8">
      
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
              View Notices
            </span>
          </li>
        </ul>
      </div>

      {/* Search Bar */}
      <div className="card p-4 bg-white shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Search notices..."
          className="form-control border-gray-300 rounded-md p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Notices Section */}
      <div className="space-y-4">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="card p-4 bg-white shadow-md rounded-lg border-l-4 border-blue-500"
            >
              <h2 className="text-lg font-semibold text-gray-800">{notice.title}</h2>
              <p className="text-gray-600 mb-2">{notice.description}</p>
              <p className="text-sm text-gray-500">Date: {notice.date}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-600 text-center mt-8">
            <p>No notices found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewNotices;
