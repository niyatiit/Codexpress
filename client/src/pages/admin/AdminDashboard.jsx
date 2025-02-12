import React from 'react'
import Dashboard from './Dashboard'
import { Routes, Route } from "react-router-dom";
import AddCourse from './AddCourse';
import { Link } from "react-router-dom";
import AddStudent from './AddStudent';
import ManageCourses from './ManageCourses';
import AssignCourse from './AssignCourse';
import AddBatch from './AddBatch';
import ManageBatches from './ManageBatches';
import AddFaculty from './AddFaculty';
import ManageFaculty from './ManageFaculty';
import ManageStudents from './ManageStudents';
import UploadResource from './UploadResource.JSX';
import ManageResources from './ManageResources';
import AddNotice from './AddNotice';
import ManageNotifications from './ManageNotifications';
import Attendance from './Attendance';
import IssueCertificate from './IssueCertificate';
import ManageCertificates from './ManageCertificates ';
import ManageFeedback from './ManageFeedback';
import ManageFees from './ManageFees';
import logo from '../../assets/logo.png'
import NotFoundPage from '../NotFoundPage';
import Footer from '../../components/Footer';
import Dashboard2 from './Dashboard2';


const AdminDashboard = () => {
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

            <aside class="sidebar">
                {/* <!-- sidebar close btn --> */}
                <button type="button" class="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute"><i class="ph ph-x"></i></button>
                {/* <!-- sidebar close btn --> */}

                <Link to="/admin" class="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 px-36 pt-20 py-42">
                    <img src={logo} alt="" />
                </Link>

                <div class="sidebar-menu-wrapper overflow-y-auto scroll-sm pb-20">
                    <div class="p-20 pt-10">
                        <ul class="sidebar-menu">
                            <li class="sidebar-menu__item">
                                <Link to="/admin" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-squares-four"></i></span>
                                    <span class="text">Dashboard</span>
                                </Link>
                                {/* <!-- Submenu start --> */}
                                {/* <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="index.html" class="sidebar-submenu__link"> Dashboard One </a>
                            </li> */}
                                {/* <li class="sidebar-submenu__item">
                                <a href="index-2.html" class="sidebar-submenu__link"> Dashboard Two </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="index-3.html" class="sidebar-submenu__link"> Dashboard Three </a>
                            </li> */}
                                {/* </ul> */}
                                {/* <!-- Submenu End --> */}
                            </li>
                            <li class="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-graduation-cap"></i></span>
                                    <span class="text">Courses</span>
                                </a>
                                {/* <!-- Submenu start --> */}
                                <ul class="sidebar-submenu">
                                    <li class="sidebar-submenu__item">
                                        <Link to="/admin/add/course" class="sidebar-submenu__link"> Create Courses </Link>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <Link to="/admin/assign/course" class="sidebar-submenu__link"> Assign Course </Link>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <Link to="/admin/manage/courses" class="sidebar-submenu__link"> View All Courses </Link>
                                    </li>
                                    {/* <li class="sidebar-submenu__item">
                                <a href="create-course.html" class="sidebar-submenu__link"> Create Course </a>
                            </li> */}
                                </ul>
                                {/* <!-- Submenu End --> */}
                            </li>
                            <li class="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-graduation-cap"></i></span>
                                    <span class="text">Batch</span>
                                </a>
                                {/* <!-- Submenu start --> */}
                                <ul class="sidebar-submenu">
                                    <li class="sidebar-submenu__item">
                                        <Link to="/admin/add/batch" class="sidebar-submenu__link"> Add New Batch </Link>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <Link to="/admin/manage/batches" class="sidebar-submenu__link"> Manage Batches </Link>
                                    </li>
                                    {/* <li class="sidebar-submenu__item">
                                <a href="create-course.html" class="sidebar-submenu__link"> Create Course </a>
                            </li> */}
                                </ul>
                                {/* <!-- Submenu End --> */}
                            </li>
                            <li class="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-users"></i></span>
                                    <span class="text">Faculty</span>
                                </a>
                                {/* <!-- Submenu start --> */}
                                <ul class="sidebar-submenu">
                                    <li class="sidebar-submenu__item">
                                        <Link to="/admin/add/faculty" class="sidebar-submenu__link"> Add New Faculty </Link>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <Link to="/admin/manage/faculty" class="sidebar-submenu__link"> View All Faculties </Link>
                                    </li>
                                    {/* <li class="sidebar-submenu__item">
                                <a href="create-course.html" class="sidebar-submenu__link"> Create Course </a>
                            </li> */}
                                </ul>
                                {/* <!-- Submenu End --> */}
                            </li>
                            {/* <li class="sidebar-menu__item has-dropdown">
                        <a href="students.html" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-users-three"></i></span>
                            <span class="text">Faculty</span>
                        </a>
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="student-courses.html" class="sidebar-submenu__link"> Add New Faculty </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="mentor-courses.html" class="sidebar-submenu__link"> View All Faculties </a>
                            </li>
                        </ul>
                    </li> */}
                            <li class="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-users-three"></i></span>
                                    <span class="text">Students</span>
                                </a>
                                <ul class="sidebar-submenu">
                                    <li class="sidebar-submenu__item">
                                        {/* <span class="icon"><i class="ph ph-user-plus"></i></span> */}
                                        <Link to="/admin/add/student" class="sidebar-submenu__link"> Add New Student </Link>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <Link to="/admin/manage/students" class="sidebar-submenu__link"> View All Students </Link>
                                    </li>
                                    {/* <li class="sidebar-submenu__item">
                                <a href="create-course.html" class="sidebar-submenu__link"> Create Course </a>
                            </li> */}
                                </ul>
                            </li>
                            <li class="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-books"></i></span>
                                    <span class="text">Resources</span>
                                </a>
                                <ul class="sidebar-submenu">
                                    <li class="sidebar-submenu__item">
                                        {/* <span class="icon"><i class="ph ph-user-plus"></i></span> */}
                                        <Link to="/admin/upload/resource" class="sidebar-submenu__link"> Upload New Resource </Link>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <Link to="/admin/manage/resources" class="sidebar-submenu__link"> View All Resources </Link>
                                    </li>
                                    {/* <li class="sidebar-submenu__item">
                                <a href="create-course.html" class="sidebar-submenu__link"> Create Course </a>
                            </li> */}
                                </ul>
                            </li>
                            <li class="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-notification"></i></span>
                                    <span class="text">Notifications</span>
                                </a>
                                <ul class="sidebar-submenu">
                                    <li class="sidebar-submenu__item">
                                        {/* <span class="icon"><i class="ph ph-user-plus"></i></span> */}
                                        <Link to="/admin/add/notification" class="sidebar-submenu__link"> Send Notification </Link>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <Link to="/admin/manage/notifications" class="sidebar-submenu__link"> Manage Notifications </Link>
                                    </li>
                                    {/* <li class="sidebar-submenu__item">
                                <a href="create-course.html" class="sidebar-submenu__link"> Create Course </a>
                            </li> */}
                                </ul>
                            </li>
                            {/* <li class="sidebar-menu__item">
                        <span class="text-gray-300 text-sm px-20 pt-20 fw-semibold border-top border-gray-100 d-block text-uppercase">Settings</span>
                    </li> */}

                            <li class="sidebar-menu__item">
                                <Link to="/admin/manage/attendance" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-pen"></i></span>
                                    <span class="text">Manage Attendance </span>
                                </Link>
                            </li>
                            <li class="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-certificate"></i></span>
                                    <span class="text">Certficate</span>
                                </a>
                                <ul class="sidebar-submenu">
                                    <li class="sidebar-submenu__item">
                                        {/* <span class="icon"><i class="ph ph-user-plus"></i></span> */}
                                        <Link to="/admin/issue/certificate" class="sidebar-submenu__link"> Issue Certificate </Link>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <Link to="/admin/manage/certificates" class="sidebar-submenu__link"> Manage Certificate </Link>
                                    </li>
                                    {/* <li class="sidebar-submenu__item">
                                <a href="create-course.html" class="sidebar-submenu__link"> Create Course </a>
                            </li> */}
                                </ul>
                            </li>
                            <li class="sidebar-menu__item">
                                <Link to="/admin/manage/feedback" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-chat-teardrop-text"></i></span>
                                    <span class="text"> Feedback & Review </span>
                                </Link>
                            </li>
                            <li class="sidebar-menu__item ">
                                <Link to="/admin/manage/fees" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-money"></i></span>
                                    <span class="text">Fees</span>
                                </Link>
                            </li>
                            <li class="sidebar-menu__item">
                                <Link to="/admin/manage/refund" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-hand-coins"></i></span>
                                    <span class="text">Refund & Cancellation </span>
                                </Link>
                            </li>

                            <li class="sidebar-menu__item has-dropdown">
                                <a href="javascript:void(0)" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-shield-check"></i></span>
                                    <span class="text">Authetication</span>
                                </a>
                                {/* <!-- Submenu start --> */}
                                <ul class="sidebar-submenu">
                                    <li class="sidebar-submenu__item">
                                        <a href="sign-in.html" class="sidebar-submenu__link">Sign In</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="sign-up.html" class="sidebar-submenu__link">Sign Up</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="forgot-password.html" class="sidebar-submenu__link">Forgot Password</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="reset-password.html" class="sidebar-submenu__link">Reset Password</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="verify-email.html" class="sidebar-submenu__link">Verify Email</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="two-step-verification.html" class="sidebar-submenu__link">Two Step Verification</a>
                                    </li>
                                </ul>
                                {/* <!-- Submenu End --> */}
                            </li>

                        </ul>
                    </div>
                    {/* <div class="p-20 pt-80">
                        <div class="bg-main-50 p-20 pt-0 rounded-16 text-center mt-74">
                            <span class="border border-5 bg-white mx-auto border-primary-50 w-114 h-114 rounded-circle flex-center text-success-600 text-2xl translate-n74">
                                <img src="assets/images/icons/certificate.png" alt="" class="centerised-img" />
                            </span>
                            <div class="mt-n74">
                                <h5 class="mb-4 mt-22">Get Pro Certificate</h5>
                                <p class="">Explore 400+ courses with lifetime members</p>
                                <a href="pricing-plan.html" class="btn btn-main mt-16 rounded-pill">Get Access</a>
                            </div>
                        </div>
                    </div> */}
                </div>

            </aside>
            {/* <!-- ============================ Sidebar End  ============================ --> */}

            <div class="dashboard-main-wrapper">
                <div className="top-navbar flex-between gap-16 px-4 py-1">
                    {/* Left Section: Toggle Button & Search Bar */}
                    <div className="flex-align gap-16">
                        <button type="button" className="toggle-btn d-xl-none d-flex text-26 text-gray-500">
                            <i className="ph ph-list"></i>
                        </button>

                        <form action="#" className="w-350 d-sm-block d-none">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control ps-40 h-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15"
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


                        {/* User Profile Dropdown */}
                        <div className="dropdown">
                            <button className="users arrow-down-icon border border-gray-200 rounded-pill py-2 px-30 position-relative" type="button" data-bs-toggle="dropdown">
                                <span className="position-relative">
                                    <img src="assets/images/thumbs/user-img.png" alt="User" className="h-32 w-32 rounded-circle" />
                                    <span className="activation-badge w-8 h-8 position-absolute inset-block-end-0 inset-inline-end-0"></span>
                                </span>
                            </button>
                            <div className="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0 ">
                                <div className="card border border-gray-100 rounded-12 box-shadow-custom">
                                    <div className="card-body">
                                        <div className="flex-align gap-8 mb-20 pb-20 border-bottom border-gray-100">
                                            <img src="assets/images/thumbs/user-img.png" alt="" className="w-54 h-54 rounded-circle" />
                                            <div>
                                                <h4 className="mb-0">Michel John</h4>
                                                <p className="fw-medium text-13 text-gray-200">examplemail@mail.com</p>
                                            </div>
                                        </div>
                                        <ul className="max-h-270 overflow-y-auto scroll-sm pe-4">
                                            {[
                                                { href: "setting.html", icon: "ph-gear", label: "Account Settings" },
                                                { href: "pricing-plan.html", icon: "ph-chart-bar", label: "Upgrade Plan" },
                                            ].map((item, index) => (
                                                <li className="mb-4" key={index}>
                                                    <a href={item.href} className="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium">
                                                        <span className={`text-2xl text-primary-600 d-flex`}><i className={`ph ${item.icon}`}></i></span>
                                                        <span className="text">{item.label}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div class="dashboard-body"> */}
                <Routes>
                    {/* <Route path="/" element={<Dashboard2 />} /> */}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="add/course" element={<AddCourse />} />
                    <Route path="add/student" element={<AddStudent />} />
                    <Route path="add/batch" element={<AddBatch />} />
                    <Route path="add/faculty" element={<AddFaculty />} />
                    <Route path="assign/course" element={<AssignCourse />} />
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
                    <Route path="issue/certificate" element={<IssueCertificate />} />
                    <Route path='manage/fees' element={<ManageFees />} />
                    <Route path="*" element={<NotFoundPage />} />  {/* Handle unknown routes */}

                    {/* Add more routes as needed */}
                </Routes>

               <Footer/>
            </div>



        </div>
    )
}

export default AdminDashboard