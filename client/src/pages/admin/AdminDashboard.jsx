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

                <a href="index.html" class="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 pb-10">
                    <h3>&lt;Codexpress/&gt;</h3>
                </a>

                <div class="sidebar-menu-wrapper overflow-y-auto scroll-sm">
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
                                <a href="/admin/manage/attendance" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-pen"></i></span>
                                    <span class="text">Manage Attendance </span>
                                </a>
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
                                <a href="/admin/manage/feedback" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-chat-teardrop-text"></i></span>
                                    <span class="text"> Feedback & Review </span>
                                </a>
                            </li>
                            <li class="sidebar-menu__item ">
                                <a href="/admin/manage/fees" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-money"></i></span>
                                    <span class="text">Fees</span>
                                </a>
                            </li>
                            <li class="sidebar-menu__item">
                                <a href="/admin/manage/refund" class="sidebar-menu__link">
                                    <span class="icon"><i class="ph ph-hand-coins"></i></span>
                                    <span class="text">Refund & Cancellation </span>
                                </a>
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
                    <div class="p-20 pt-80">
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
                    </div>
                </div>

            </aside>
            {/* <!-- ============================ Sidebar End  ============================ --> */}

            <div class="dashboard-main-wrapper">
                <div class="top-navbar flex-between gap-16">

                    <div class="flex-align gap-16">
                        {/* <!-- Toggle Button Start --> */}
                        <button type="button" class="toggle-btn d-xl-none d-flex text-26 text-gray-500"><i class="ph ph-list"></i></button>
                        {/* <!-- Toggle Button End --> */}

                        <form action="#" class="w-350 d-sm-block d-none">
                            <div class="position-relative">
                                {/* <button type="submit" class="input-icon text-xl d-flex text-gray-100 pointer-event-none">/*<i class="ph ph-magnifying-glass"></i></button>  */}
                                <input type="text" class="form-control ps-40 h-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15" placeholder="Search..." />
                            </div>
                        </form>
                    </div>

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

                            {/* <!-- Language Start --> */}
                            <div class="dropdown">
                                <button class="text-gray-500 w-40 h-40 bg-main-50 hover-bg-main-100 transition-2 rounded-circle text-xl flex-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="ph ph-globe"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu--md border-0 bg-transparent p-0">
                                    <div class="card border border-gray-100 rounded-12 box-shadow-custom">
                                        <div class="card-body">
                                            <div class="max-h-270 overflow-y-auto scroll-sm pe-8">
                                                <div class="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                                                    <label class="ps-0 form-check-label line-height-1 fw-medium text-secondary-light" for="arabic">
                                                        <span class="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                            <img src="assets/images/thumbs/flag1.png" alt="" class="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0" />
                                                            <span class="text-15 fw-semibold mb-0">Arabic</span>
                                                        </span>
                                                    </label>
                                                    <input class="form-check-input" type="radio" name="language" id="arabic" />
                                                </div>
                                                <div class="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                                                    <label class="ps-0 form-check-label line-height-1 fw-medium text-secondary-light" for="germany">
                                                        <span class="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                            <img src="assets/images/thumbs/flag2.png" alt="" class="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0" />
                                                            <span class="text-15 fw-semibold mb-0">Germany</span>
                                                        </span>
                                                    </label>
                                                    <input class="form-check-input" type="radio" name="language" id="germany" />
                                                </div>
                                                <div class="form-check form-radio d-flex align-items-center justify-content-between ps-0 mb-16">
                                                    <label class="ps-0 form-check-label line-height-1 fw-medium text-secondary-light" for="english">
                                                        <span class="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                            <img src="assets/images/thumbs/flag3.png" alt="" class="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0" />
                                                            <span class="text-15 fw-semibold mb-0">English</span>
                                                        </span>
                                                    </label>
                                                    <input class="form-check-input" type="radio" name="language" id="english" />
                                                </div>
                                                <div class="form-check form-radio d-flex align-items-center justify-content-between ps-0">
                                                    <label class="ps-0 form-check-label line-height-1 fw-medium text-secondary-light" for="spanish">
                                                        <span class="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-8">
                                                            <img src="assets/images/thumbs/flag4.png" alt="" class="w-32-px h-32-px border borde border-gray-100 rounded-circle flex-shrink-0" />
                                                            <span class="text-15 fw-semibold mb-0">Spanish</span>
                                                        </span>
                                                    </label>
                                                    <input class="form-check-input" type="radio" name="language" id="spanish" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Language Start --> */}
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
                                                <a href="pricing-plan.html" class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                                    <span class="text-2xl text-primary-600 d-flex"><i class="ph ph-chart-bar"></i></span>
                                                    <span class="text">Upgrade Plan</span>
                                                </a>
                                            </li>
                                            <li class="mb-4">
                                                <a href="analytics.html" class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                                    <span class="text-2xl text-primary-600 d-flex"><i class="ph ph-chart-line-up"></i></span>
                                                    <span class="text">Daily Activity</span>
                                                </a>
                                            </li>
                                            <li class="mb-4">
                                                <a href="message.html" class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                                    <span class="text-2xl text-primary-600 d-flex"><i class="ph ph-chats-teardrop"></i></span>
                                                    <span class="text">Inbox</span>
                                                </a>
                                            </li>
                                            <li class="mb-4">
                                                <a href="email.html" class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                                    <span class="text-2xl text-primary-600 d-flex"><i class="ph ph-envelope-simple"></i></span>
                                                    <span class="text">Email</span>
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
                    <Route path='manage/fees' element={<ManageFees/>}/>
                    <Route path="*" element={<h2>Page Not Found</h2>} />  {/* Handle unknown routes */}

                    {/* Add more routes as needed */}
                </Routes>
                {/* <div class="row gy-4"> */}
                {/* <div class="col-lg-9"> */}
                {/* <!-- Widgets Start --> */}
                {/* <div class="row gy-4">
                            <div class="col-xxl-3 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="mb-2">155+</h4>
                                        <span class="text-gray-600">Completed Courses</span>
                                        <div class="flex-between gap-8 mt-16">
                                            <span class="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-600 text-white text-2xl"><i class="ph-fill ph-book-open"></i></span>
                                            <div id="complete-course" class="remove-tooltip-title rounded-tooltip-value"></div>
                                        </div>
                                    </div> */}
                {/* </div>
                            </div>
                            <div class="col-xxl-3 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="mb-2">39+</h4>
                                        <span class="text-gray-600">Earned Certificate</span>
                                        <div class="flex-between gap-8 mt-16">
                                            <span class="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-main-two-600 text-white text-2xl"><i class="ph-fill ph-certificate"></i></span>
                                            <div id="earned-certificate" class="remove-tooltip-title rounded-tooltip-value"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-3 col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="mb-2">25+</h4>
                                        <span class="text-gray-600">Course in Progress</span>
                                        <div class="flex-between gap-8 mt-16">
                                            <span class="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-purple-600 text-white text-2xl"> <i class="ph-fill ph-graduation-cap"></i></span>
                                            <div id="course-progress" class="remove-tooltip-title rounded-tooltip-value"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xxl-3 col-sm-6"> */}
                {/* <div class="card">
                                    <div class="card-body">
                                        <h4 class="mb-2">18k+</h4>
                                        <span class="text-gray-600">Community Support</span>
                                        <div class="flex-between gap-8 mt-16">
                                            <span class="flex-shrink-0 w-48 h-48 flex-center rounded-circle bg-warning-600 text-white text-2xl"><i class="ph-fill ph-users-three"></i></span>
                                            <div id="community-support" class="remove-tooltip-title rounded-tooltip-value"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                {/* <!-- Widgets End --> */}

                {/* <!-- Top Course Start --> */}
                {/* <div class="card mt-24">
                            <div class="card-body">
                                <div class="mb-20 flex-between flex-wrap gap-8">
                                    <h4 class="mb-0">Study Statistics</h4>
                                    <div class="flex-align gap-16 flex-wrap">
                                        <div class="flex-align flex-wrap gap-16">
                                            <div class="flex-align flex-wrap gap-8">
                                                <span class="w-8 h-8 rounded-circle bg-main-600"></span>
                                                <span class="text-13 text-gray-600">Study</span>
                                            </div>
                                            <div class="flex-align flex-wrap gap-8">
                                                <span class="w-8 h-8 rounded-circle bg-main-two-600"></span>
                                                <span class="text-13 text-gray-600">Test</span>
                                            </div>
                                        </div> */}
                {/* <select class="form-select form-control text-13 px-8 pe-24 py-8 rounded-8 w-auto">
                                            <option value="1">Yearly</option>
                                            <option value="1">Monthly</option>
                                            <option value="1">Weekly</option>
                                            <option value="1">Today</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div id="doubleLineChart" class="tooltip-style y-value-left"></div>
                                
                            </div>
                        </div> */}
                {/* <!-- Top Course End --> */}

                {/* <!-- Top Course Start --> */}
                {/* <div class="card mt-24">
                            <div class="card-body">
                                <div class="mb-20 flex-between flex-wrap gap-8">
                                    <h4 class="mb-0">Top Courses Pick for You</h4>
                                    <a href="student-courses.html" class="text-13 fw-medium text-main-600 hover-text-decoration-underline">See All</a>
                                </div>
                                
                                <div class="row g-20">
                                    <div class="col-lg-4 col-sm-6">
                                        <div class="card border border-gray-100">
                                            <div class="card-body p-8">
                                                <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                    <img src="assets/images/thumbs/course-img1.png" alt="Course Image"/>
                                                </a>
                                                <div class="p-8">
                                                    <span class="text-13 py-2 px-10 rounded-pill bg-success-50 text-success-600 mb-16">Development</span> */}
                {/* <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">Full Stack Web Development</a></h5>
    
                                                    <div class="flex-align gap-8 flex-wrap mt-16">
                                                        <img src="assets/images/thumbs/user-img1.png" class="w-28 h-28 rounded-circle object-fit-cover" alt="User Image"/>
                                                        <div>
                                                            <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        </div>
                                                    </div>
    
                                                    <div class="flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                                        <div class="flex-align gap-4">
                                                            <span class="text-sm text-main-600 d-flex"><i class="ph ph-video-camera"></i></span>
                                                            <span class="text-13 text-gray-600">24 Lesson</span>
                                                        </div>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-sm text-main-600 d-flex"><i class="ph ph-clock"></i></span>
                                                            <span class="text-13 text-gray-600">40 Hours</span> */}
                {/* </div>
                                                    </div>
                                                    
                                                    <div class="flex-between gap-4 flex-wrap mt-24">
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                        <a href="course-details.html" class="btn btn-outline-main rounded-pill py-9">View Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6"> */}
                {/* <div class="card border border-gray-100">
                                            <div class="card-body p-8">
                                                <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8">
                                                    <img src="assets/images/thumbs/course-img5.png" alt="Course Image"/>
                                                </a>
                                                <div class="p-8">
                                                    <span class="text-13 py-2 px-10 rounded-pill bg-warning-50 text-warning-600 mb-16">Design</span>
                                                    <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">Design System</a></h5>
    
                                                    <div class="flex-align gap-8 flex-wrap mt-16">
                                                        <img src="assets/images/thumbs/user-img5.png" class="w-28 h-28 rounded-circle object-fit-cover" alt="User Image"/>
                                                        <div>
                                                            <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        </div>
                                                    </div>
    
                                                    <div class="flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                                        <div class="flex-align gap-4">
                                                            <span class="text-sm text-main-600 d-flex"><i class="ph ph-video-camera"></i></span>
                                                            <span class="text-13 text-gray-600">24 Lesson</span>
                                                        </div>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-sm text-main-600 d-flex"><i class="ph ph-clock"></i></span>
                                                            <span class="text-13 text-gray-600">40 Hours</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="flex-between gap-4 flex-wrap mt-24">
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                        <a href="course-details.html" class="btn btn-outline-main rounded-pill py-9">View Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-sm-6">
                                        <div class="card border border-gray-100">
                                            <div class="card-body p-8">
                                                <a href="course-details.html" class="bg-main-100 rounded-8 overflow-hidden text-center mb-8 h-164 flex-center p-8"> */}
                {/* <img src="assets/images/thumbs/course-img6.png" alt="Course Image"> */}
                {/* </a>
                                                <div class="p-8">
                                                    <span class="text-13 py-2 px-10 rounded-pill bg-danger-50 text-danger-600 mb-16">Frontend</span>
                                                    <h5 class="mb-0"><a href="course-details.html" class="hover-text-main-600">React Native Courese</a></h5>
    
                                                    <div class="flex-align gap-8 flex-wrap mt-16"> */}
                {/* <img src="assets/images/thumbs/user-img6.png" class="w-28 h-28 rounded-circle object-fit-cover" alt="User Image"> */}
                {/* <div>
                                                            <span class="text-gray-600 text-13">Created by <a href="profile.html" class="fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline">Albert James</a> </span>
                                                        </div>
                                                    </div>
    
                                                    <div class="flex-align gap-8 mt-12 pt-12 border-top border-gray-100">
                                                        <div class="flex-align gap-4">
                                                            <span class="text-sm text-main-600 d-flex"><i class="ph ph-video-camera"></i></span>
                                                            <span class="text-13 text-gray-600">24 Lesson</span>
                                                        </div>
                                                        <div class="flex-align gap-4">
                                                            <span class="text-sm text-main-600 d-flex"><i class="ph ph-clock"></i></span>
                                                            <span class="text-13 text-gray-600">40 Hours</span>
                                                        </div>
                                                    </div> */}

                {/* <div class="flex-between gap-4 flex-wrap mt-24">
                                                        <div class="flex-align gap-4">
                                                            <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                                                            <span class="text-13 fw-bold text-gray-600">4.9</span>
                                                            <span class="text-13 fw-bold text-gray-600">(12k)</span>
                                                        </div>
                                                        <a href="course-details.html" class="btn btn-outline-main rounded-pill py-9">View Details</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                {/* <!-- Top Course End --> */}
                {/* </div> */}

                {/* <div class="col-lg-3"> */}
                {/* <!-- Calendar Start --> */}
                {/* <div class="card">
                            <div class="card-body">
                                <div class="calendar">
                                    <div class="calendar__header">
                                        <button type="button" class="calendar__arrow left"><i class="ph ph-caret-left"></i></button>
                                        <p class="display h6 mb-0">""</p>
                                        <button type="button" class="calendar__arrow right"><i class="ph ph-caret-right"></i></button>
                                    </div>
                                
                                    <div class="calendar__week week">
                                        <div class="calendar__week-text">Su</div>
                                        <div class="calendar__week-text">Mo</div>
                                        <div class="calendar__week-text">Tu</div>
                                        <div class="calendar__week-text">We</div>
                                        <div class="calendar__week-text">Th</div>
                                        <div class="calendar__week-text">Fr</div>
                                        <div class="calendar__week-text">Sa</div>
                                    </div>
                                    <div class="days"></div>
                                </div>
                            </div>
                        </div> */}
                {/* <!-- Calendar End --> */}

                {/* <!-- Assignment Start --> */}
                {/* <div class="card mt-24">
                            <div class="card-body">
                                <div class="mb-20 flex-between flex-wrap gap-8">
                                    <h4 class="mb-0">Assignments</h4>
                                    <a href="assignment.html" class="text-13 fw-medium text-main-600 hover-text-decoration-underline">See All</a>
                                </div>
                                <div class="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1 mb-16">
                                    <div class="flex-align flex-wrap gap-8">
                                        <span class="text-main-600 bg-main-50 w-44 h-44 rounded-circle flex-center text-2xl flex-shrink-0"><i class="ph-fill ph-graduation-cap"></i></span>
                                        <div>
                                            <h6 class="mb-0">Do The Research</h6>
                                            <span class="text-13 text-gray-400">Due in 9 days</span>
                                        </div>
                                    </div>
                                    <a href="assignment.html" class="text-gray-900 hover-text-main-600"><i class="ph ph-caret-right"></i></a>
                                </div>
                                <div class="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1 mb-16">
                                    <div class="flex-align flex-wrap gap-8">
                                        <span class="text-main-600 bg-main-50 w-44 h-44 rounded-circle flex-center text-2xl flex-shrink-0"><i class="ph ph-code"></i></span>
                                        <div>
                                            <h6 class="mb-0">PHP Dvelopment</h6>
                                            <span class="text-13 text-gray-400">Due in 2 days</span>
                                        </div>
                                    </div>
                                    <a href="assignment.html" class="text-gray-900 hover-text-main-600"><i class="ph ph-caret-right"></i></a>
                                </div>
                                <div class="p-xl-4 py-16 px-12 flex-between gap-8 rounded-8 border border-gray-100 hover-border-gray-200 transition-1">
                                    <div class="flex-align flex-wrap gap-8">
                                        <span class="text-main-600 bg-main-50 w-44 h-44 rounded-circle flex-center text-2xl flex-shrink-0"><i class="ph ph-bezier-curve"></i></span>
                                        <div>
                                            <h6 class="mb-0">Graphic Design</h6>
                                            <span class="text-13 text-gray-400">Due in 5 days</span>
                                        </div>
                                    </div>
                                    <a href="assignment.html" class="text-gray-900 hover-text-main-600"><i class="ph ph-caret-right"></i></a>
                                </div>
                            </div>
                        </div> */}
                {/* <!-- Assignment End --> */}

                {/* <!-- Progress Bar Start --> */}
                {/* <div class="card mt-24">
                            <div class="card-header border-bottom border-gray-100">
                                <h5 class="mb-0">My Progress</h5>
                            </div>
                            <div class="card-body">
                               <div id="radialMultipleBar"></div>
    
                               <div class="">
                                    <h6 class="text-lg mb-16 text-center"> <span class="text-gray-400">Total hour:</span> 6h 32 min</h6>
                                    <div class="flex-between gap-8 flex-wrap">
                                        <div class="flex-align flex-column">
                                            <h6 class="mb-6">60/60</h6>
                                            <span class="w-30 h-3 rounded-pill bg-main-600"></span>
                                            <span class="text-13 mt-6 text-gray-600">Completed</span>
                                        </div>
                                        <div class="flex-align flex-column">
                                            <h6 class="mb-6">60/60</h6>
                                            <span class="w-30 h-3 rounded-pill bg-main-two-600"></span>
                                            <span class="text-13 mt-6 text-gray-600">Completed</span>
                                        </div>
                                        <div class="flex-align flex-column">
                                            <h6 class="mb-6">60/60</h6>
                                            <span class="w-30 h-3 rounded-pill bg-gray-500"></span>
                                            <span class="text-13 mt-6 text-gray-600">Completed</span>
                                        </div>
                                    </div>
                               </div>
                            </div>
                        </div> */}
                {/* <!-- Progress bar end --> */}
                {/* </div> */}

                {/* </div> */}
                {/* </div> */}
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

export default AdminDashboard