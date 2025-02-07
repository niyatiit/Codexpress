import React from 'react'
import Dashboard from './Dashboard'
import { Link, NavLink } from 'react-router-dom'
import { Routes, Route } from "react-router-dom";
import MyCourses from './MyCourses';
import logo from './../../../assets/logo.png'

const StudentDashboard = () => {
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

    <Link to="/student" class="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 px-36 pt-20 py-42">
        <img src={logo} alt="" />
    </Link>

    <div class="sidebar-menu-wrapper overflow-y-auto scroll-sm">
        <div class="p-20 pt-10">
            <ul class="sidebar-menu">
                <li class="sidebar-menu__item">
                    <NavLink to="/student/" className="sidebar-menu__link" activeClassName="bg-main-600 text-white">
                        <span class="icon"><i class="ph ph-squares-four"></i></span>
                        <span class="text">Dashboard</span>
                    </NavLink>
                </li>
                
                <li class="sidebar-menu__item">
                    <NavLink to="/student/my-courses" className="sidebar-menu__link" activeClassName="bg-main-600 text-white">
                        <span class="icon"><i class="ph ph-graduation-cap"></i></span>
                        <span class="text">My Courses</span>
                    </NavLink>
                </li>

                <li class="sidebar-menu__item">
                    <NavLink to="/student/assignments" className="sidebar-menu__link" activeClassName="bg-main-600 text-white">
                        <span class="icon"><i class="ph ph-file-text"></i></span>
                        <span class="text">Assignments</span>
                    </NavLink>
                </li>

                <li class="sidebar-menu__item">
                    <NavLink to="/student/quizzes" className="sidebar-menu__link" activeClassName="bg-main-600 text-white">
                        <span class="icon"><i class="ph ph-list-checks"></i></span>
                        <span class="text">Quizzes</span>
                    </NavLink>
                </li>

                <li class="sidebar-menu__item">
                    <NavLink to="/student/exam-schedule" className="sidebar-menu__link" activeClassName="bg-main-600 text-white">
                        <span class="icon"><i class="ph ph-calendar"></i></span>
                        <span class="text">Exam Schedule</span>
                    </NavLink>
                </li>

                <li class="sidebar-menu__item">
                    <NavLink to="/student/certificates" className="sidebar-menu__link" activeClassName="bg-main-600 text-white">
                        <span class="icon"><i class="ph ph-certificate"></i></span>
                        <span class="text">My Certificates</span>
                    </NavLink>
                </li>

                <li class="sidebar-menu__item">
                    <NavLink to="/student/resources" className="sidebar-menu__link" activeClassName="bg-main-600 text-white">
                        <span class="icon"><i class="ph ph-books"></i></span>
                        <span class="text">Study Resources</span>
                    </NavLink>
                </li>

                <li class="sidebar-menu__item">
                    <NavLink to="/student/notifications" className="sidebar-menu__link" activeClassName="bg-main-600 text-white">
                        <span class="icon"><i class="ph ph-notification"></i></span>
                        <span class="text">Notifications</span>
                    </NavLink>
                </li>

                <li class="sidebar-menu__item">
                    <NavLink to="/student/attendance" className="sidebar-menu__link" activeClassName="bg-main-600 text-white">
                        <span class="icon"><i class="ph ph-pen"></i></span>
                        <span class="text">My Attendance</span>
                    </NavLink>
                </li>

                <li class="sidebar-menu__item">
                    <NavLink to="/student/feedback" className="sidebar-menu__link" activeClassName="bg-main-600 text-white">
                        <span class="icon"><i class="ph ph-chat-teardrop-text"></i></span>
                        <span class="text">Feedback & Reviews</span>
                    </NavLink>
                </li>

                <li class="sidebar-menu__item has-dropdown">
                    <NavLink to="javascript:void(0)" className="sidebar-menu__link" activeClassName="bg-main-600 text-white">
                        <span class="icon"><i class="ph ph-shield-check"></i></span>
                        <span class="text">Authentication</span>
                    </NavLink>
                    <ul class="sidebar-submenu">
                        <li class="sidebar-submenu__item">
                            <NavLink to="/sign-in" className="sidebar-submenu__link" activeClassName="bg-main-600 text-white">Sign In</NavLink>
                        </li>
                        <li class="sidebar-submenu__item">
                            <NavLink to="/sign-up" className="sidebar-submenu__link" activeClassName="bg-main-600 text-white">Sign Up</NavLink>
                        </li>
                        <li class="sidebar-submenu__item">
                            <NavLink to="/forgot-password" className="sidebar-submenu__link" activeClassName="bg-main-600 text-white">Forgot Password</NavLink>
                        </li>
                        <li class="sidebar-submenu__item">
                            <NavLink to="/reset-password" className="sidebar-submenu__link" activeClassName="bg-main-600 text-white">Reset Password</NavLink>
                        </li>
                        <li class="sidebar-submenu__item">
                            <NavLink to="/verify-email" className="sidebar-submenu__link" activeClassName="bg-main-600 text-white">Verify Email</NavLink>
                        </li>
                        <li class="sidebar-submenu__item">
                            <NavLink to="/two-step-verification" className="sidebar-submenu__link" activeClassName="bg-main-600 text-white">Two-Step Verification</NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="p-20 pt-80">
            <div class="bg-main-50 p-20 pt-0 rounded-16 text-center mt-74">
                <span class="border border-5 bg-white mx-auto border-primary-50 w-114 h-114 rounded-circle flex-center">
                    <i class="ph ph-smiley"></i>
                </span>
                <p class="text-muted fs-14">Looking to get started? <Link to="/sign-up" class="text-main-500">Sign Up</Link> now</p>
            </div>
        </div>
    </div>
</aside>

            {/* <!-- ============================ Sidebar End  ============================ --> */}

            <div class="dashboard-main-wrapper">
                <div class="top-navbar flex-between gap-16">
                    <div class="flex-align gap-16">
                        <div class="flex-align gap-8">
                            {/* <!-- Notification Start --> */}
                            <div class="dropdown">
                                <button class="dropdown-btn shaking-animation text-gray-500 w-40 h-40 bg-main-50 hover-bg-main-100 transition-2 rounded-circle text-xl flex-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="position-relative">
                                        <i class="ph ph-bell"></i>
                                        <span class="alarm-notify position-absolute end-0"></span>
                                    </span>
                                </button>
                                <div class="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
                                    <div class="card border border-gray-100 rounded-12 box-shadow-custom p-0 overflow-hidden">
                                        <div class="card-body p-0">
                                            <div class="py-8 px-24 bg-main-600">
                                                <div class="flex-between">
                                                    <h5 class="text-xl fw-semibold text-white mb-0">Notifications</h5>
                                                    <div class="flex-align gap-12">
                                                        <button type="button" class="bg-white rounded-6 text-sm px-8 py-2 hover-text-primary-600"> New </button>
                                                        <button type="button" class="close-dropdown hover-scale-1 text-xl text-white"><i class="ph ph-x"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="p-24 max-h-270 overflow-y-auto scroll-sm">
                                                <div class="d-flex align-items-start gap-12">
                                                    <img src="assets/images/thumbs/notification-img1.png" alt="" class="w-48 h-48 rounded-circle object-fit-cover" />
                                                    <div class="border-bottom border-gray-100 mb-24 pb-24">
                                                        <div class="flex-align gap-4">
                                                            <a href="#" class="fw-medium text-15 mb-0 text-gray-300 hover-text-main-600 text-line-2">Ashwin Bose is requesting access to Design File - Final Project. </a>
                                                            {/* <!-- Three Dot Dropdown Start --> */}
                                                            <div class="dropdown flex-shrink-0">
                                                                <button class="text-gray-200 rounded-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i class="ph-fill ph-dots-three-outline"></i>
                                                                </button>
                                                                <div class="dropdown-menu dropdown-menu--md border-0 bg-transparent p-0">
                                                                    <div class="card border border-gray-100 rounded-12 box-shadow-custom">
                                                                        <div class="card-body p-12">
                                                                            <div class="max-h-200 overflow-y-auto scroll-sm pe-8">
                                                                                <ul>
                                                                                    <li class="mb-0">
                                                                                        <a href="#" class="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                            <span class="text">Mark as read</span>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li class="mb-0">
                                                                                        <a href="#" class="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                            <span class="text">Delete Notification</span>
                                                                                        </a>
                                                                                    </li>
                                                                                    <li class="mb-0">
                                                                                        <a href="#" class="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                            <span class="text">Report</span>
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- Three Dot Dropdown End --> */}
                                                        </div>
                                                        <div class="flex-align gap-6 mt-8">
                                                            <img src="assets/images/icons/google-drive.png" alt="" />
                                                            <div class="flex-align gap-4">
                                                                <p class="text-gray-900 text-sm text-line-1">Design brief and ideas.txt</p>
                                                                <span class="text-xs text-gray-200 flex-shrink-0">2.2 MB</span>
                                                            </div>
                                                        </div>
                                                        <div class="mt-16 flex-align gap-8">
                                                            <button type="button" class="btn btn-main py-8 text-15 fw-normal px-16">Accept</button>
                                                            <button type="button" class="btn btn-outline-gray py-8 text-15 fw-normal px-16">Decline</button>
                                                        </div>
                                                        <span class="text-gray-200 text-13 mt-8">2 mins ago</span>
                                                    </div>
                                                </div>
                                                <div class="d-flex align-items-start gap-12">
                                                    <img src="assets/images/thumbs/notification-img2.png" alt="" class="w-48 h-48 rounded-circle object-fit-cover" />
                                                    <div class="">
                                                        <a href="#" class="fw-medium text-15 mb-0 text-gray-300 hover-text-main-600 text-line-2">Patrick added a comment on Design Assets - Smart Tags file:</a>
                                                        <span class="text-gray-200 text-13">2 mins ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="#" class="py-13 px-24 fw-bold text-center d-block text-primary-600 border-top border-gray-100 hover-text-decoration-underline"> View All </a>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Notification Start --> */}

                           
                        </div>


                        {/* <!-- User Profile Start --> */}
                        <div class="dropdown">
                            <button class="users arrow-down-icon border border-gray-200 rounded-pill p-4 d-inline-block pe-40 position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="position-relative">
                                    <img src="assets/images/thumbs/user-img.png" alt="Image" class="h-32 w-32 rounded-circle" />
                                    <span class="activation-badge w-8 h-8 position-absolute inset-block-end-0 inset-inline-end-0"></span>
                                </span>
                            </button>
                            <div class="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
                                <div class="card border border-gray-100 rounded-12 box-shadow-custom">
                                    <div class="card-body">
                                        <div class="flex-align gap-8 mb-20 pb-20 border-bottom border-gray-100">
                                            <img src="assets/images/thumbs/user-img.png" alt="" class="w-54 h-54 rounded-circle" />
                                            <div class="">
                                                <h4 class="mb-0">Michel John</h4>
                                                <p class="fw-medium text-13 text-gray-200">examplemail@mail.com</p>
                                            </div>
                                        </div>
                                        <ul class="max-h-270 overflow-y-auto scroll-sm pe-4">
                                            <li class="mb-4">
                                                <a href="setting.html" class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                                    <span class="text-2xl text-primary-600 d-flex"><i class="ph ph-gear"></i></span>
                                                    <span class="text">Account Settings</span>
                                                </a>
                                            </li>
                                            <li class="mb-4">
                                                <a href="message.html" class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                                    <span class="text-2xl text-primary-600 d-flex"><i class="ph ph-chats-teardrop"></i></span>
                                                    <span class="text">Inbox</span>
                                                </a>
                                            </li>
                                            <li class="pt-8 border-top border-gray-100">
                                                <a href="sign-in.html" class="py-12 text-15 px-20 hover-bg-danger-50 text-gray-300 hover-text-danger-600 rounded-8 flex-align gap-8 fw-medium text-15">
                                                    <span class="text-2xl text-danger-600 d-flex"><i class="ph ph-sign-out"></i></span>
                                                    <span class="text">Log Out</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- User Profile Start --> */}

                    </div>
                </div>


                {/* <div class="dashboard-body"> */}
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="my-courses" element={<MyCourses />} />
                    <Route path="*" element={<h2>Page Not Found</h2>} />  {/* Handle unknown routes */}

                    {/* Add more routes as needed */}
                </Routes>
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

export default StudentDashboard