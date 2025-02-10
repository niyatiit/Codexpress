import React, { useState } from "react";
import { Link } from "react-router-dom";

const AssignedCourses = () => {
  // Sample data for current assigned courses (active/current)
  const currentAssignedCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      category: "Computer Science",
      level: "Beginner",
      price: "$199",
      startDate: "2025-01-15",
      endDate: "2025-05-15",
      enrolledStudents: 35,
      description:
        "Learn the fundamentals of React including hooks, state management, and the component lifecycle.",
      imageUrl: "/assets/img/course/course-01.jpg",
    },
    {
      id: 2,
      title: "Node.js Essentials",
      category: "Computer Science",
      level: "Intermediate",
      price: "$249",
      startDate: "2025-02-01",
      endDate: "2025-06-01",
      enrolledStudents: 42,
      description:
        "Master server-side development with Node.js, Express, and asynchronous JavaScript techniques.",
      imageUrl: "/assets/img/course/course-02.jpg",
    },
  ];

  // Sample data for past assigned courses (inactive/previous)
  const pastAssignedCourses = [
    {
      id: 3,
      title: "Advanced JavaScript",
      category: "Computer Science",
      level: "Advanced",
      price: "$299",
      startDate: "2024-01-15",
      endDate: "2024-05-15",
      enrolledStudents: 50,
      description:
        "A comprehensive course on advanced JavaScript topics, patterns, and best practices.",
      imageUrl: "/assets/img/course/course-03.jpg",
    },
    {
      id: 4,
      title: "HTML & CSS Mastery",
      category: "Design",
      level: "Beginner",
      price: "$149",
      startDate: "2023-09-01",
      endDate: "2024-01-01",
      enrolledStudents: 60,
      description:
        "Learn how to build responsive and accessible web pages using modern HTML and CSS techniques.",
      imageUrl: "/assets/img/course/course-01.jpg", // Reusing an image if necessary
    },
  ];

  // State to manage which tab is active: "current", "past", or "all"
  const [selectedTab, setSelectedTab] = useState("current");

  // Determine which courses to display based on the selected tab.
  let coursesToDisplay = [];
  if (selectedTab === "current") {
    coursesToDisplay = currentAssignedCourses;
  } else if (selectedTab === "past") {
    coursesToDisplay = pastAssignedCourses;
  } else {
    coursesToDisplay = [...currentAssignedCourses, ...pastAssignedCourses];
  }

  return (
    <div className="dashboard-body">
      {/* Embedded CSS styling */}
      <style>{`
        /* Global Container & Typography */
        .dashboard-body {
          padding: 20px;
          font-family: Arial, sans-serif;
          color: #333;
        }
        /* Breadcrumb Styles */
        .breadcrumb-with-buttons {
          margin-bottom: 24px;
        }
        .breadcrumb ul {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0;
          margin: 0;
        }
        .breadcrumb li {
          display: flex;
          align-items: center;
        }
        .text-gray-200 { color: #ccc; }
        .text-gray-500 { color: #aaa; }
        .text-main-600 { color: rgb(18, 109, 255); }
        .fw-normal { font-weight: normal; }
        .text-15 { font-size: 15px; }
        .hover-text-main-600:hover { color: rgb(0, 106, 255); }
        .flex-between { display: flex; justify-content: space-between; }
        .flex-align { display: flex; align-items: center; }
        .flex-wrap { flex-wrap: wrap; }
        .gap-4 { gap: 4px; }
        .gap-8 { gap: 8px; }
        .mb-24 { margin-bottom: 24px; }
        
        /* Tab Bar Styles */
        .tab-bar {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }
        .tab-btn {
          padding: 10px 20px;
          background-color: #f0f0f0;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s ease;
        }
        .tab-btn.active {
          background-color: rgb(0, 115, 255);
          color: #fff;
        }
        .tab-btn:hover:not(.active) {
          background-color: #e0e0e0;
        }

        /* Grid Container for Course Cards */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        /* Course Card Styles */
        .course-card {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }
        .course-card:hover {
          transform: translateY(-5px);
        }
        .course-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
        .card-body {
          padding: 16px;
          flex-grow: 1;
        }
        .course-title {
          font-size: 1.2rem;
          margin-bottom: 8px;
          color: #333;
        }
        .course-description {
          font-size: 0.95rem;
          margin-bottom: 12px;
          color: #555;
        }
        .card-body p {
          margin: 4px 0;
          font-size: 0.9rem;
        }
        .card-footer {
          padding: 16px;
          text-align: center;
          border-top: 1px solid #f0f0f0;
        }
        /* Button Styles (using the Codexpress Cylinder theme) */
        .btn {
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          display: inline-block;
          transition: background-color 0.3s ease;
        }
        .btn-outline-main {
          background-color: transparent;
          color: rgb(0, 110, 255);
          border: 1px solid rgb(0, 115, 255);
        }
        .btn-outline-main:hover {
          background-color: rgb(0, 106, 255);
          color: #fff;
        }
      `}</style>

      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-with-buttons flex-between flex-wrap mb-24">
        <div className="breadcrumb">
          <ul className="flex-align gap-4">
            <li>
              <Link
                to="/faculty"
                className="text-gray-200 fw-normal text-15 hover-text-main-600"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">
                Assigned Courses
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Bar for Filtering Assigned Courses */}
      <div className="tab-bar">
        <button
          className={`tab-btn ${selectedTab === "current" ? "active" : ""}`}
          onClick={() => setSelectedTab("current")}
        >
          Current Assigned
        </button>
        <button
          className={`tab-btn ${selectedTab === "past" ? "active" : ""}`}
          onClick={() => setSelectedTab("past")}
        >
          Past Assigned
        </button>
        <button
          className={`tab-btn ${selectedTab === "all" ? "active" : ""}`}
          onClick={() => setSelectedTab("all")}
        >
          All Assigned
        </button>
      </div>

      {/* Courses Grid */}
      <div className="courses-grid">
        {coursesToDisplay.map((course) => (
          <div className="course-card card" key={course.id}>
            <img
              src={course.imageUrl}
              alt={course.title}
              className="course-image"
            />
            <div className="card-body">
              <h5 className="course-title">{course.title}</h5>
              <p className="course-description">{course.description}</p>
              <p>
                <strong>Category:</strong> {course.category}
              </p>
              <p>
                <strong>Level:</strong> {course.level}
              </p>
              <p>
                <strong>Price:</strong> {course.price}
              </p>
              <p>
                <strong>Start:</strong> {course.startDate} |{" "}
                <strong>End:</strong> {course.endDate}
              </p>
              <p>
                <strong>Enrolled Students:</strong> {course.enrolledStudents}
              </p>
            </div>
            <div className="card-footer">
              <Link
                to={`/courses/course-detail/${course.id}`}
                className="btn btn-outline-main"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedCourses;
