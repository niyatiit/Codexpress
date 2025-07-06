import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Dashboard from './Dashboard';
import ViewCourses from './ViewCourses';
import AssignedCourses from './AssignedCourses';
import ViewBatches from './ViewBatches';
import AssignStudentsToBatch from './AssignStudentsToBatch';
import MarkAttendance from './MarkAttendance';
import QRCodeAttendance from './QRAttendance';
import GenerateQRAttendance from './GenerateQRAttendance'
import ViewAttendance from './ViewAttendance';
import CreateAssignment from './CreateAssignment';
import AssignmentSubmission from './AssignmentSubmission';
import ViewAssignments from './ViewAssignments';
import CreateQuiz from './CreateQuiz';
import ViewQuizzes from './ViewQuizzes';
import QuizResponses from './QuizResponses';
import QuizReports from './QuizReports';
import ViewExams from './ViewExams';
import ManageMarks from './ManageMarks';
import UploadResults from './UploadResults';
import ViewResults from './ViewResults';
import ViewNotices from './ViewNotices';
import SendNotice from './SendNotice';
import UploadSchedule from './UploadSchedule';
import ViewSchedule from './ViewSchedule';
import ViewAdminSchedule from './ViewAdminSchedule';
import UploadResource from './UploadResource';
import ViewResources from './ViewResources';
import ProfileSetting from './ProfileSetting';
import Footer from '../../components/Footer';
import NotFoundPage from '../NotFoundPage';
import logo from '../../assets/logo.png';
import axios from 'axios'
import FacultyProfile from './FacultyProfile';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [faculty, setFaculty] = useState({});
  const [loading, setLoading] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user?.id;

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    profile_picture: "",
    gender: "",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const userData = response.data.user;
          setProfile({
            username: userData.username,
            email: userData.email,
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            phone: userData.phone || "",
            profile_picture: userData.profile_picture,
            gender: userData.gender || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // alert("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, user]);

  // Function to toggle dropdowns
  const toggleDropdown = (dropdown) => {
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

  // Fetch faculty details on component mount
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     if (!user?.id) return; // Ensure user.id is available
  //     try {
  //       const response = await axios.get(`http://localhost:3000/users/${user.id}`, {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       });
  //       if (response.data.success) {
  //         console.log(response.data.user);
  //         setFaculty(response.data.user);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //       alert("Failed to fetch user details. Please try again.");
  //     }
  //   };

  //   fetchUserDetails();
  // }, [user?.id]);

  // Handle logout
  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/faculty/login');
  };

  return (
    <div>
      {/* Preloader */}
      <div className="preloader">
        <div className="loader"></div>
      </div>

      {/* Sidebar Overlay */}
      <div className="side-overlay"></div>

      {/* Sidebar */}
      <aside className="sidebar pb-36">
        <button
          type="button"
          className="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute"
        >
          <i className="ph ph-x"></i>
        </button>

        {/* Faculty Profile Section */}
        <div className="p-20 pt-20">
          <div className="bg-main-50 p-20 pt-0 rounded-16 text-center mt-74">
            <span className="border-5 bg-white position-relative overflow-hidden mx-auto border-blue-500 w-114 h-114 rounded-circle flex-center text-success-600 text-2xl translate-n74">
              <img src={profile.profile_picture || "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
              } alt="Faculty Profile" className="position-absolute object-fit h-100 object-cover" />
            </span>
            <div className="mt-n74">
              <h5 className="mb-4 mt-12">Faculty Profile</h5>
              <p className="font-weight-bold">{profile.username}</p>
              <p className="mb-2 text-sm text-zinc-400">{profile.email}</p>
              <Link to="/faculty/edit-profile" className="btn btn-main mt-16 rounded-pill">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="sidebar-menu-wrapper overflow-y-auto scroll-sm pb-[300px]">
          <div className="p-20 pt-10">
            <ul className="sidebar-menu">
              {/* Dashboard */}
              <li className={`sidebar-menu__item ${isActive('/faculty') ? 'active' : ''}`}>
                <Link to="/faculty" className="sidebar-menu__link">
                  <span className="icon">
                    <i className="ph ph-squares-four"></i>
                  </span>
                  <span className="text">Dashboard</span>
                </Link>
              </li>

              {/* Courses Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'courses' || isDropdownActive(['/faculty/view/courses', '/faculty/assigned/courses'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('courses')}
                >
                  <span className="icon">
                    <i className="ph ph-graduation-cap"></i>
                  </span>
                  <span className="text">Courses</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/faculty/view/courses') ? 'active' : ''}`}>
                    <Link to="/faculty/view/courses" className="sidebar-submenu__link">
                      View All Courses
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/assigned/courses') ? 'active' : ''}`}>
                    <Link to="/faculty/assigned/courses" className="sidebar-submenu__link">
                      Assigned Courses
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Batch Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'batch' || isDropdownActive(['/faculty/view/batches', '/faculty/manage/batch/students'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('batch')}
                >
                  <span className="icon">
                    <i className="ph ph-users"></i>
                  </span>
                  <span className="text">Batches</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/faculty/view/batches') ? 'active' : ''}`}>
                    <Link to="/faculty/view/batches" className="sidebar-submenu__link">
                      View All Batches
                    </Link>
                  </li>
                  {/* <li className={`sidebar-submenu__item ${isActive('/faculty/manage/batch/students') ? 'active' : ''}`}>
                    <Link to="/faculty/manage/batch/students" className="sidebar-submenu__link">
                      Assign Students to Batch
                    </Link>
                  </li> */}
                </ul>
              </li>


              {/* Resources Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'resources' || isDropdownActive(['/faculty/upload/resource', '/faculty/view/resources'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('resources')}
                >
                  <span className="icon">
                    <i className="ph ph-folder"></i>
                  </span>
                  <span className="text">Resources</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/faculty/upload/resource') ? 'active' : ''}`}>
                    <Link to="/faculty/upload/resource" className="sidebar-submenu__link">
                      Upload Resource
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/view/resources') ? 'active' : ''}`}>
                    <Link to="/faculty/view/resources" className="sidebar-submenu__link">
                      View Resources
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Assignments Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'assignments' ||
                  isDropdownActive(['/faculty/create/assignment', '/faculty/assignment/submission', '/faculty/view/assignments'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('assignments')}
                >
                  <span className="icon">
                    <i className="ph ph-pencil"></i>
                  </span>
                  <span className="text">Assignments</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/faculty/create/assignment') ? 'active' : ''}`}>
                    <Link to="/faculty/create/assignment" className="sidebar-submenu__link">
                      Create Assignment
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/assignment/submission') ? 'active' : ''}`}>
                    <Link to="/faculty/assignment/submission" className="sidebar-submenu__link">
                      Assignment Submission
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/view/assignments') ? 'active' : ''}`}>
                    <Link to="/faculty/view/assignments" className="sidebar-submenu__link">
                      View Assignments
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Notifications Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'notifications' || isDropdownActive(['/faculty/view/notices', '/faculty/send/notice'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('notifications')}
                >
                  <span className="icon">
                    <i className="ph ph-notification"></i>
                  </span>
                  <span className="text">Notifications</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/faculty/view/notices') ? 'active' : ''}`}>
                    <Link to="/faculty/view/notices" className="sidebar-submenu__link">
                      View Notices
                    </Link>
                  </li>
                  {/* <li className={`sidebar-submenu__item ${isActive('/faculty/send/notice') ? 'active' : ''}`}>
                    <Link to="/faculty/send/notice" className="sidebar-submenu__link">
                      Send Notice
                    </Link>
                  </li> */}
                </ul>
              </li>


              {/* Quizzes Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'quizzes' ||
                  isDropdownActive(['/faculty/create/quiz', '/faculty/view/quizzes', '/faculty/quiz/responses', '/faculty/quiz/reports'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('quizzes')}
                >
                  <span className="icon">
                    <i className="ph ph-question"></i>
                  </span>
                  <span className="text">Quizzes</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/faculty/create/quiz') ? 'active' : ''}`}>
                    <Link to="/faculty/create/quiz" className="sidebar-submenu__link">
                      Create Quiz
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/view/quizzes') ? 'active' : ''}`}>
                    <Link to="/faculty/view/quizzes" className="sidebar-submenu__link">
                      View Quizzes
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/quiz/responses') ? 'active' : ''}`}>
                    <Link to="/faculty/quiz/responses" className="sidebar-submenu__link">
                      Quiz Responses
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/quiz/reports') ? 'active' : ''}`}>
                    <Link to="/faculty/quiz/reports" className="sidebar-submenu__link">
                      Quiz Reports
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Attendance Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'attendance' ||
                  isDropdownActive(['/faculty/manage/attendance', '/faculty/qr/attendance', '/faculty/view/attendance'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('attendance')}
                >
                  <span className="icon">
                    <i className="ph ph-pen"></i>
                  </span>
                  <span className="text">Attendance</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/faculty/manage/attendance') ? 'active' : ''}`}>
                    <Link to="/faculty/manage/attendance" className="sidebar-submenu__link">
                      Mark Attendance
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/qr/attendance') ? 'active' : ''}`}>
                    <Link to="/faculty/qr/attendance" className="sidebar-submenu__link">
                      QR Code Attendance
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/view/attendance') ? 'active' : ''}`}>
                    <Link to="/faculty/view/attendance" className="sidebar-submenu__link">
                      View Attendance
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Examinations Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'examinations' || isDropdownActive(['/faculty/view/exams', '/faculty/manage/marks'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('examinations')}
                >
                  <span className="icon">
                    <i className="ph ph-file-text"></i>
                  </span>
                  <span className="text">Examinations</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/faculty/view/exams') ? 'active' : ''}`}>
                    <Link to="/faculty/view/exams" className="sidebar-submenu__link">
                      View Exams
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/manage/marks') ? 'active' : ''}`}>
                    <Link to="/faculty/manage/marks" className="sidebar-submenu__link">
                      Manage Marks
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Results Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'results' || isDropdownActive(['/faculty/upload/results', '/faculty/view/results'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('results')}
                >
                  <span className="icon">
                    <i className="ph ph-chart-bar"></i>
                  </span>
                  <span className="text">Results</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/faculty/upload/results') ? 'active' : ''}`}>
                    <Link to="/faculty/upload/results" className="sidebar-submenu__link">
                      Upload Results
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/view/results') ? 'active' : ''}`}>
                    <Link to="/faculty/view/results" className="sidebar-submenu__link">
                      View Results
                    </Link>
                  </li>
                </ul>
              </li>


              {/* Schedule Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'schedule' || isDropdownActive(['/faculty/upload/schedule', '/faculty/view/schedule'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('schedule')}
                >
                  <span className="icon">
                    <i className="ph ph-calendar-blank"></i>
                  </span>
                  <span className="text">Schedule</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/faculty/upload/schedule') ? 'active' : ''}`}>
                    <Link to="/faculty/upload/schedule" className="sidebar-submenu__link">
                      Upload Schedule
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/faculty/view/schedule') ? 'active' : ''}`}>
                    <Link to="/faculty/view/schedule" className="sidebar-submenu__link">
                      View Schedule
                    </Link>
                  </li>
                </ul>
              </li>


              {/* Profile Settings */}
              {/* <li className={`sidebar-menu__item ${isActive('/faculty/settings') ? 'active' : ''}`}>
                <Link to="/faculty/settings" className="sidebar-menu__link">
                  <span className="icon">
                    <i className="ph ph-gear"></i>
                  </span>
                  <span className="text">Settings</span>
                </Link>
              </li> */}

              {/* Logout */}
              <li className="sidebar-menu__item">
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={handleLogout}
                >
                  <span className="icon">
                    <i className="ph ph-sign-out"></i>
                  </span>
                  <span className="text">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main-wrapper">
        {/* Top Navbar */}
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
          <button
            onClick={handleLogout}
            className="block bg-blue-100 text-blue-600 rounded-3xl px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
          >
            Logout
          </button>

          {/* Profile Dropdown */}
          {/* <div className="relative border-[1px] rounded-[100px] py-[7px] hover:bg-zinc-200 transition">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-2 focus:outline-none"
            >
              <img
                src={
                  profile.profile_picture ||
                  "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
              <span className="text-blue-500 font-medium">
                @{profile?.username}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-full bg-white rounded-lg shadow-lg border border-gray-200 ">
                <div className="py-2">
                  <Link
                    to="/faculty/edit-profile"
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  >
                    Edit Profile
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
          </div> */}
        </div>

        {/* Routes */}
        <div className="dashboard-body">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="view/courses" element={<ViewCourses />} />
            <Route path="assigned/courses" element={<AssignedCourses />} />
            <Route path="view/batches" element={<ViewBatches />} />
            <Route path="manage/batch/students" element={<AssignStudentsToBatch />} />
            <Route path="manage/attendance" element={<MarkAttendance />} />
            <Route path="qr/attendance" element={<GenerateQRAttendance />} />
            <Route path="view/attendance" element={<ViewAttendance />} />
            <Route path="create/assignment" element={<CreateAssignment />} />
            <Route path="assignment/submission" element={<AssignmentSubmission />} />
            <Route path="view/assignments" element={<ViewAssignments />} />
            <Route path="create/quiz" element={<CreateQuiz />} />
            <Route path="view/quizzes" element={<ViewQuizzes />} />
            <Route path="quiz/responses" element={<QuizResponses />} />
            <Route path="quiz/reports" element={<QuizReports />} />
            <Route path="view/exams" element={<ViewExams />} />
            <Route path="manage/marks" element={<ManageMarks />} />
            <Route path="upload/results" element={<UploadResults />} />
            <Route path="view/results" element={<ViewResults />} />
            <Route path="view/notices" element={<ViewNotices />} />
            <Route path="send/notice" element={<SendNotice />} />
            <Route path="upload/schedule" element={<UploadSchedule />} />
            <Route path="view/schedule" element={<ViewSchedule />} />
            <Route path="view/admin/schedule" element={<ViewAdminSchedule />} />
            <Route path="upload/resource" element={<UploadResource />} />
            <Route path="view/resources" element={<ViewResources />} />
            <Route path="edit-profile" element={<FacultyProfile />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default FacultyDashboard;