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
        <div class="col-xl-3 col-lg-3 theiaStickySidebar">
          <div class="settings-widget dash-profile">
            <div class="settings-menu">
              <div class="profile-bg">
                <div class="profile-img">
                  <a href="student-profile.html">
                    <img src="assets/img/user/user16.jpg" alt="Img" />
                  </a>
                </div>
              </div>
              <div class="profile-group">
                <div class="profile-name text-center">
                  <h4>
                    <a href="student-profile.html">Rolands Richard</a>
                  </h4>
                  <p>Student</p>
                </div>
              </div>
            </div>
          </div>
          <div className="settings-widget account-settings">
            <div className="settings-menu">
              <h3>Dashboard</h3>
              <ul>
                <li className="nav-item active">
                  <Link to="/student-dashboard" className="nav-link">
                    <i className="bx bxs-tachometer"></i>Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-profile" className="nav-link">
                    <i className="bx bxs-user"></i>My Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student/student-courses" className="nav-link">
                    <i className="bx bxs-graduation"></i>Enrolled Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student-quiz" className="nav-link">
                    <i className="bx bxs-shapes"></i>My Quiz Attempts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student-order-history" className="nav-link">
                    <i className="bx bxs-cart"></i>Order History
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student-qa" className="nav-link">
                    <i className="bx bxs-bookmark-alt"></i>Question & Answer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student-referral" className="nav-link">
                    <i className="bx bxs-user-plus"></i>Referrals
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student-messages" className="nav-link">
                    <i className="bx bxs-chat"></i>Messages
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/student-tickets" className="nav-link">
                    <i className="bx bxs-coupon"></i>Support Tickets
                  </Link>
                </li>
              </ul>
              <h3>Account Settings</h3>
              <ul>
                <li className="nav-item">
                  <Link to="/student-settings" className="nav-link">
                    <i className="bx bxs-cog"></i>Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <i className="bx bxs-log-out"></i>Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
        <Routes>
          <Route path={"/"} element={<Dashboard/>}/>
          <Route path={"student-profile"} element={<StudentProfile/>}/>
          <Route path={"student-courses"} element={<EnrolledCourses/>}/>
          
        </Routes>
      </div>
        {/* <!-- /Sidebar --> */}
      </div>

      {/* Routing Start */}
      
    </>
  );
};

export default StudentDashboard;
