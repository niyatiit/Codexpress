import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddCourse from './AddCourse';
import AddStudent from './AddStudent';
import ManageCourses from './ManageCourses';
import AssignCourse from './AssignCourse';
import AddBatch from './AddBatch';
import ManageBatches from './ManageBatches';
import AddFaculty from './AddFaculty';
import ManageFaculty from './ManageFaculty';
import ManageStudents from './ManageStudents';
import UploadResource from './UploadResource';
import ManageResources from './ManageResources';
import AddNotice from './AddNotice';
import ManageNotifications from './ManageNotifications';
import Attendance from './Attendance';
import IssueCertificate from './IssueCertificate';
import ManageCertificates from './ManageCertificates ';
import ManageFeedback from './ManageFeedback';
import ManageFees from './ManageFees';
import logo from '../../assets/logo.png';
import NotFoundPage from '../NotFoundPage';
import Footer from '../../components/Footer';
import Navbar from './Navbar';
import EditCourse from './EditCourse';
import EditBatch from './EditBatch';
import EditFaculty from './EditFaculty';
import EditProfile from './AdminProfile'
import ManageEnrollments from './ManageEnrollments';
import AssignBatch from './AssignBatch';
import ReportPage from './ReportPage';
import AdminReports from './AdminReports';
import InvoicePage from './InvoicePage';
import DownloadAll from './DownloadAll';
import ManageReports from './ManageReports';
import AttendanceReport from './AttendanceReport';
import AddCertificate from './AddCertification';
import FacultyAssignmentView from '../faculty/FacultyAssignmentView';
const AdminDashboard = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

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
        <Link to="/admin" className="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 px-36 pt-20 py-42">
          <img src={logo} alt="Logo" />
        </Link>

        {/* Sidebar Menu */}
        <div className="sidebar-menu-wrapper overflow-y-auto scroll-sm pb-20">
          <div className="p-20 pt-10">
            <ul className="sidebar-menu">
              {/* Dashboard */}
              <li className={`sidebar-menu__item ${isActive('/admin') ? 'active' : ''}`}>
                <Link to="/admin" className="sidebar-menu__link">
                  <span className="icon">
                    <i className="ph ph-squares-four"></i>
                  </span>
                  <span className="text">Dashboard</span>
                </Link>
              </li>

              {/* Courses Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'courses' || isDropdownActive(['/admin/add/course', '/admin/assign/course', '/admin/manage/courses'])
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
                  <li className={`sidebar-submenu__item ${isActive('/admin/add/course') ? 'active' : ''}`}>
                    <Link to="/admin/add/course" className="sidebar-submenu__link">
                      Create Courses
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/admin/assign/course') ? 'active' : ''}`}>
                    <Link to="/admin/assign/course" className="sidebar-submenu__link">
                      Assign Course
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/admin/manage/courses') ? 'active' : ''}`}>
                    <Link to="/admin/manage/courses" className="sidebar-submenu__link">
                      View All Courses
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/admin/view/assigned/courses') ? 'active' : ''}`}>
                    <Link to="/admin/view/assigned/courses" className="sidebar-submenu__link">
                      View Courses Assignments
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Batch Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'batch' || isDropdownActive(['/admin/add/batch', '/admin/manage/batches'])
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
                    <i className="ph ph-graduation-cap"></i>
                  </span>
                  <span className="text">Batch</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/admin/add/batch') ? 'active' : ''}`}>
                    <Link to="/admin/add/batch" className="sidebar-submenu__link">
                      Add New Batch
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/admin/manage/batches') ? 'active' : ''}`}>
                    <Link to="/admin/manage/batches" className="sidebar-submenu__link">
                      Manage Batches
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Students Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'students' || isDropdownActive(['/admin/add/student', '/admin/manage/students'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('students')}
                >
                  <span className="icon">
                    <i className="ph ph-users-three"></i>
                  </span>
                  <span className="text">Students</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/admin/add/student') ? 'active' : ''}`}>
                    <Link to="/admin/add/student" className="sidebar-submenu__link">
                      Add New Student
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/admin/manage/enrollments') ? 'active' : ''}`}>
                    <Link to="/admin/manage/enrollments" className="sidebar-submenu__link">
                      Manage Enrollments
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/admin/manage/students') ? 'active' : ''}`}>
                    <Link to="/admin/manage/students" className="sidebar-submenu__link">
                      View All Students
                    </Link>
                  </li>

                </ul>
              </li>

              {/* Faculty Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'faculty' || isDropdownActive(['/admin/add/faculty', '/admin/manage/faculty'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('faculty')}
                >
                  <span className="icon">
                    <i className="ph ph-users"></i>
                  </span>
                  <span className="text">Faculty</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/admin/add/faculty') ? 'active' : ''}`}>
                    <Link to="/admin/add/faculty" className="sidebar-submenu__link">
                      Add New Faculty
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/admin/manage/faculty') ? 'active' : ''}`}>
                    <Link to="/admin/manage/faculty" className="sidebar-submenu__link">
                      View All Faculties
                    </Link>
                  </li>
                </ul>
              </li>



              {/* Resources Dropdown */}
              {/* <li
                className={`sidebar-menu__item has-dropdown ${
                  openDropdown === 'resources' || isDropdownActive(['/admin/upload/resource', '/admin/manage/resources'])
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
                    <i className="ph ph-books"></i>
                  </span>
                  <span className="text">Resources</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/admin/upload/resource') ? 'active' : ''}`}>
                    <Link to="/admin/upload/resource" className="sidebar-submenu__link">
                      Upload New Resource
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/admin/manage/resources') ? 'active' : ''}`}>
                    <Link to="/admin/manage/resources" className="sidebar-submenu__link">
                      View All Resources
                    </Link>
                  </li>
                </ul>
              </li> */}

              {/* Notifications Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'notifications' || isDropdownActive(['/admin/add/notification', '/admin/manage/notifications'])
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
                  <li className={`sidebar-submenu__item ${isActive('/admin/add/notification') ? 'active' : ''}`}>
                    <Link to="/admin/add/notification" className="sidebar-submenu__link">
                      Send Notification
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/admin/manage/notifications') ? 'active' : ''}`}>
                    <Link to="/admin/manage/notifications" className="sidebar-submenu__link">
                      Manage Notifications
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Attendance */}
              <li className={`sidebar-menu__item ${isActive('/admin/manage/attendance') ? 'active' : ''}`}>
                <Link to="/admin/manage/attendance" className="sidebar-menu__link">
                  <span className="icon">
                    <i className="ph ph-pen"></i>
                  </span>
                  <span className="text">Manage Attendance</span>
                </Link>
              </li>


              {/* Certificates Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'certificates' || isDropdownActive(['/admin/issue/certificate', '/admin/manage/certificates'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('certificates')}
                >
                  <span className="icon">
                    <i className="ph ph-certificate"></i>
                  </span>
                  <span className="text">Certificates</span>
                </a>
                <ul className="sidebar-submenu">
                  {/* <li className={`sidebar-submenu__item ${isActive('/admin/issue/certificate') ? 'active' : ''}`}>
                    <Link to="/admin/issue/certificate" className="sidebar-submenu__link">
                      Issue Certificate
                    </Link>
                  </li> */}
                  <li className={`sidebar-submenu__item ${isActive('/admin/manage/certificates') ? 'active' : ''}`}>
                    <Link to="/admin/manage/certificates" className="sidebar-submenu__link">
                      Manage Certificates
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Reports Dropdown */}
              <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'reports' || isDropdownActive(['/admin/reports/enrollments', '/admin/reports/attendance'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('reports')}
                >
                  <span className="icon">
                    <i className="ph ph-file-text"></i>
                  </span>
                  <span className="text">Reports</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/admin/reports/enrollments') ? 'active' : ''}`}>
                    <Link to="/admin/reports/enrollments" className="sidebar-submenu__link">
                      Enrollment Report
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/admin/reports/attendance') ? 'active' : ''}`}>
                    <Link to="/admin/reports/attendance" className="sidebar-submenu__link">
                      Attendance Report
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Feedback */}
              {/* <li className={`sidebar-menu__item ${isActive('/admin/manage/feedback') ? 'active' : ''}`}>
                <Link to="/admin/manage/feedback" className="sidebar-menu__link">
                  <span className="icon">
                    <i className="ph ph-chat-teardrop-text"></i>
                  </span>
                  <span className="text">Feedback & Review</span>
                </Link>
              </li> */}

              {/* Fees */}
              {/* <li className={`sidebar-menu__item ${isActive('/admin/manage/fees') ? 'active' : ''}`}>
                <Link to="/admin/manage/fees" className="sidebar-menu__link">
                  <span className="icon">
                    <i className="ph ph-money"></i>
                  </span>
                  <span className="text">Fees</span>
                </Link>
              </li> */}

              {/* Refund & Cancellation */}
              {/* <li className={`sidebar-menu__item ${isActive('/admin/manage/refund') ? 'active' : ''}`}>
                <Link to="/admin/manage/refund" className="sidebar-menu__link">
                  <span className="icon">
                    <i className="ph ph-hand-coins"></i>
                  </span>
                  <span className="text">Refund & Cancellation</span>
                </Link>
              </li> */}

              {/* Authentication Dropdown */}
              {/* <li
                className={`sidebar-menu__item has-dropdown ${openDropdown === 'authentication' || isDropdownActive(['/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/verify-email', '/two-step-verification'])
                  ? 'open'
                  : ''
                  }`}
              >
                <a
                  href="#!"
                  className="sidebar-menu__link"
                  onClick={() => toggleDropdown('authentication')}
                >
                  <span className="icon">
                    <i className="ph ph-shield-check"></i>
                  </span>
                  <span className="text">Authentication</span>
                </a>
                <ul className="sidebar-submenu">
                  <li className={`sidebar-submenu__item ${isActive('/sign-in') ? 'active' : ''}`}>
                    <Link to="/sign-in" className="sidebar-submenu__link">
                      Sign In
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/sign-up') ? 'active' : ''}`}>
                    <Link to="/sign-up" className="sidebar-submenu__link">
                      Sign Up
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/forgot-password') ? 'active' : ''}`}>
                    <Link to="/forgot-password" className="sidebar-submenu__link">
                      Forgot Password
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/reset-password') ? 'active' : ''}`}>
                    <Link to="/reset-password" className="sidebar-submenu__link">
                      Reset Password
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/verify-email') ? 'active' : ''}`}>
                    <Link to="/verify-email" className="sidebar-submenu__link">
                      Verify Email
                    </Link>
                  </li>
                  <li className={`sidebar-submenu__item ${isActive('/two-step-verification') ? 'active' : ''}`}>
                    <Link to="/two-step-verification" className="sidebar-submenu__link">
                      Two Step Verification
                    </Link>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="add/course" element={<AddCourse />} />
          <Route path="add/student" element={<AddStudent />} />
          <Route path="add/batch" element={<AddBatch />} />
          <Route path="add/faculty" element={<AddFaculty />} />
          <Route path="assign/course" element={<AssignCourse />} />
          <Route path="view/assigned/courses" element={<FacultyAssignmentView />} />

          <Route path="edit/course/:id" element={<EditCourse />} />
          <Route path="manage/courses" element={<ManageCourses />} />
          <Route path="manage/students" element={<ManageStudents />} />
          <Route path="manage/faculty" element={<ManageFaculty />} />
          <Route path="manage/batches" element={<ManageBatches />} />
          <Route path="upload/resource" element={<UploadResource />} />
          <Route path="manage/resources" element={<ManageResources />} />
          <Route path="add/notification" element={<AddNotice />} />
          <Route path="manage/notifications" element={<ManageNotifications />} />
          <Route path="manage/feedback" element={<ManageFeedback />} />
          <Route path="manage/certificates" element={<ManageCertificates />} />
          <Route path="manage/attendance" element={<Attendance />} />
          {/* <Route path="issue/certificate" element={<IssueCertificate />} /> */}
          <Route path="manage/fees" element={<ManageFees />} />
          <Route path="edit-batch/:id" element={<EditBatch />} />
          <Route path="edit-faculty/:id" element={<EditFaculty />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="manage/enrollments" element={<ManageEnrollments />} />
          <Route path="reports/enrollments" element={<ManageReports />} />
          <Route path="reports/attendance" element={<AttendanceReport />} />
          <Route path="reports/invoice/:invoiceId" element={<InvoicePage />} />
          <Route path="reports/download-all" element={<DownloadAll />} />
          <Route path="add/certificate" element={<AddCertificate />} />
          {/* <Route path="manage/reports" element={<ReportPage />} /> */}
          <Route path="assign/batch/:userId" element={<AssignBatch />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;