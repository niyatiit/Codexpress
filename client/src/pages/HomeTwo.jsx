import React, { useEffect } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-white.png'
// import Header from '../components/Header';
// import object from '../../public/assets/img/object.png'
const HomeTwo = () => {

    return (

        // <!-- Main Wrapper -->
        <div class="main-wrapper">



            <Header />
            {/* <!-- /Header --> */}

            {/* <!-- Home Banner --> */}
            <section class="px-56 home-three-slide d-flex align-items-center">
                <div class="container">
                    <div class="row ">
                        <div className="col-xl-6 col-lg-8 col-md-12 col-12" data-aos="fade-down">
                            <div className="home-three-slide-face">
                                <div className="home-three-slide-text">
                                    <h5>Master Coding with Code Express</h5>
                                    <h1>Interactive <span>&</span> Industry-Ready Coding Courses</h1>
                                    <p>
                                        Join Code Express and learn coding with real-world projects, expert mentorship, and hands-on practice.
                                        Build your future in tech with structured learning paths.
                                    </p>
                                </div>
                                <div className="banner-three-content">
                                    <form className="form" action="/courses">
                                        <div className="form-inner-three">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search courses, technologies, instructors..."
                                                />
                                                <button className="btn btn-three-primary sub-btn" type="submit">
                                                    <i className="fas fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6 col-lg-4 col-md-6 col-12" data-aos="fade-up">
                            <div class="girl-slide-img aos">
                                <img class="img-fluid" src="assets/img/slider/home-slider.png" alt="Img" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- /Home Banner --> */}

            {/* <!-- Online Courses Section --> */}
            <section className="px-40 section student-course home-three-course">
                <div className="container">
                    <div className="course-widget-three">
                        <div className="row">
                            {/* Total Courses */}
                            <div className="col-lg-3 col-md-6 d-flex" data-aos="fade-up">
                                <div className="course-details-three">
                                    <div className="align-items-center">
                                        <div className="course-count-three course-count ms-0">
                                            <div className="course-img">
                                                <img className="img-fluid" src="assets/img/icon-three/course-01.svg" alt="Courses" />
                                            </div>
                                            <div className="course-content-three">
                                                <h4 className="text-blue"><span className="counterUp">50</span>+</h4>
                                                <p>In-Depth Coding Courses</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expert Instructors */}
                            <div className="col-lg-3 col-md-6 d-flex" data-aos="fade-up">
                                <div className="course-details-three">
                                    <div className="align-items-center">
                                        <div className="course-count-three course-count ms-0">
                                            <div className="course-img">
                                                <img className="img-fluid" src="assets/img/icon-three/course-02.svg" alt="Tutors" />
                                            </div>
                                            <div className="course-content-three">
                                                <h4 className="text-yellow"><span className="counterUp">100</span>+</h4>
                                                <p>Industry-Leading Mentors</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Certified Programs */}
                            <div className="col-lg-3 col-md-6 d-flex" data-aos="fade-up">
                                <div className="course-details-three">
                                    <div className="align-items-center">
                                        <div className="course-count-three course-count ms-0">
                                            <div className="course-img">
                                                <img className="img-fluid" src="assets/img/icon-three/course-03.svg" alt="Certified" />
                                            </div>
                                            <div className="course-content-three">
                                                <h4 className="text-info"><span className="counterUp">1,500</span>+</h4>
                                                <p>Certified Students</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Active Learners */}
                            <div className="col-lg-3 col-md-6 d-flex" data-aos="fade-up">
                                <div className="course-details-three mb-0">
                                    <div className="align-items-center">
                                        <div className="course-count-three">
                                            <div className="course-img">
                                                <img className="img-fluid" src="assets/img/icon-three/course-04.svg" alt="Students" />
                                            </div>
                                            <div className="course-content-three course-count ms-0">
                                                <h4 className="text-green"><span className="counterUp">10,000</span>+</h4>
                                                <p>Active Learners Worldwide</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- /Online Courses Section --> */}


            {/* <!-- Master skills Career --> */}
            <section class="px-56 master-skill-three">
                <div class="master-three-vector">
                    <img class="ellipse-right img-fluid" src="assets/img/bg/pattern-01.png" alt="Img" />
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-12" data-aos="fade-right">
                            <div class="master-three-images">
                                <div class="master-three-left">
                                    <img class="img-fluid" src="assets/img/students/career.png" alt="image-banner"
                                        title="image-banner" />
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6 col-lg-6 col-md-12" data-aos="fade-left">
                            <div class="home-three-head" data-aos="fade-up">
                                <h2>Master the skills to drive your career</h2>
                            </div>
                            <div class="home-three-content" data-aos="fade-up">
                                <p>Get certified, master modern tech skills, and level up your career whether you’re
                                    starting out or a seasoned pro. 95% of eLearning learners report our hands-on content
                                    directly helped their careers.</p>
                            </div>
                            <div class="skils-group">
                                <div class="row">
                                    <div class="col-lg-6 col-xs-12 col-sm-6" data-aos="fade-down">
                                        <div class="skils-icon-item">
                                            <div class="skils-icon">
                                                <img class="img-fluid" src="assets/img/icon-three/career-01.svg"
                                                    alt="certified" />
                                            </div>
                                            <div class="skils-content">
                                                <p class="mb-0">Get certified with 100+ certification courses</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-xs-12 col-sm-6" data-aos="fade-up">
                                        <div class="skils-icon-item">
                                            <div class="skils-icon">
                                                <img class="img-fluid" src="assets/img/icon-three/career-02.svg"
                                                    alt="Build skills" />
                                            </div>
                                            <div class="skils-content">
                                                <p class="mb-0">Build skills your way, from labs to courses</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-xs-12 col-sm-6" data-aos="fade-right">
                                        <div class="skils-icon-item">
                                            <div class="skils-icon">
                                                <img class="img-fluid" src="assets/img/icon-three/career-03.svg"
                                                    alt="Stay Motivated" />
                                            </div>
                                            <div class="skils-content">
                                                <p class="mb-0">Stay motivated with engaging instructors</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-xs-12 col-sm-6" data-aos="fade-left">
                                        <div class="skils-icon-item">
                                            <div class="skils-icon">
                                                <img class="img-fluid" src="assets/img/icon-three/career-04.svg"
                                                    alt="latest cloud" />
                                            </div>
                                            <div class="skils-content">
                                                <p class="mb-0">Keep up with the latest in cloud</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- /Master skills Career --> */}




            {/* <!-- Courses --> */}
            <section class="px-56 home-three-courses">
                <div class="container">
                    <div class="favourite-course-sec">
                        <div class="row">
                            <div class="home-three-head section-header-title" data-aos="fade-up">
                                <div class="row align-items-center d-flex justify-content-between">
                                    <div class="col-lg-6 col-sm-8">
                                        <h2>Courses</h2>
                                    </div>
                                    <div class="col-lg-6 col-sm-4">
                                        <div class="see-all">
                                            <Link to="/courses">See all<span class="see-all-icon"><i
                                                class="fas fa-arrow-right"></i></span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="all-corses-main">
                                <div class="tab-content">
                                    <div class="nav tablist-three py-4" role="tablist">

                                        <a class="nav-tab active me-3" data-bs-toggle="tab" href="#alltab"
                                            role="tab">All</a>

                                        <a class="nav-tab me-3" data-bs-toggle="tab" href="#mostpopulartab" role="tab">Most
                                            popular</a>

                                        <a class="nav-tab me-3" data-bs-toggle="tab" href="#businesstab"
                                            role="tab">Business</a>

                                        <a class="nav-tab me-3" data-bs-toggle="tab" href="#designtab" role="tab">Design</a>


                                    </div>

                                    <div class="tab-content">

                                        {/* <!-- All --> */}
                                        <div class="tab-pane fade active show" id="alltab" role="tabpanel">
                                            <div class="all-course">
                                                <div class="row">

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img" src="assets/img/course/course-24.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html">
                                                                                <img src="assets/img/user/user7.jpg" alt="Img" class="img-fluid" />
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Programming</p>
                                                                            <h3 class="title instructor-text">
                                                                                Mastering JavaScript: From Basics to Advanced
                                                                            </h3>
                                                                        </a>
                                                                    </div>

                                                                    <div class="student-counts-info d-flex align-items-center">
                                                                        <div class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg" alt="Img" />
                                                                            <p>500 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>₹299 <span>₹399.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>8hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img" src="assets/img/course/course-24.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html">
                                                                                <img src="assets/img/user/user7.jpg" alt="Img" class="img-fluid" />
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Data Structures</p>
                                                                            <h3 class="title instructor-text">
                                                                                Data Structures in Depth: Algorithms & Coding
                                                                            </h3>
                                                                        </a>
                                                                    </div>

                                                                    <div class="student-counts-info d-flex align-items-center">
                                                                        <div class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg" alt="Img" />
                                                                            <p>450 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>₹349 <span>₹499.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>7hr 45min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img" src="assets/img/course/course-24.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html">
                                                                                <img src="assets/img/user/user7.jpg" alt="Img" class="img-fluid" />
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Algorithms</p>
                                                                            <h3 class="title instructor-text">
                                                                                Algorithmic Thinking: Problem Solving Techniques
                                                                            </h3>
                                                                        </a>
                                                                    </div>

                                                                    <div class="student-counts-info d-flex align-items-center">
                                                                        <div class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg" alt="Img" />
                                                                            <p>420 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>₹399 <span>₹549.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>9hr 00min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img" src="assets/img/course/course-24.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html">
                                                                                <img src="assets/img/user/user7.jpg" alt="Img" class="img-fluid" />
                                                                            </a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Competitive Programming</p>
                                                                            <h3 class="title instructor-text">
                                                                                Coding Competitions: Strategies for Success
                                                                            </h3>
                                                                        </a>
                                                                    </div>

                                                                    <div class="student-counts-info d-flex align-items-center">
                                                                        <div class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg" alt="Img" />
                                                                            <p>380 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>₹450 <span>₹600.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>10hr 15min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                </div>

                                            </div>
                                        </div>
                                        {/* <!-- /All --> */}

                                        {/* <!-- Most popular --> */}
                                        <div class="tab-pane fade" id="mostpopulartab">
                                            <div class="all-course">
                                                <div class="row">

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-21.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user4.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build Creative
                                                                                Arts & media Course Completed</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>250 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$700 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-22.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user5.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-23.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user6.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Pyhton Development Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>Free </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-26.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user1.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>450 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-27.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user2.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Web Developer PHP Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>500 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-20.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user3.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Business Management Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-24.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user7.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">Build Websites
                                                                                with HTML5 CSS3 Javascript</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-25.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user8.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- /Most popular --> */}

                                        {/* <!-- Business --> */}
                                        <div class="tab-pane fade" id="businesstab">
                                            <div class="businesstab">
                                                <div class="row">

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-23.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user6.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Pyhton Development Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>Free </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-26.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user1.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>450 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-21.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user4.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build Creative
                                                                                Arts & media Course Completed</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>250 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$700 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-22.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user5.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-27.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user2.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Web Developer PHP Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>500 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-20.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user3.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Business Management Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-24.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user7.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">Build Websites
                                                                                with HTML5 CSS3 Javascript</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-25.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user8.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- /Business --> */}

                                        {/* <!-- Design --> */}
                                        <div class="tab-pane fade" id="designtab">
                                            <div class="designtab">
                                                <div class="row">

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-27.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user2.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Web Developer PHP Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>500 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-23.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user6.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Pyhton Development Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>Free </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-26.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user1.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>450 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-21.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user4.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build Creative
                                                                                Arts & media Course Completed</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>250 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$700 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-20.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user3.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Business Management Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-24.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user7.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">Build Websites
                                                                                with HTML5 CSS3 Javascript</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}



                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-22.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user5.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-25.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user8.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- /Design --> */}

                                        {/* <!-- Music --> */}
                                        <div class="tab-pane fade" id="musictab">
                                            <div class="music-label">
                                                <div class="row">

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-21.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user4.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build Creative
                                                                                Arts & media Course Completed</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>250 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$700 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-22.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user5.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-23.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user6.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Pyhton Development Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>Free </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-26.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user1.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>450 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-27.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user2.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Web Developer PHP Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>500 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-20.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user3.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Business Management Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-24.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user7.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">Build Websites
                                                                                with HTML5 CSS3 Javascript</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-25.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user8.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- /Music --> */}

                                        {/* <!-- Programmiing --> */}
                                        <div class="tab-pane fade" id="programmingtab">
                                            <div class="programmingtab">
                                                <div class="row">

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-23.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user6.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Pyhton Development Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>Free </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-26.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user1.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>450 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-21.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user4.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build Creative
                                                                                Arts & media Course Completed</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>250 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$700 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-22.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user5.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML CSS</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-27.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user2.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Web Developer PHP Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>500 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-20.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user3.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Business Management Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-24.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user7.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">Build Websites
                                                                                with HTML5 CSS3 Javascript</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-25.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user8.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML CSS</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- /Programmiing --> */}

                                        {/* <!-- Database --> */}
                                        <div class="tab-pane fade" id="databasetab">
                                            <div class="databasetab">
                                                <div class="row">

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-22.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user5.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML CSS</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-27.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user2.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Web Developer PHP Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>500 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-23.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user6.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Pyhton Development</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Pyhton Development Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>Free </h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-26.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user1.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Personalized Learning</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML CSS</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>450 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-21.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user4.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build Creative
                                                                                Arts & media Course Completed</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>250 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$700 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-20.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user3.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">The Complete
                                                                                Business Management Course</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-24.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user7.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Business Management</p>
                                                                            <h3 class="title instructor-text">Build Websites
                                                                                with HTML5 CSS3 Javascript</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$650 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                    {/* <!-- Col --> */}
                                                    <div class="col-xl-3 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                                        <div class="course-box-three">
                                                            <div class="course-three-item">
                                                                <div class="course-three-img">
                                                                    <a href="course-details.html">
                                                                        <img class="img-fluid" alt="Img"
                                                                            src="assets/img/course/course-25.jpg" />
                                                                    </a>
                                                                    <div class="heart-three">
                                                                        <a href="#"><i class="fa-regular fa-heart"></i></a>
                                                                    </div>
                                                                </div>
                                                                <div class="course-three-content">
                                                                    <div class="course-group-three">
                                                                        <div class="group-three-img">
                                                                            <a href="instructor-profile.html"><img
                                                                                src="assets/img/user/user8.jpg"
                                                                                alt="Img" class="img-fluid" /></a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="course-three-text">
                                                                        <a href="course-details.html">
                                                                            <p>Creative Arts & media</p>
                                                                            <h3 class="title instructor-text">Build
                                                                                Responsive Websites with HTML CSS</h3>
                                                                        </a>
                                                                    </div>

                                                                    <div
                                                                        class="student-counts-info d-flex align-items-center">
                                                                        <div
                                                                            class="students-three-counts d-flex align-items-center">
                                                                            <img src="assets/img/icon-three/student.svg"
                                                                                alt="Img" />
                                                                            <p>400 Students</p>
                                                                        </div>
                                                                    </div>

                                                                    <div
                                                                        class="price-three-group d-flex align-items-center justify-content-between">
                                                                        <div
                                                                            class="price-three-view d-flex align-items-center">
                                                                            <div class="course-price-three">
                                                                                <h3>$300 <span>$99.00</span></h3>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            class="price-three-time d-inline-flex align-items-center">
                                                                            <i class="fa-regular fa-clock me-2"></i>
                                                                            <span>6hr 30min</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <!-- /Col --> */}

                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- /Database --> */}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- /Courses --> */}

            {/* <!-- Call to Action --> */}
            <section class="px-56 home-three-transform">
                <div class="container" data-aos="fade-up">
                    <div class="row align-items-center">
                        <div class="col-lg-9 col-md-8 col-sm-12">
                            <div class="cta-content">
                                <h2>Transform Your Coding Journey</h2>
                                <p>
                                    Join Codexpress to unlock exclusive coding challenges, interactive tutorials, and personalized mentorship designed to elevate your tech career.
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-12">
                            <div class="transform-button-three">
                                <a href="register.html" class="btn btn-action">Join Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Call to Action --> */}
            {/* <!-- Achieve Your Goals --> */}
            <section class="px-56 home-three-goals">
                <div class="container">
                    <div class="row align-items-center">

                        {/* <!-- Col --> */}
                        <div class="col-xl-3 col-lg-12 col-md-12" data-aos="fade-down">
                            <div class="acheive-goals-main">
                                <h2>Achieve Your Goals with Codexpress</h2>
                            </div>
                        </div>
                        {/* <!-- /Col --> */}

                        {/* <!-- Col --> */}
                        <div class="col-xl-3 col-lg-4 col-md-4 col-12" data-aos="fade-down">
                            <div class="acheive-goals">
                                <div class="acheive-elips-one">
                                    <img src="assets/img/icon-three/ellipse-1.svg" alt="Img" />
                                </div>
                                <div class="acheive-goals-content text-center course-count ms-0">
                                    <h4><span class="counterUp">253,085</span></h4>
                                    <p>Codexpress Students Worldwide</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Col --> */}

                        {/* <!-- Col --> */}
                        <div class="col-xl-3 col-lg-4 col-md-4 col-12" data-aos="fade-down">
                            <div class="acheive-goals">
                                <div class="acheive-elips-two">
                                    <img src="assets/img/icon-three/ellipse-2.svg" alt="Img" />
                                </div>
                                <div class="acheive-goals-content text-center course-count ms-0">
                                    <h4><span class="counterUp">1,205</span></h4>
                                    <p>Innovative Coding Courses</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Col --> */}

                        {/* <!-- Col --> */}
                        <div class="col-xl-3 col-lg-4 col-md-4 col-12" data-aos="fade-down">
                            <div class="acheive-goals">
                                <div class="acheive-elips-three">
                                    <img src="assets/img/icon-three/ellipse-3.svg" alt="Img" />
                                </div>
                                <div class="acheive-goals-content text-center course-count ms-0">
                                    <h4><span class="counterUp">56</span></h4>
                                    <p>Countries & Global Reach</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Col --> */}

                    </div>
                </div>
            </section>
            {/* <!-- /Achieve Your Goals --> */}

            {/* <!-- Accelerate Cloud --> */}
            <section class="px-56 accelerate-cloud-three">
                <div class="container">
                    <div class="shapes-three-right">
                        <img class="accelerate-one" src="assets/img/bg/shape-1.png" alt="Decorative shape" />
                        <img class="accelerate-two" src="assets/img/bg/pattern-03.png" alt="Pattern design" />
                    </div>
                    <div class="shapes-three-left">
                        <img class="accelerate-three" src="assets/img/bg/pattern-02.png" alt="Pattern design" />
                        <img class="accelerate-four" src="assets/img/bg/shape-2.png" alt="Decorative shape" />
                        <img class="accelerate-five" src="assets/img/bg/pattern-04.png" alt="Pattern design" />
                    </div>
                    <div class="home-three-head section-header-title" data-aos="fade-up">
                        <div class="row align-items-center d-flex justify-content-between">
                            <div class="col-lg-6 col-md-12">
                                <div class="home-three-head">
                                    <h2 class="text-white">Accelerate Your Tech Career with Hands-On Training</h2>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <p class="accelerate-three-business text-white">
                                    96% of our learners report rapid skill advancement within six months. Whether you’re a startup team or a global enterprise, your journey to cloud fluency and coding mastery starts here.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Award Winning --> */}
                    <div class="award-one">
                        <div class="row align-items-center">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12" data-aos="fade-right">
                                <div class="award-three-images-one">
                                    <img class="img-fluid" src="assets/img/students/award-01.png" alt="Award badge" title="Award badge" />
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div class="award-three-content-one">
                                    <div class="award-list-info" data-aos="fade-up">
                                        <div class="award-win-icon">
                                            <img src="assets/img/icon-three/award.svg" alt="Award icon" />
                                        </div>
                                        <div class="award-list-content">
                                            <h2 class="text-white">Award-Winning Learning Platform</h2>
                                            <p class="text-white">
                                                Codexpress is recognized worldwide for its innovative course management and immersive learning experience. Our platform drives real-world results through expert-led, hands-on training.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="award-list d-flex align-items-center">
                                        <span class="award-icon">
                                            <img src="assets/img/icon-three/check-round-1.svg" alt="Check icon" class="img-fluid" />
                                        </span>
                                        <p class="text-white">Interactive modules & real-world projects</p>
                                    </div>
                                    <div class="award-list d-flex align-items-center">
                                        <span class="award-icon">
                                            <img src="assets/img/icon-three/check-round-1.svg" alt="Check icon" class="img-fluid" />
                                        </span>
                                        <p class="text-white">Expert mentorship and guidance</p>
                                    </div>
                                    <div class="award-list mb-0 d-flex align-items-center" data-aos="fade-up">
                                        <span class="award-icon">
                                            <img src="assets/img/icon-three/check-round-1.svg" alt="Check icon" class="img-fluid" />
                                        </span>
                                        <p class="text-white">Proven outcomes and accelerated growth</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Award Winning --> */}

                    {/* <!-- Learn Anything --> */}
                    <div class="learn-anything">
                        <div class="row align-items-center">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                <div class="award-three-content-two">
                                    <div class="award-list-info">
                                        <div class="award-win-icon">
                                            <img class="img-fluid" src="assets/img/icon-three/time.svg" alt="Time icon" />
                                        </div>
                                        <div class="award-list-content">
                                            <h2 class="text-white">Learn Anytime, Anywhere</h2>
                                            <p class="text-white">
                                                With Codexpress, access an extensive library of coding tutorials, cloud labs, and live sessions on-demand. Learn at your pace—anytime and from any device.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="award-list d-flex align-items-center">
                                        <span class="award-icon">
                                            <img src="assets/img/icon-three/check-round-2.svg" alt="Check icon" class="img-fluid" />
                                        </span>
                                        <p class="text-white">On-demand video tutorials</p>
                                    </div>
                                    <div class="award-list d-flex align-items-center">
                                        <span class="award-icon">
                                            <img src="assets/img/icon-three/check-round-2.svg" alt="Check icon" class="img-fluid" />
                                        </span>
                                        <p class="text-white">24/7 access to interactive labs</p>
                                    </div>
                                    <div class="award-list d-flex align-items-center">
                                        <span class="award-icon">
                                            <img src="assets/img/icon-three/check-round-2.svg" alt="Check icon" class="img-fluid" />
                                        </span>
                                        <p class="text-white">Connect with experts worldwide</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-12" data-aos="fade-right">
                                <div class="award-three-images-two">
                                    <img class="img-fluid" src="assets/img/students/learn-anything.png" alt="Flexible learning" title="Flexible learning" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Learn Anything --> */}

                    {/* <!-- Development Career --> */}
                    <div class="development-carrer">
                        <div class="row align-items-center">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-12" data-aos="fade-right">
                                <div class="award-three-images-three">
                                    <img class="img-fluid" src="assets/img/students/certification.png" alt="Certification badge" title="Certification badge" />
                                </div>
                            </div>

                            <div class="col-xl-6 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                <div class="award-three-content-one">
                                    <div class="award-list-info">
                                        <div class="award-win-icon">
                                            <img class="img-fluid" src="assets/img/icon-three/winning.svg" alt="Winning icon" />
                                        </div>
                                        <div class="award-list-content">
                                            <h2 class="text-white">Certification to Propel Your Tech Career</h2>
                                            <p class="text-white">
                                                Earn industry-recognized certifications that validate your skills and boost your professional profile. Our practical, hands-on courses are designed to give you the competitive edge in today’s tech landscape.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="award-list d-flex align-items-center">
                                        <span class="award-icon">
                                            <img src="assets/img/icon-three/check-round-3.svg" alt="Check icon" class="img-fluid" />
                                        </span>
                                        <p class="text-white">Globally recognized certification programs</p>
                                    </div>
                                    <div class="award-list d-flex align-items-center">
                                        <span class="award-icon">
                                            <img src="assets/img/icon-three/check-round-3.svg" alt="Check icon" class="img-fluid" />
                                        </span>
                                        <p class="text-white">Practical projects & expert mentorship</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Development Career --> */}

                </div>
            </section>


            {/* <!-- Become An Instructor --> */}
            <section class="px-56 home-three-become">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-8 col-md-8" data-aos="fade-up">
                            <div class="become-content-three">
                                <h2>Become An Instructor</h2>
                                <p>Top instructors from around the world teach millions of students on DreamsLMS.</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4" data-aos="fade-up">
                            <div class="become-button-three">
                                <a href="register.html" class="btn btn-become">Get Started Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- /Become An Instructor --> */}

            {/* <!-- Leading Companies --> */}
            {/* <section class="px-56 lead-companies-three">
                <div class="container">
                    <div class="home-three-head section-header-title aos-init aos-animate">
                        <div class="row align-items-center d-flex justify-content-between">
                            <div class="col-lg-12" data-aos="fade-up">
                                <h2>500+ Leading Universities And Companies</h2>
                            </div>
                        </div>
                    </div>
                    <div class="m-0 p-0 lead-group aos" data-aos="fade-up">
                        <div class="lead-group-slider owl-carousel owl-theme">
                            <div class="item">
                                <div class="lead-img">
                                    <img class="img-fluid" alt="Img" src="assets/img/lead-01.png" />
                                </div>
                            </div>
                            <div class="item">
                                <div class="lead-img">
                                    <img class="img-fluid" alt="Img" src="assets/img/lead-02.png" />
                                </div>
                            </div>
                            <div class="item">
                                <div class="lead-img">
                                    <img class="img-fluid" alt="Img" src="assets/img/lead-03.png" />
                                </div>
                            </div>
                            <div class="item">
                                <div class="lead-img">
                                    <img class="img-fluid" alt="Img" src="assets/img/lead-04.png" />
                                </div>
                            </div>
                            <div class="item">
                                <div class="lead-img">
                                    <img class="img-fluid" alt="Img" src="assets/img/lead-05.png" />
                                </div>
                            </div>
                            <div class="item">
                                <div class="lead-img">
                                    <img class="img-fluid" alt="Img" src="assets/img/lead-06.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <!-- /Leading Companies --> */}

            {/* <!-- Testimonial --> */}
            {/* <section class="px-56 testimonial-three">
                <div class="container">
                    <div class="testimonial-pattern">
                        <img class="pattern-left img-fluid" alt="Img" src="assets/img/bg/pattern-05.svg" />
                        <img class="pattern-right img-fluid" alt="Img" src="assets/img/bg/pattern-06.svg" />
                    </div>
                    <div class="testimonial-three-content">
                        <div class="row align-items-center">
                            <div class="col-xl-6 col-lg-12 col-md-12" data-aos="fade-down">
                                <div class="become-content">
                                    <h2 class="aos-init aos-animate">They Trusted us</h2>
                                    <h4 class="aos-init aos-animate">We are a very happy because we have a happy customer
                                    </h4>
                                </div>

                                <!-- View all Testimonail -->
                                <a href="instructor-profile.html" class="btn btn-action aos-init aos-animate"
                                    data-aos="fade-up">View all Testimonail</a>
                                <!-- View all Testimonail -->

                            </div>
                            <div class="col-xl-6 col-lg-12 col-md-12" data-aos="fade-down">
                                <div class="swiper-testimonial-three">
                                    <div class="swiper-wrapper">

                                        <!-- Swiper Slide -->
                                        <div class="swiper-slide">
                                            <div class="testimonial-item-five">
                                                <div class="testimonial-quote">
                                                    <img class="quote img-fluid" alt="Img" src="assets/img/bg/quote.svg" />
                                                </div>
                                                <div class="testimonial-content">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
                                                        pretium feugiat tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat sit dolor. Vitae donec
                                                        porttitor risus tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat </p>
                                                </div>
                                                <div class="testimonial-ratings">
                                                    <div class="rating">
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star"></i>
                                                        <p class="d-inline-block">4.5<span>ratings</span></p>
                                                    </div>
                                                </div>
                                                <div class="testimonial-users">
                                                    <div class="imgbx">
                                                        <img class="img-fluid" alt="Img"
                                                            src="assets/img/profiles/avatar-02.jpg" />
                                                    </div>
                                                    <div class="d-block">
                                                        <h6>Jeff J. Sparrow</h6>
                                                        <p>Designer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /Swiper Slide -->

                                        <!-- Swiper Slide -->
                                        <div class="swiper-slide">
                                            <div class="testimonial-item-five">
                                                <div class="testimonial-quote">
                                                    <img class="quote img-fluid" alt="Img" src="assets/img/bg/quote.svg" />
                                                </div>
                                                <div class="testimonial-content">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
                                                        pretium feugiat tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat sit dolor. Vitae donec
                                                        porttitor risus tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat </p>
                                                </div>
                                                <div class="testimonial-ratings">
                                                    <div class="rating">
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star"></i>
                                                        <p class="d-inline-block">4.5<span>ratings</span></p>
                                                    </div>
                                                </div>
                                                <div class="testimonial-users">
                                                    <div class="imgbx">
                                                        <img class="" alt="Img" src="assets/img/profiles/avatar-01.jpg" />
                                                    </div>
                                                    <div class="d-block">
                                                        <h6>Martin Harn</h6>
                                                        <p>Docker Development</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /Swiper Slide -->

                                        <!-- Swiper Slide -->
                                        <div class="swiper-slide">
                                            <div class="testimonial-item-five">
                                                <div class="testimonial-quote">
                                                    <img class="quote img-fluid" alt="Img" src="assets/img/bg/quote.svg" />
                                                </div>
                                                <div class="testimonial-content">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
                                                        pretium feugiat tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat sit dolor. Vitae donec
                                                        porttitor risus tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat </p>
                                                </div>
                                                <div class="testimonial-ratings">
                                                    <div class="rating">
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star filled"></i>
                                                        <i class="fas fa-star"></i>
                                                        <p class="d-inline-block">4.8<span>ratings</span></p>
                                                    </div>
                                                </div>
                                                <div class="testimonial-users">
                                                    <div class="imgbx">
                                                        <img class="" alt="Img" src="assets/img/profiles/avatar-05.jpg" />
                                                    </div>
                                                    <div class="d-block">
                                                        <h6>Noah Aarons</h6>
                                                        <p>Business Man</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /Swiper Slide -->


                                    </div>
                                    <div class="testimonial-bottom-nav">
                                        <div class="slide-next-btn testimonial-next-pre"><i class="fas fa-arrow-left"></i>
                                        </div>
                                        <div class="slide-prev-btn testimonial-next-pre"><i class="fas fa-arrow-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <!--/Testimonial --> */}

            {/* <!-- Latest Blog --> */}
            <section class="px-56 latest-blog-three">
                <div class="container">
                    <div class="home-three-head section-header-title" data-aos="fade-up">
                        <div class="row align-items-center d-flex justify-content-between">
                            <div class="col-lg-6 col-md-8">
                                <h2>Latest news & Events</h2>
                            </div>
                            <div class="col-lg-6 col-md-4">
                                <div class="see-all">
                                    <a href="blog-list.html">See all<span class="see-all-icon"><i
                                        class="fas fa-arrow-right"></i></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="latest-blog-main">
                        <div class="row">
                            <div class="col-xl-6 col-lg-12 col-md-12">
                                <div class="row">
                                    <div class="col-md-12" data-aos="fade-down">
                                        <div class="event-blog-three blog-three-one">
                                            <div class="blog-img-three">
                                                <a href="blog-list.html">
                                                    <img class="img-fluid" alt="Img" src="assets/img/blog/blog-20.jpg" />
                                                </a>
                                            </div>
                                            <div class="latest-blog-content">
                                                <div class="event-three-title">
                                                    <div class="event-span-three">
                                                        <span class="span-name-three badge-green">Sales</span>
                                                    </div>
                                                    <a href="blog-list.html">
                                                        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                                                            aenean accumsan bibendum gravida..Lorem ipsum dolor sit amet,
                                                        </p>
                                                    </a>
                                                    <div class="blog-student-count">
                                                        <i class="fa-solid fa-calendar-days"></i>
                                                        <span>Jun 15, 2024</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12" data-aos="fade-down">
                                        <div class="event-blog-three blog-three-two">
                                            <div class="blog-img-three">
                                                <a href="blog-list.html">
                                                    <img class="img-fluid" alt="Img" src="assets/img/blog/blog-21.jpg" />
                                                </a>
                                            </div>
                                            <div class="latest-blog-content">
                                                <div class="event-three-title">
                                                    <div class="event-span-three">
                                                        <span class="span-name-three badge-info">Sales</span>
                                                    </div>
                                                    <a href="blog-list.html">
                                                        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                                                            aenean accumsan bibendum gravida..Lorem ipsum dolor sit amet,
                                                        </p>
                                                    </a>
                                                    <div class="blog-student-count">
                                                        <i class="fa-solid fa-calendar-days"></i>
                                                        <span>Jun 15, 2024</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-12 col-md-12">
                                <div class="row">
                                    <div class="col-md-12" data-aos="fade-down">
                                        <div class="event-blog-three blog-three-three">
                                            <div class="blog-img-three">
                                                <a href="blog-list.html">
                                                    <img class="img-fluid" alt="Img" src="assets/img/blog/blog-22.jpg" />
                                                </a>
                                            </div>
                                            <div class="latest-blog-content">
                                                <div class="event-three-title">
                                                    <div class="event-span-three">
                                                        <span class="span-name-three badge-info">Sales</span>
                                                    </div>
                                                    <a href="blog-list.html">
                                                        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                                                            aenean accumsan bibendum gravida..Lorem ipsum dolor sit amet,
                                                        </p>
                                                    </a>
                                                    <div class="blog-student-count">
                                                        <i class="fa-solid fa-calendar-days"></i>
                                                        <span>Jun 15, 2024</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12" data-aos="fade-down">
                                        <div class="event-blog-three blog-three-four">
                                            <div class="blog-img-three">
                                                <a href="blog-list.html">
                                                    <img class="img-fluid" alt="Img" src="assets/img/blog/blog-23.jpg" />
                                                </a>
                                            </div>
                                            <div class="latest-blog-content">
                                                <div class="event-three-title">
                                                    <div class="event-span-three">
                                                        <span class="span-name-three badge-info">Sales</span>
                                                    </div>
                                                    <a href="blog-list.html">
                                                        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                                                            aenean accumsan bibendum gravida..Lorem ipsum dolor sit amet,
                                                        </p>
                                                    </a>
                                                    <div class="blog-student-count">
                                                        <i class="fa-solid fa-calendar-days"></i>
                                                        <span>Jun 15, 2024</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12" data-aos="fade-down">
                                        <div class="event-blog-three blog-three-five">
                                            <div class="blog-img-three">
                                                <a href="blog-list.html">
                                                    <img class="img-fluid" alt="Img" src="assets/img/blog/blog-24.jpg" />
                                                </a>
                                            </div>
                                            <div class="latest-blog-content">
                                                <div class="event-three-title">
                                                    <div class="event-span-three">
                                                        <span class="span-name-three badge-yellow">Sales</span>
                                                    </div>
                                                    <a href="blog-list.html">
                                                        <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h5>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                                                            aenean accumsan bibendum gravida..Lorem ipsum dolor sit amet,
                                                        </p>
                                                    </a>
                                                    <div class="blog-student-count">
                                                        <i class="fa-solid fa-calendar-days"></i>
                                                        <span>Jun 15, 2024</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- /Latest Blog --> */}



            {/* <!-- Footer --> */}
            <footer className="px-56 footer footer-three">

                {/* <!-- Footer Top --> */}
                <div className="footer-three-top" data-aos="fade-up">
                    <div className="container">
                        <div className="footer-three-top-content">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-6 col-12">

                                    {/* <!-- Footer Widget --> */}
                                    <div className="footer-widget-three footer-about">
                                        <div className="footer-three-logo">
                                            <Link to="/">
                                                <img src={logo} alt="Logo" className="h-28" />
                                            </Link>                        </div>
                                        <div className="footer-three-about">
                                            <p>Welcome to Code Express! Learn to code and develop your skills with our online coding courses. From Java and Python to full-stack development, we've got you covered!</p>
                                        </div>
                                        <div className="newsletter-title">
                                            <h6>Get Updates</h6>
                                        </div>
                                        <div className="box-form-newsletter">
                                            <form className="form-newsletter">
                                                <input className="input-newsletter" type="text" placeholder="Enter your email here" />
                                                <button className="btn btn-default font-heading icon-send-letter">Subscribe Now</button>
                                            </form>
                                        </div>
                                    </div>
                                    {/* <!-- /Footer Widget --> */}

                                </div>

                                <div className="col-lg-3 col-md-3 col-12">

                                    {/* <!-- Footer Widget --> */}
                                    <div className="footer-widget-three footer-menu-three footer-three-right">
                                        <h6 className="footer-three-title">For Student</h6>
                                        <ul>
                                            <li><Link to="/student-profile">My Profile</Link></li>
                                            <li><Link to="/register">Register</Link></li>
                                            <li><Link to="/login">Login</Link></li>
                                            <li><Link to="/courses">Browse Courses</Link></li>
                                            <li><Link to="/faq">FAQ</Link></li>
                                        </ul>
                                    </div>
                                    {/* <!-- /Footer Widget --> */}
        
                                </div>

                                <div className="col-lg-3 col-md-3 col-12">

                                    {/* <!-- Footer Widget --> */}
                                    <div className="footer-widget-three footer-menu-three">
                                        <h6 className="footer-three-title">For Instructor</h6>
                                        <ul>
                                            <li><Link to="/instructor-profile">My Profile</Link></li>
                                            <li><Link to="/instructor-dashboard">Instructor Dashboard</Link></li>
                                            <li><Link to="/instructor-register">Register as Instructor</Link></li>
                                            <li><Link to="/instructor-login">Instructor Login</Link></li>
                                            <li><Link to="/courses">Manage Courses</Link></li>
                                        </ul>
                                    </div>
                                    {/* <!-- /Footer Widget --> */}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- /Footer Top --> */}

                {/* <!-- Footer Bottom --> */}
                <div className="footer-three-bottom" data-aos="fade-up">
                    <div className="container">

                        {/* <!-- Copyright --> */}
                        <div className="copyright-three">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="social-icon-three">
                                        <h6>Connect Socially</h6>
                                        <ul>
                                            <li>
                                                <a href="#" target="_blank" className="feather-facebook-icon">
                                                    <i className="feather-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" target="_blank" className="feather-twitter-icon">
                                                    <i className="feather-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" target="_blank" className="feather-linkedin-icon">
                                                    <i className="feather-linkedin"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" target="_blank" className="feather-youtube-icon">
                                                    <i className="feather-youtube"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="privacy-policy-three">
                                        <ul>
                                            <li><Link to="/terms-condition">Terms & Conditions</Link></li>
                                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                            <li><Link to="/support">Support</Link></li>
                                        </ul>
                                    </div>
                                    <div className="copyright-text-three">
                                        <p className="mb-0">&copy; 2024 Code Express. All rights reserved.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Copyright --> */}

                    </div>
                </div>
                {/* <!-- /Footer Bottom --> */}

            </footer>
            {/* <!-- /Footer --> */}



        </div>
    )
}

export default HomeTwo