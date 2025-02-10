import React from 'react'
import Dashboard from './Dashboard'
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import logo from '../../assets/logo.png'
import NotFoundPage from '../NotFoundPage';
// Import your Dashboard from './Dashboard';
import ViewCourses from './ViewCourses';
import AssignedCourses from './AssignedCourses';
import ViewBatches from './ViewBatches';
import AssignStudentsToBatch from './AssignStudentsToBatch';
import MarkAttendance from './MarkAttendance';
import QRCodeAttendance from './QRAttendance';
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

const FacultyDashboard = () => {
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
                <button type="button" className="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute">
                    <i className="ph ph-x"></i>
                </button>

                <div className="sidebar-menu-wrapper overflow-y-auto scroll-sm">
                    <div className="p-20 pt-20">
                        <div className="bg-main-50 p-20 pt-0 rounded-16 text-center mt-74">
                            <span className="border-5 bg-white position-relative overflow-hidden object-cover mx-auto border-blue-500 w-114 h-114 rounded-circle flex-center text-success-600 text-2xl translate-n74">
                                <img src="\assets\img\profiles\avatar-01.jpg" alt="Faculty Profile" className="position-absolute top-0 left-0" />
                            </span>
                            <div className="mt-n74">
                                <h5 className="mb-4 mt-12">Faculty Profile</h5>
                                <p className="font-weight-bold">John Doe</p>
                                <p className="mb-2 text-sm text-zinc-400">john.doe@example.com</p>
                                <a href="/faculty/edit-profile" className="btn btn-main mt-16 rounded-pill">Edit Profile</a>
                            </div>
                        </div>
                    </div>

                    <div className="p-20 pt-10">
                        <ul className="sidebar-menu">
                            {/* Dashboard */}
                            <li className="sidebar-menu__item">
                                <Link to="/faculty" className="sidebar-menu__link">
                                    <span className="icon"><i className="ph ph-squares-four"></i></span>
                                    <span className="text">Dashboard</span>
                                </Link>
                            </li>

                            {/* Course Management */}
                            <li className="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" className="sidebar-menu__link">
                                    <span className="icon"><i className="ph ph-graduation-cap"></i></span>
                                    <span className="text">Courses</span>
                                </a>
                                <ul className="sidebar-submenu">
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/view/courses" className="sidebar-submenu__link">View All Courses</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/assigned/courses" className="sidebar-submenu__link">Assigned Courses</Link>
                                    </li>
                                </ul>
                            </li>

                            {/* Batch Management */}
                            <li className="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" className="sidebar-menu__link">
                                    <span className="icon"><i className="ph ph-users"></i></span>
                                    <span className="text">Batches</span>
                                </a>
                                <ul className="sidebar-submenu">
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/view/batches" className="sidebar-submenu__link">View All Batches</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/manage/batch/students" className="sidebar-submenu__link">Assign Students to Batch</Link>
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
                                        <Link to="/faculty/manage/attendance" className="sidebar-submenu__link">Mark Attendance</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/qr/attendance" className="sidebar-submenu__link">QR Code Attendance</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/view/attendance" className="sidebar-submenu__link">View Attendance</Link>
                                    </li>
                                </ul>
                            </li>

                            {/* Assignments */}
                            <li className="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" className="sidebar-menu__link">
                                    <span className="icon"><i className="ph ph-pencil"></i></span>
                                    <span className="text">Assignments</span>
                                </a>
                                <ul className="sidebar-submenu">
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/create/assignment" className="sidebar-submenu__link">Create Assignment</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/assignment/submission" className="sidebar-submenu__link">Assignment Submission</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/view/assignments" className="sidebar-submenu__link">View Assignments</Link>
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
                                        <Link to="/faculty/create/quiz" className="sidebar-submenu__link">Create Quiz</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/view/quizzes" className="sidebar-submenu__link">View Quizzes</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/quiz/responses" className="sidebar-submenu__link">Quiz Responses</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/quiz/reports" className="sidebar-submenu__link">Quiz Reports</Link>
                                    </li>
                                </ul>
                            </li>

                            {/* Examination & Marks Management */}
                            <li className="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" className="sidebar-menu__link">
                                    <span className="icon"><i className="ph ph-file-text"></i></span>
                                    <span className="text">Examinations</span>
                                </a>
                                <ul className="sidebar-submenu">
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/view/exams" className="sidebar-submenu__link">View Exams</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/manage/marks" className="sidebar-submenu__link">Manage Marks</Link>
                                    </li>
                                </ul>
                            </li>

                            {/* Results Management */}
                            <li className="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" className="sidebar-menu__link">
                                    <span className="icon"><i className="ph ph-chart-bar"></i></span>
                                    <span className="text">Results</span>
                                </a>
                                <ul className="sidebar-submenu">
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/upload/results" className="sidebar-submenu__link">Upload Results</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/view/results" className="sidebar-submenu__link">View Results</Link>
                                    </li>
                                </ul>
                            </li>

                            {/* Notifications */}
                            <li className="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" className="sidebar-menu__link">
                                    <span className="icon"><i className="ph ph-notification"></i></span>
                                    <span className="text">Notifications</span>
                                </a>
                                <ul className="sidebar-submenu">
                                    {/* View Notices from Admin */}
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/view/notices" className="sidebar-submenu__link">View Notices</Link>
                                    </li>

                                    {/* Send Notice to Students */}
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/send/notice" className="sidebar-submenu__link">Send Notice to Students</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" className="sidebar-menu__link">
                                    <span className="icon"><i className="ph ph-calendar-blank"></i></span> {/* Changed Icon */}
                                    <span className="text">Schedule</span>
                                </a>
                                <ul className="sidebar-submenu">
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/upload/schedule" className="sidebar-submenu__link">Upload Schedule</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/view/schedule" className="sidebar-submenu__link">View Schedule</Link> {/* View uploaded schedule */}
                                    </li>
            
                                </ul>
                            </li>




                            {/* Resources/Materials */}
                            <li className="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" className="sidebar-menu__link">
                                    <span className="icon"><i className="ph ph-folder"></i></span> {/* New Icon */}
                                    <span className="text">Resources</span>
                                </a>
                                <ul className="sidebar-submenu">
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/upload/resource" className="sidebar-submenu__link">Upload Resource</Link>
                                    </li>
                                    <li className="sidebar-submenu__item">
                                        <Link to="/faculty/view/resources" className="sidebar-submenu__link">View Resources</Link>
                                    </li>
                                </ul>
                            </li>

                            {/* Profile Settings */}
                            <li className="sidebar-menu__item">
                                <Link to="/faculty/settings/" className="sidebar-menu__link">
                                    <span className="icon"><i className="ph ph-gear"></i></span> {/* New Icon */}
                                    <span className="text">Settings</span>
                                </Link>
                            </li>

                            {/* Logout */}
                            <li className="sidebar-menu__item">
                                <Link to="/logout" className="sidebar-menu__link">
                                    <span className="icon"><i className="ph ph-sign-out"></i></span> {/* New Icon */}
                                    <span className="text">Logout</span>
                                </Link>
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
                        {/* Notification Dropdown */}
                        <div className="dropdown">
                            <button className="dropdown-btn text-gray-500 w-40 h-40 bg-main-50 hover-bg-main-100 transition-2 rounded-circle text-xl flex-center" type="button" data-bs-toggle="dropdown">
                                <span className="position-relative">
                                    <i className="ph ph-bell"></i>
                                    <span className="alarm-notify position-absolute end-0"></span>
                                </span>
                            </button>
                            <div className="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
                                <div className="card border border-gray-100 rounded-12 box-shadow-custom p-0 overflow-hidden">
                                    <div className="card-body p-0">
                                        <div className="py-8 px-24 bg-main-600 flex-between">
                                            <h5 className="text-xl fw-semibold text-white mb-0">Notifications</h5>
                                            <div className="flex-align gap-12">
                                                <button type="button" className="bg-white rounded-6 text-sm px-8 py-2 hover-text-primary-600"> New </button>
                                                <button type="button" className="close-dropdown hover-scale-1 text-xl text-white"><i className="ph ph-x"></i></button>
                                            </div>
                                        </div>
                                        <div className="p-24 max-h-270 overflow-y-auto scroll-sm">
                                            {/* Sample Notification */}
                                            <div className="d-flex align-items-start gap-12 border-bottom border-gray-100 mb-24 pb-24">
                                                <img src="assets/images/thumbs/notification-img1.png" alt="" className="w-48 h-48 rounded-circle object-fit-cover" />
                                                <div>
                                                    <a href="#" className="fw-medium text-15 text-gray-300 hover-text-main-600 text-line-2">
                                                        Ashwin Bose is requesting access to Design File - Final Project.
                                                    </a>
                                                    <div className="mt-16 flex-align gap-8">
                                                        <button className="btn btn-main py-8 text-15 fw-normal px-16">Accept</button>
                                                        <button className="btn btn-outline-gray py-8 text-15 fw-normal px-16">Decline</button>
                                                    </div>
                                                    <span className="text-gray-200 text-13 mt-8">2 mins ago</span>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" className="py-13 px-24 fw-bold text-center d-block text-primary-600 border-top border-gray-100 hover-text-decoration-underline"> View All </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>


                <div class="dashboard-body">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />

                        <Route path="view/courses" element={<ViewCourses />} />
                        <Route path="assigned/courses" element={<AssignedCourses />} />
                        <Route path="view/batches" element={<ViewBatches />} />
                        <Route path="manage/batch/students" element={<AssignStudentsToBatch />} />
                        <Route path="manage/attendance" element={<MarkAttendance />} />
                        <Route path="qr/attendance" element={<QRCodeAttendance />} />
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
                        {/* <Route path="/faculty/settings" element={<Settings />} /> */}
                        <Route path="/*" element={<NotFoundPage />} />
                    </Routes>

                </div>
                <div class="dashboard-footer">
                    <div class="flex-between flex-wrap gap-16">
                        <p class="text-gray-300 text-13 fw-normal"> &copy; Copyright Edmate 2024, All Right Reserverd</p>
                        <div class="flex-align flex-wrap gap-16">
                            <a href="#" class="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">License</a>
                            <a href="#" class="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">More Themes</a>
                            <a href="#" class="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">Documentation</a>
                            <a href="#" class="text-gray-300 text-13 fw-normal hover-text-main-600 hover-text-decoration-underline">Support</a>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default FacultyDashboard