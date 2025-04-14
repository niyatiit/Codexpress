import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Dashboard from "./Dashboard";
import NotFoundPage from "../../NotFoundPage";
import Footer from "../../../components/Footer";
import logo from "../../../assets/logo.png";
import EnrolledCourses from "./EnrolledCourses";
import AvailableCourses from "./AvailableCourses";
import MyBatches from "./MyBatches";
import ScanQRCode from "./ScanQRCode";
import ViewAttendance from "./ViewAttendance";
import ViewAssignments from "./ViewAssignments";
import SubmitAssignment from "./SubmitAssignment";
import AvailableQuizzes from "./AvailableQuizzes";
import AttemptedQuizzes from "./AttemptedQuizzes";
import ReviewQuizAnswers from "./ReviewQuizAnswers";
import UpcomingExams from "./UpcomingExams";
import ExamResults from "./ExamResults";
import ViewResources from "./ViewResources";
import Notifications from "./Notifications";
import Settings from "./Settings";
import Schedule from "./Schedule";
import axios from 'axios'
import AssignmentDetail from "./AssignmentDetail";

const StudentDashboard2 = () => {
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [openDropdown, setOpenDropdown] = useState(null); // State for sidebar dropdowns
  const location = useLocation(); // Get current location
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State to store user data
  const authUser = JSON.parse(localStorage.getItem("user"))
  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const fetchuserdata = async () => {
      const response = await axios.get(`http://localhost:3000/profile/${authUser.id}`)
      if (response.data.success) {
        setUser(response.data.user)
      }

    }
    fetchuserdata()
  }, []);

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null); // Clear user state
    navigate("/student/login");
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle sidebar dropdowns
  const toggleSidebarDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to check if a dropdown is active
  const isDropdownActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  // Show loading or error state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Preloader */}
      <div className="preloader">
        <div className="loader"></div>
      </div>

      {/* Sidebar Overlay */}
      <div className="side-overlay"></div>

      {/* Sidebar */}
      <aside className="sidebar">
        <button
          type="button"
          className="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute"
        >
          <i className="ph ph-x"></i>
        </button>

        {/* Logo */}
        <Link to="/student" className="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 px-36 pt-20 py-42">
          <img src={logo} alt="Logo" />
        </Link>

        {/* Sidebar Menu */}
        <div className="sidebar-menu-wrapper overflow-y-auto scroll-sm">
          <div className="p-20 pt-10">
            <ul className="sidebar-menu">
              {/* Dashboard */}
              <li className={`sidebar-menu__item ${isActive("/student") ? "active" : ""}`}>
                <Link to="/student" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-squares-four"></i></span>
                  <span className="text">Dashboard</span>
                </Link>
              </li>

              {/* Courses Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === "courses" || isDropdownActive(["/student/enrolled/courses", "/student/available/courses"])
                  ? "open"
                  : ""
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleSidebarDropdown("courses")}
                >
                  <span className="icon"><i className="ph ph-graduation-cap"></i></span>
                  <span className="text">My Courses</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive("/student/enrolled/courses") ? "active" : ""}`}>
                    <Link to="/student/enrolled/courses" className="sidebar-submenu__link">Enrolled Courses</Link>
                  </li>
                </ul>
              </li>

              {/* Batches Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === "batches" || isDropdownActive(["/student/my-batches"])
                  ? "open"
                  : ""
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleSidebarDropdown("batches")}
                >
                  <span className="icon"><i className="ph ph-users"></i></span>
                  <span className="text">My Batches</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive("/student/my-batches") ? "active" : ""}`}>
                    <Link to="/student/my-batches" className="sidebar-submenu__link">View My Batches</Link>
                  </li>
                </ul>
              </li>
              {/* Resources Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === "resources" || isDropdownActive(["/student/view/resources"])
                  ? "open"
                  : ""
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleSidebarDropdown("resources")}
                >
                  <span className="icon"><i className="ph ph-folder"></i></span>
                  <span className="text">Study Materials</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive("/student/view/resources") ? "active" : ""}`}>
                    <Link to="/student/view/resources" className="sidebar-submenu__link">View Materials</Link>
                  </li>
                </ul>
              </li>


              {/* Notifications */}
              <li className={`sidebar-menu__item ${isActive("/student/notifications") ? "active" : ""}`}>
                <Link to="/student/notifications" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-notification"></i></span>
                  <span className="text">Notifications</span>
                </Link>
              </li>
              {/* Attendance Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === "attendance" || isDropdownActive(["/student/scan/qr", "/student/view/attendance"])
                  ? "open"
                  : ""
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleSidebarDropdown("attendance")}
                >
                  <span className="icon"><i className="ph ph-pen"></i></span>
                  <span className="text">Attendance</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive("/student/scan/qr") ? "active" : ""}`}>
                    <Link to="/student/scan/qr" className="sidebar-submenu__link">Scan QR for Attendance</Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive("/student/view/attendance") ? "active" : ""}`}>
                    <Link to="/student/view/attendance" className="sidebar-submenu__link">View Attendance</Link>
                  </li>
                </ul>
              </li>
  {/* Assignments Dropdown */}
  <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === "assignments" || isDropdownActive(["/student/assignments", "/student/submit/assignment"])
                  ? "open"
                  : ""
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleSidebarDropdown("assignments")}
                >
                  <span className="icon"><i className="ph ph-pencil"></i></span>
                  <span className="text">Assignments</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive("/student/view/assignments") ? "active" : ""}`}>
                    <Link to="/student/assignments" className="sidebar-submenu__link">View Assignments</Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive("/student/submit/assignment") ? "active" : ""}`}>
                    <Link to="/student/submit/assignment" className="sidebar-submenu__link">Submit Assignment</Link>
                  </li>
                </ul>
              </li>

              {/* Schedule */}
              <li className={`sidebar-menu__item ${isActive("/student/schedule") ? "active" : ""}`}>
                <Link to="/student/schedule" className="sidebar-menu__link">
                  <span className="icon"><i className="ph ph-calendar-blank"></i></span>
                  <span className="text">Schedule</span>
                </Link>
              </li>

            
              {/* Quizzes Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === "quizzes" || isDropdownActive(["/student/available/quizzes", "/student/attempted/quizzes", "/student/review/quiz"])
                  ? "open"
                  : ""
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleSidebarDropdown("quizzes")}
                >
                  <span className="icon"><i className="ph ph-question"></i></span>
                  <span className="text">Quizzes</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive("/student/available/quizzes") ? "active" : ""}`}>
                    <Link to="/student/available/quizzes" className="sidebar-submenu__link">Available Quizzes</Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive("/student/attempted/quizzes") ? "active" : ""}`}>
                    <Link to="/student/attempted/quizzes" className="sidebar-submenu__link">Attempted Quizzes & Scores</Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive("/student/review/quiz") ? "active" : ""}`}>
                    <Link to="/student/review/quiz" className="sidebar-submenu__link">Review Quiz Answers</Link>
                  </li>
                </ul>
              </li>

              {/* Exams Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === "exams" || isDropdownActive(["/student/upcoming/exams", "/student/exam/results"])
                  ? "open"
                  : ""
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleSidebarDropdown("exams")}
                >
                  <span className="icon"><i className="ph ph-file-text"></i></span>
                  <span className="text">Examinations</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive("/student/upcoming/exams") ? "active" : ""}`}>
                    <Link to="/student/upcoming/exams" className="sidebar-submenu__link">Upcoming Exams</Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive("/student/exam/results") ? "active" : ""}`}>
                    <Link to="/student/exam/results" className="sidebar-submenu__link">Exam Results</Link>
                  </li>
                </ul>
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

      {/* Main Content */}
      <div className="dashboard-main-wrapper">
        <div className="top-navbar flex-between gap-16 px-4 py-3">
          {/* Left Section: Toggle Button & Search Bar */}
          <div className="flex-align gap-16">
            <button
              type="button"
              className="toggle-btn d-xl-none d-flex text-26 text-gray-500"
            >
              <i className="ph ph-list"></i>
            </button>

            <form action="#" className="w-230 d-sm-block d-none">
              <div className="position-relative flex items-center justify-center ps-40 h-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15">
                <i className="ph ph-magnifying-glass"></i>
                <input
                  type="text"
                  className="bg-transparent px-8"
                  placeholder="Search..."
                />
              </div>
            </form>
          </div>

          {/* Right Section: User Profile */}
          <div className="flex-align gap-16">
            <div className="relative border-[1px] rounded-[100px] py-[7px] hover:bg-zinc-200 transition">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-2 focus:outline-none"
              >
                <span className="text-blue-500 font-medium">
                  @{user?.username}
                </span>
                <img
                  src={
                    user?.profile_picture ||
                    "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="py-2">
                    <Link
                      to="/student"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Profile
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

        {/* Dashboard Body */}
        <div className="dashboard-body">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="enrolled/courses" element={<EnrolledCourses />} />
            <Route path="available/courses" element={<AvailableCourses />} />
            <Route path="my-batches" element={<MyBatches />} />
            <Route path="scan/qr" element={<ScanQRCode />} />
            <Route path="view/attendance" element={<ViewAttendance />} />
            <Route path="assignments" element={<ViewAssignments />} />
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
            <Route path="assignments/:assignmentId" element={<AssignmentDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default StudentDashboard2;