import React, { useState } from 'react'
import Dashboard from './Dashboard'
import { Routes, Route, Links } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import NotFoundPage from '../../NotFoundPage'
import Footer from '../../../components/Footer';
import logo from '../../../assets/logo.png'
import EnrolledCourses from './EnrolledCourses'
import AvailableCourses from './AvailableCourses';
import MyBatches from './MyBatches';
import ScanQRCode from './ScanQRCode';
import ViewAttendance from './ViewAttendance';
import ViewAssignments from './ViewAssignments';
import SubmitAssignment from './SubmitAssignment';
import AvailableQuizzes from './AvailableQuizzes';
import AttemptedQuizzes from './AttemptedQuizzes';
import ReviewQuizAnswers from './ReviewQuizAnswers';
import UpcomingExams from './UpcomingExams';
import ExamResults from './ExamResults';
import ViewResources from './ViewResources';
import Notifications from './Notifications';
import Settings from './Settings';
import Schedule from './Schedule';
import Cookies from "js-cookie";

const StudentDashboard2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/student/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>

      {/* <!--==================== Preloader Start ====================--> */}
      <div class="preloader">
        <div class="loader"></div>
      </div>

      {/* <!--==================== Preloader End ====================--> */}

      {/* <!--==================== Sidebar Overlay End ====================--> */}
      <div class="side-overlay"></div>
      {/* <!--==================== Sidebar Overlay End ====================--> */}

      {/* <!-- ============================ Sidebar Start ============================ --> */}

      <aside className="sidebar">
        {/* <!-- sidebar close btn --> */}
        <button type="button" class="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute"><i class="ph ph-x"></i></button>
        {/* <!-- sidebar close btn --> */}

        <Link to="/admin" class="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 px-36 pt-20 py-42">
          <img src={logo} alt="" />
        </Link>

        <div className="sidebar-menu-wrapper overflow-y-auto scroll-sm">
          {/* <div className="p-20 pt-20">
            <div className="bg-main-50 p-20 pt-0 rounded-16 text-center mt-74">
              <span className="border-5 bg-white position-relative overflow-hidden object-cover mx-auto border-blue-500 w-114 h-114 rounded-circle flex-center text-success-600 text-2xl translate-n74">
                <img src="\assets\img\profiles\avatar-06.jpg" alt="Faculty Profile" className="position-absolute top-0 left-0" />
              </span>
              <div className="mt-n74">
                <h5 className="mb-4 mt-12">Student Profile</h5>
                <p className="font-weight-bold">Jinal Patel</p>
                <p className="mb-2 text-sm text-zinc-400">jinal@example.com</p>
                <Link to="/student/edit-profile" className="btn btn-main mt-16 rounded-pill">Edit Profile</Link>
              </div>
            </div>
          </div> */}
          <div className="p-20 pt-10">
            <ul className="sidebar-menu">
              {/* Dashboard */}
              <li className="sidebar-menu__item">
                <Link to="/student" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-squares-four"></i></span>
                  <span className="text">Dashboard</span>
                </Link>
              </li>

              {/* Courses */}
              <li className="sidebar-menu__item has-dropdown">
                <a href="javascript:void(0)" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-graduation-cap"></i></span>
                  <span className="text">My Courses</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className="sidebar-submenu__item">
                    <Link to="/student/enrolled/courses" className="sidebar-submenu__link">Enrolled Courses</Link>
                  </li>
                  <li className="sidebar-submenu__item">
                    <Link to="/student/available/courses" className="sidebar-submenu__link">Available Courses</Link>
                  </li>
                </ul>
              </li>

              {/* Batches */}
              <li className="sidebar-menu__item has-dropdown">
                <a href="javascript:void(0)" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-users"></i></span>
                  <span className="text">My Batches</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className="sidebar-submenu__item">
                    <Link to="/student/my-batches" className="sidebar-submenu__link">View My Batches</Link>
                  </li>
                </ul>
              </li>

              {/* Attendance */}
              <li className="sidebar-menu__item has-dropdown">
                <a href="javascript:void(0)" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-pen"></i></span>
                  <span className="text">Attendance</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className="sidebar-submenu__item">
                    <Link to="/student/scan/qr" className="sidebar-submenu__link">Scan QR for Attendance</Link>
                  </li>
                  <li className="sidebar-submenu__item">
                    <Link to="/student/view/attendance" className="sidebar-submenu__link">View Attendance</Link>
                  </li>
                </ul>
              </li>
              {/* schedule */}
              <li className="sidebar-menu__item">
                <Link to="/student/schedule" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-calendar-blank"></i></span>
                  <span className="text">schedule</span>
                </Link>
              </li>

              {/* Assignments */}
              <li className="sidebar-menu__item has-dropdown">
                <a href="javascript:void(0)" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-pencil"></i></span>
                  <span className="text">Assignments</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className="sidebar-submenu__item">
                    <Link to="/student/view/assignments" className="sidebar-submenu__link">View Assignments</Link>
                  </li>
                  <li className="sidebar-submenu__item">
                    <Link to="/student/submit/assignment" className="sidebar-submenu__link">Submit Assignment</Link>
                  </li>
                </ul>
              </li>

              {/* Quizzes */}
              <li className="sidebar-menu__item has-dropdown">
                <a href="javascript:void(0)" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-question"></i></span>
                  <span className="text">Quizzes</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className="sidebar-submenu__item">
                    <Link to="/student/available/quizzes" className="sidebar-submenu__link">Available Quizzes</Link>
                  </li>
                  <li className="sidebar-submenu__item">
                    <Link to="/student/attempted/quizzes" className="sidebar-submenu__link">Attempted Quizzes & Scores</Link>
                  </li>
                  <li className="sidebar-submenu__item">
                    <Link to="/student/review/quiz" className="sidebar-submenu__link">Review Quiz Answers</Link>
                  </li>
                </ul>
              </li>

              {/* Exams */}
              <li className="sidebar-menu__item has-dropdown">
                <a href="javascript:void(0)" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-file-text"></i></span>
                  <span className="text">Examinations</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className="sidebar-submenu__item">
                    <Link to="/student/upcoming/exams" className="sidebar-submenu__link">Upcoming Exams</Link>
                  </li>
                  <li className="sidebar-submenu__item">
                    <Link to="/student/exam/results" className="sidebar-submenu__link">Exam Results</Link>
                  </li>
                </ul>
              </li>

              {/* Resources */}
              <li className="sidebar-menu__item has-dropdown">
                <a href="javascript:void(0)" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-folder"></i></span>
                  <span className="text">Study Materials</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className="sidebar-submenu__item">
                    <Link to="/student/view/resources" className="sidebar-submenu__link">View Materials</Link>
                  </li>
                </ul>
              </li>


              {/* Notifications */}
              <li className="sidebar-menu__item">
                <Link to="/student/notifications" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-notification"></i></span>
                  <span className="text">Notifications</span>
                </Link>
              </li>

              {/* Profile Settings */}
              <li className="sidebar-menu__item">
                <Link to="/student/settings" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-gear"></i></span>
                  <span className="text">Settings</span>
                </Link>
              </li>

              {/* Logout */}
              <li className="sidebar-menu__item">
                <button onClick={handleLogout} className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-sign-out"></i></span>
                  <span className="text">Logout</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </aside>

      {/* <!-- ============================ Sidebar End  ============================ --> */}

      <div class="dashboard-main-wrapper">

        <div className="top-navbar flex-between gap-16 px-4 py-3">
          {/* Left Section: Toggle Button & Search Bar */}
          <div className="flex-align gap-16">
            <button type="button" className="toggle-btn d-xl-none d-flex text-26 text-gray-500">
              <i className="ph ph-list"></i>
            </button>

            <form action="#" className="w-230 d-sm-block d-none">
              <div className="position-relative flex items-center justify-center  ps-40 h-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15">
                <i className="ph ph-magnifying-glass"></i>

                <input
                  type="text"
                  className="bg-transparent px-8"
                  placeholder="Search..."
                />
              </div>
            </form>
            
          </div>

          {/* Right Section: Notifications, Language, User Profile */}
          <div className="flex-align gap-16">
          
          <div className="relative border-[1px] rounded-[100px] py-[7px] hover:bg-zinc-200 transition">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-2 focus:outline-none"
              >
                
                <span className="text-blue-500 font-medium">
                  @{user.username || "User"}
                </span>
                <img
                  src={
                    user.profile_picture ||
                    "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-full bg-white rounded-lg shadow-lg border border-gray-200 ">
                  <div className="py-2">
                    <Link
                      to="/student"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Profile+
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>


        <div class="dashboard-body">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="enrolled/courses" element={<EnrolledCourses />} />
            <Route path="available/courses" element={<AvailableCourses />} />
            <Route path="my-batches" element={<MyBatches />} />
            <Route path="scan/qr" element={<ScanQRCode />} />
            <Route path="view/attendance" element={<ViewAttendance />} />
            <Route path="view/assignments" element={<ViewAssignments />} />
            <Route path="submit/assignment" element={<SubmitAssignment />} />
            <Route path="available/quizzes" element={<AvailableQuizzes />} />
            <Route path="attempted/quizzes" element={<AttemptedQuizzes />} />
            <Route path="review/quiz" element={<ReviewQuizAnswers />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="upcoming/exams" element={<UpcomingExams />} />
            <Route path="exam/results" element={<ExamResults />} />
            <Route path="view/resources" element={<ViewResources />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>


        </div>
        <Footer />



      </div>
    </div>
  )
}

export default StudentDashboard2