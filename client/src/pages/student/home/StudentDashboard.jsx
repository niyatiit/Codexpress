import React from "react";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import EnrolledCourses from "./EnrolledCourses";

const StudentDashboard = () => {
  return (
    <>
      {/* <!-- sidebar --> */}
      <div className=" flex gap-20 p-44 justify-center ">
      <div className="col-xl-3 col-lg-3 theiaStickySidebar">
          <div className="settings-widget dash-profile">
            <div className="settings-menu">
              <div className="profile-bg">
                <div className="profile-img">
                  <a href="/student/student-profile">
                    <img src="assets/img/user/user16.jpg" alt="Student Profile" />
                  </a>
                </div>
              </div>
              <div className="profile-group">
                <div className="profile-name text-center">
                  <h4>
                    <a href="/student">Rolands Richard</a>
                  </h4>
                  <p>Student</p>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-widget account-settings">
            <div className="settings-menu">

              {/* Dashboard Section */}
              <h3>Dashboard</h3>
              <ul>
                <li className="nav-item active">
                  <Link to="/student/student-dashboard" className="nav-link">
                    <i className="ph ph-gauge"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-profile" className="nav-link">
                    <i className="ph ph-user"></i> My Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-courses" className="nav-link">
                    <i className="ph ph-graduation-cap"></i> Enrolled Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-quiz" className="nav-link">
                    <i className="ph ph-puzzle-piece"></i> My Quiz Attempts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-assignments" className="nav-link">
                    <i className="ph ph-file"></i> Assignments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-certificates" className="nav-link">
                    <i className="ph ph-medal"></i> My Certificates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-attendance" className="nav-link">
                    <i className="ph ph-calendar-check"></i> Attendance
                  </Link>
                </li>
              </ul>

              {/* Admin Features for Students */}
              <h3>Admin Features</h3>
              <ul>
                <li className="nav-item">
                  <Link to="/student/student-batch" className="nav-link">
                    <i className="ph ph-users"></i> My Batch Details
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-payment-history" className="nav-link">
                    <i className="ph ph-credit-card"></i> Payment History
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-progress" className="nav-link">
                    <i className="ph ph-chart-line"></i> Course Progress
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-reports" className="nav-link">
                    <i className="ph ph-clipboard-text"></i> Reports & Feedback
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-support" className="nav-link">
                    <i className="ph ph-question"></i> Request Support
                  </Link>
                </li>
              </ul>

              {/* Community & Support Section */}
              <h3>Community & Support</h3>
              <ul>
                <li className="nav-item">
                  <Link to="/student/student-qa" className="nav-link">
                    <i className="ph ph-bookmark"></i> Q&A Forum
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-messages" className="nav-link">
                    <i className="ph ph-chat"></i> Messages
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-tickets" className="nav-link">
                    <i className="ph ph-ticket"></i> Support Tickets
                  </Link>
                </li>
              </ul>

              {/* Account Section */}
              <h3>Account</h3>
              <ul>
                <li className="nav-item">
                  <Link to="/student/student-settings" className="nav-link">
                    <i className="ph ph-gear"></i> Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="ph ph-sign-out"></i> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="student-profile" element={<StudentProfile />} />
            <Route path="student-courses" element={<EnrolledCourses />} />
            <Route path="*" element={<Dashboard />} />

          </Routes>
        </div>
        {/* <!-- /Sidebar --> */}
      </div>

      {/* Routing Start */}

    </>
  );
};

export default StudentDashboard;
