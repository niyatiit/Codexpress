import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-white.png'
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner'; // Import the loader

// import Header from '../components/Header';
// import object from '../../public/assets/img/object.png'
const HomeTwo = () => {
    const [topCourses, setTopCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        // Fetch data from the backend
        const fetchTopCourses = async () => {
            try {
                const response = await axios.get(`${url}/courses`);
                const courses = response.data.courses;

                // Sort courses by rating (descending order)
                const sortedCourses = courses.sort((a, b) => b.rating - a.rating);

                // Get top 5 courses
                const top5Courses = sortedCourses.slice(0, 4);
                setTopCourses(top5Courses);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopCourses();
    }, []);
    if (loading) {
        return (
            <div className="flex justify-center flex-col items-center h-screen">
                <Hourglass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    className=""
                    colors={['#306cce', '#72a1ed']}
                />
                        <p className="mt-4 text-gray-600 text-lg font-medium">Loading...</p>

            </div>
        );
    }
    return (

        // <!-- Main Wrapper -->
        <div className="main-wrapper">



            <Header />
            {/* <!-- /Header --> */}

            {/* <!-- Home Banner --> */}
            <section className="px-56 home-three-slide d-flex align-items-center">
                <div className="container">
                    <div className="row ">
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

                        <div className="col-xl-6 col-lg-4 col-md-6 col-12" data-aos="fade-up">
                            <div className="girl-slide-img aos">
                                <img className="img-fluid" src="assets/img/slider/home-slider.png" alt="Img" />
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
            <section className="px-56 master-skill-three">
                <div className="master-three-vector">
                    <img className="ellipse-right img-fluid" src="assets/img/bg/pattern-01.png" alt="Img" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12" data-aos="fade-right">
                            <div className="master-three-images">
                                <div className="master-three-left">
                                    <img className="img-fluid" src="assets/img/students/career.png" alt="image-banner"
                                        title="image-banner" />
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-12" data-aos="fade-left">
                            <div className="home-three-head" data-aos="fade-up">
                                <h2>Master the skills to drive your career</h2>
                            </div>
                            <div className="home-three-content" data-aos="fade-up">
                                <p>Get certified, master modern tech skills, and level up your career whether you’re
                                    starting out or a seasoned pro. 95% of eLearning learners report our hands-on content
                                    directly helped their careers.</p>
                            </div>
                            <div className="skils-group">
                                <div className="row">
                                    <div className="col-lg-6 col-xs-12 col-sm-6" data-aos="fade-down">
                                        <div className="skils-icon-item">
                                            <div className="skils-icon">
                                                <img className="img-fluid" src="assets/img/icon-three/career-01.svg"
                                                    alt="certified" />
                                            </div>
                                            <div className="skils-content">
                                                <p className="mb-0">Get certified with 100+ certification courses</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-xs-12 col-sm-6" data-aos="fade-up">
                                        <div className="skils-icon-item">
                                            <div className="skils-icon">
                                                <img className="img-fluid" src="assets/img/icon-three/career-02.svg"
                                                    alt="Build skills" />
                                            </div>
                                            <div className="skils-content">
                                                <p className="mb-0">Build skills your way, from labs to courses</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-xs-12 col-sm-6" data-aos="fade-right">
                                        <div className="skils-icon-item">
                                            <div className="skils-icon">
                                                <img className="img-fluid" src="assets/img/icon-three/career-03.svg"
                                                    alt="Stay Motivated" />
                                            </div>
                                            <div className="skils-content">
                                                <p className="mb-0">Stay motivated with engaging instructors</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-xs-12 col-sm-6" data-aos="fade-left">
                                        <div className="skils-icon-item">
                                            <div className="skils-icon">
                                                <img className="img-fluid" src="assets/img/icon-three/career-04.svg"
                                                    alt="latest cloud" />
                                            </div>
                                            <div className="skils-content">
                                                <p className="mb-0">Keep up with the latest in cloud</p>
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
            <section className="px-56 home-three-courses">
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-24">
                                <h1 className="text-2xl font-semibold text-center py-3">Top Rated Courses</h1>
                            </div>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="alltab" role="tabpanel">
                                    <div className="all-course">
                                        <div className="row">
                                            {Array.isArray(topCourses) &&
                                                topCourses.map((course) => (
                                                    <div
                                                        className="col-xl-3 col-lg-6 col-md-6 col-12"
                                                        key={course._id}
                                                        data-aos="fade-up"
                                                    >
                                                        <div
                                                            className="course-box-three "
                                                            style={{ height: '460px', width: '100%' }}
                                                        >
                                                            <div className="course-three-item h-100">
                                                                {/* Course Image */}
                                                                <div
                                                                    className="course-three-img bg-blue-500 overflow-hidden"
                                                                    style={{ height: '170px' }}
                                                                >
                                                                    <Link to={`/courses/${course._id}`}>
                                                                        <img
                                                                            className="w-[300px] h-[200px] object-cover"
                                                                            alt={course.name}
                                                                            src={course.thumbnail}
                                                                        />
                                                                    </Link>
                                                                </div>

                                                                {/* Course Content */}
                                                                <div className="course-three-content overflow-y-hidden m-0 p-4 pt-0 h-[calc(100%-200px)] flex flex-col justify-between overflow-y-auto">
                                                                    <div>
                                                                        {/* Course Category and Name */}
                                                                        <div className="course-three-text">
                                                                            <Link to={`/courses/${course._id}`}>
                                                                                <p className="px-3 rounded-xl mb-3">{course.category}</p>
                                                                                <h3 className="title instructor-text">{course.name}</h3>
                                                                            </Link>
                                                                        </div>

                                                                        {/* Price and Duration */}
                                                                        <div className="price-three-group d-flex align-items-center justify-content-between">
                                                                            <div className="price-three-view d-flex align-items-center">
                                                                                <div className="course-price-three">
                                                                                    <h3>
                                                                                        ₹{course.price - course.price * (course.discount / 100)}{' '}
                                                                                        <span>₹{course.price}</span>
                                                                                    </h3>
                                                                                </div>
                                                                            </div>
                                                                            <div className="price-three-time d-inline-flex align-items-center">
                                                                                <i className="fa-regular fa-clock me-2"></i>
                                                                                <span>{course.duration}</span>
                                                                            </div>
                                                                        </div>

                                                                        {/* Rating */}
                                                                        <div className="student-counts-info d-flex align-items-center justify-between m-0 mt-3">
                                                                            {/* <div className="students-three-counts d-flex align-items-center">
                                                                                <img
                                                                                    src="assets/img/icon-three/student.svg"
                                                                                    alt="Img"
                                                                                />
                                                                                <p>{course.total_students_enrolled}</p>
                                                                            </div> */}
                                                                            <div className="student-counts-info d-flex align-items-center mt-0">
                                                                                <p>{course.rating} ⭐ </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Enroll Button */}
                                                                    <div className="mt-auto">
                                                                        {course.status === "Upcoming" ? (
                                                                            <button className="border-2 border-blue-500 w-full bg-blue-100 text-blue-500 px-4 py-2 rounded-lg">
                                                                                Upcoming
                                                                            </button>
                                                                        ) : (
                                                                            <Link
                                                                                to={`/courses/${course._id}`}
                                                                                className="mybtn w-full bg-blue-500 text-white p-2 rounded-lg text-center block"
                                                                            >
                                                                                Enroll
                                                                            </Link>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- /Courses --> */}

            {/* <!-- Call to Action --> */}
            <section className="px-56 home-three-transform">
                <div className="container" data-aos="fade-up">
                    <div className="row align-items-center">
                        <div className="col-lg-9 col-md-8 col-sm-12">
                            <div className="cta-content">
                                <h2>Transform Your Coding Journey</h2>
                                <p>
                                    Join Codexpress to unlock exclusive coding challenges, interactive tutorials, and personalized mentorship designed to elevate your tech career.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-12">
                            <div className="transform-button-three">
                                <Link to="/register" className="btn btn-action">Join Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Call to Action --> */}
            {/* <!-- Achieve Your Goals --> */}
            <section className="px-56 home-three-goals">
                <div className="container">
                    <div className="row align-items-center">

                        {/* <!-- Col --> */}
                        <div className="col-xl-3 col-lg-12 col-md-12" data-aos="fade-down">
                            <div className="acheive-goals-main">
                                <h2>Achieve Your Goals with Codexpress</h2>
                            </div>
                        </div>
                        {/* <!-- /Col --> */}

                        {/* <!-- Col --> */}
                        <div className="col-xl-3 col-lg-4 col-md-4 col-12" data-aos="fade-down">
                            <div className="acheive-goals">
                                <div className="acheive-elips-one">
                                    <img src="assets/img/icon-three/ellipse-1.svg" alt="Img" />
                                </div>
                                <div className="acheive-goals-content text-center course-count ms-0">
                                    <h4><span className="counterUp">253,085</span></h4>
                                    <p>Codexpress Students Worldwide</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Col --> */}

                        {/* <!-- Col --> */}
                        <div className="col-xl-3 col-lg-4 col-md-4 col-12" data-aos="fade-down">
                            <div className="acheive-goals">
                                <div className="acheive-elips-two">
                                    <img src="assets/img/icon-three/ellipse-2.svg" alt="Img" />
                                </div>
                                <div className="acheive-goals-content text-center course-count ms-0">
                                    <h4><span className="counterUp">1,205</span></h4>
                                    <p>Innovative Coding Courses</p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- /Col --> */}

                        {/* <!-- Col --> */}
                        <div className="col-xl-3 col-lg-4 col-md-4 col-12" data-aos="fade-down">
                            <div className="acheive-goals">
                                <div className="acheive-elips-three">
                                    <img src="assets/img/icon-three/ellipse-3.svg" alt="Img" />
                                </div>
                                <div className="acheive-goals-content text-center course-count ms-0">
                                    <h4><span className="counterUp">56</span></h4>
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
            <section className="px-56 accelerate-cloud-three">
                <div className="container">
                    <div className="shapes-three-right">
                        <img className="accelerate-one" src="assets/img/bg/shape-1.png" alt="Decorative shape" />
                        <img className="accelerate-two" src="assets/img/bg/pattern-03.png" alt="Pattern design" />
                    </div>
                    <div className="shapes-three-left">
                        <img className="accelerate-three" src="assets/img/bg/pattern-02.png" alt="Pattern design" />
                        <img className="accelerate-four" src="assets/img/bg/shape-2.png" alt="Decorative shape" />
                        <img className="accelerate-five" src="assets/img/bg/pattern-04.png" alt="Pattern design" />
                    </div>
                    <div className="home-three-head section-header-title" data-aos="fade-up">
                        <div className="row align-items-center d-flex justify-content-between">
                            <div className="col-lg-6 col-md-12">
                                <div className="home-three-head">
                                    <h2 className="text-white">Accelerate Your Tech Career with Hands-On Training</h2>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <p className="accelerate-three-business text-white">
                                    96% of our learners report rapid skill advancement within six months. Whether you’re a startup team or a global enterprise, your journey to cloud fluency and coding mastery starts here.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Award Winning --> */}
                    <div className="award-one">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12" data-aos="fade-right">
                                <div className="award-three-images-one">
                                    <img className="img-fluid" src="assets/img/students/award-01.png" alt="Award badge" title="Award badge" />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="award-three-content-one">
                                    <div className="award-list-info" data-aos="fade-up">
                                        <div className="award-win-icon">
                                            <img src="assets/img/icon-three/award.svg" alt="Award icon" />
                                        </div>
                                        <div className="award-list-content">
                                            <h2 className="text-white">Award-Winning Learning Platform</h2>
                                            <p className="text-white">
                                                Codexpress is recognized worldwide for its innovative course management and immersive learning experience. Our platform drives real-world results through expert-led, hands-on training.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="award-list d-flex align-items-center">
                                        <span className="award-icon">
                                            <img src="assets/img/icon-three/check-round-1.svg" alt="Check icon" className="img-fluid" />
                                        </span>
                                        <p className="text-white">Interactive modules & real-world projects</p>
                                    </div>
                                    <div className="award-list d-flex align-items-center">
                                        <span className="award-icon">
                                            <img src="assets/img/icon-three/check-round-1.svg" alt="Check icon" className="img-fluid" />
                                        </span>
                                        <p className="text-white">Expert mentorship and guidance</p>
                                    </div>
                                    <div className="award-list mb-0 d-flex align-items-center" data-aos="fade-up">
                                        <span className="award-icon">
                                            <img src="assets/img/icon-three/check-round-1.svg" alt="Check icon" className="img-fluid" />
                                        </span>
                                        <p className="text-white">Proven outcomes and accelerated growth</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Award Winning --> */}

                    {/* <!-- Learn Anything --> */}
                    <div className="learn-anything">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                <div className="award-three-content-two">
                                    <div className="award-list-info">
                                        <div className="award-win-icon">
                                            <img className="img-fluid" src="assets/img/icon-three/time.svg" alt="Time icon" />
                                        </div>
                                        <div className="award-list-content">
                                            <h2 className="text-white">Learn Anytime, Anywhere</h2>
                                            <p className="text-white">
                                                With Codexpress, access an extensive library of coding tutorials, cloud labs, and live sessions on-demand. Learn at your pace—anytime and from any device.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="award-list d-flex align-items-center">
                                        <span className="award-icon">
                                            <img src="assets/img/icon-three/check-round-2.svg" alt="Check icon" className="img-fluid" />
                                        </span>
                                        <p className="text-white">On-demand video tutorials</p>
                                    </div>
                                    <div className="award-list d-flex align-items-center">
                                        <span className="award-icon">
                                            <img src="assets/img/icon-three/check-round-2.svg" alt="Check icon" className="img-fluid" />
                                        </span>
                                        <p className="text-white">24/7 access to interactive labs</p>
                                    </div>
                                    <div className="award-list d-flex align-items-center">
                                        <span className="award-icon">
                                            <img src="assets/img/icon-three/check-round-2.svg" alt="Check icon" className="img-fluid" />
                                        </span>
                                        <p className="text-white">Connect with experts worldwide</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12" data-aos="fade-right">
                                <div className="award-three-images-two">
                                    <img className="img-fluid" src="assets/img/students/learn-anything.png" alt="Flexible learning" title="Flexible learning" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Learn Anything --> */}

                    {/* <!-- Development Career --> */}
                    <div className="development-carrer">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12" data-aos="fade-right">
                                <div className="award-three-images-three">
                                    <img className="img-fluid" src="assets/img/students/certification.png" alt="Certification badge" title="Certification badge" />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12" data-aos="fade-up">
                                <div className="award-three-content-one">
                                    <div className="award-list-info">
                                        <div className="award-win-icon">
                                            <img className="img-fluid" src="assets/img/icon-three/winning.svg" alt="Winning icon" />
                                        </div>
                                        <div className="award-list-content">
                                            <h2 className="text-white">Certification to Propel Your Tech Career</h2>
                                            <p className="text-white">
                                                Earn industry-recognized certifications that validate your skills and boost your professional profile. Our practical, hands-on courses are designed to give you the competitive edge in today’s tech landscape.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="award-list d-flex align-items-center">
                                        <span className="award-icon">
                                            <img src="assets/img/icon-three/check-round-3.svg" alt="Check icon" className="img-fluid" />
                                        </span>
                                        <p className="text-white">Globally recognized certification programs</p>
                                    </div>
                                    <div className="award-list d-flex align-items-center">
                                        <span className="award-icon">
                                            <img src="assets/img/icon-three/check-round-3.svg" alt="Check icon" className="img-fluid" />
                                        </span>
                                        <p className="text-white">Practical projects & expert mentorship</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Development Career --> */}

                </div>
            </section>



            {/* <!-- Leading Companies --> */}
            {/* <section className="px-56 lead-companies-three">
                <div className="container">
                    <div className="home-three-head section-header-title aos-init aos-animate">
                        <div className="row align-items-center d-flex justify-content-between">
                            <div className="col-lg-12" data-aos="fade-up">
                                <h2>500+ Leading Universities And Companies</h2>
                            </div>
                        </div>
                    </div>
                    <div className="m-0 p-0 lead-group aos" data-aos="fade-up">
                        <div className="lead-group-slider owl-carousel owl-theme">
                            <div className="item">
                                <div className="lead-img">
                                    <img className="img-fluid" alt="Img" src="assets/img/lead-01.png" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="lead-img">
                                    <img className="img-fluid" alt="Img" src="assets/img/lead-02.png" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="lead-img">
                                    <img className="img-fluid" alt="Img" src="assets/img/lead-03.png" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="lead-img">
                                    <img className="img-fluid" alt="Img" src="assets/img/lead-04.png" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="lead-img">
                                    <img className="img-fluid" alt="Img" src="assets/img/lead-05.png" />
                                </div>
                            </div>
                            <div className="item">
                                <div className="lead-img">
                                    <img className="img-fluid" alt="Img" src="assets/img/lead-06.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <!-- /Leading Companies --> */}

            {/* <!-- Testimonial --> */}
            {/* <section className="px-56 testimonial-three">
                <div className="container">
                    <div className="testimonial-pattern">
                        <img className="pattern-left img-fluid" alt="Img" src="assets/img/bg/pattern-05.svg" />
                        <img className="pattern-right img-fluid" alt="Img" src="assets/img/bg/pattern-06.svg" />
                    </div>
                    <div className="testimonial-three-content">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-12 col-md-12" data-aos="fade-down">
                                <div className="become-content">
                                    <h2 className="aos-init aos-animate">They Trusted us</h2>
                                    <h4 className="aos-init aos-animate">We are a very happy because we have a happy customer
                                    </h4>
                                </div>

                                <!-- View all Testimonail -->
                                <a href="instructor-profile.html" className="btn btn-action aos-init aos-animate"
                                    data-aos="fade-up">View all Testimonail</a>
                                <!-- View all Testimonail -->

                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-12" data-aos="fade-down">
                                <div className="swiper-testimonial-three">
                                    <div className="swiper-wrapper">

                                        <!-- Swiper Slide -->
                                        <div className="swiper-slide">
                                            <div className="testimonial-item-five">
                                                <div className="testimonial-quote">
                                                    <img className="quote img-fluid" alt="Img" src="assets/img/bg/quote.svg" />
                                                </div>
                                                <div className="testimonial-content">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
                                                        pretium feugiat tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat sit dolor. Vitae donec
                                                        porttitor risus tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat </p>
                                                </div>
                                                <div className="testimonial-ratings">
                                                    <div className="rating">
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star"></i>
                                                        <p className="d-inline-block">4.5<span>ratings</span></p>
                                                    </div>
                                                </div>
                                                <div className="testimonial-users">
                                                    <div className="imgbx">
                                                        <img className="img-fluid" alt="Img"
                                                            src="assets/img/profiles/avatar-02.jpg" />
                                                    </div>
                                                    <div className="d-block">
                                                        <h6>Jeff J. Sparrow</h6>
                                                        <p>Designer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /Swiper Slide -->

                                        <!-- Swiper Slide -->
                                        <div className="swiper-slide">
                                            <div className="testimonial-item-five">
                                                <div className="testimonial-quote">
                                                    <img className="quote img-fluid" alt="Img" src="assets/img/bg/quote.svg" />
                                                </div>
                                                <div className="testimonial-content">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
                                                        pretium feugiat tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat sit dolor. Vitae donec
                                                        porttitor risus tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat </p>
                                                </div>
                                                <div className="testimonial-ratings">
                                                    <div className="rating">
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star"></i>
                                                        <p className="d-inline-block">4.5<span>ratings</span></p>
                                                    </div>
                                                </div>
                                                <div className="testimonial-users">
                                                    <div className="imgbx">
                                                        <img className="" alt="Img" src="assets/img/profiles/avatar-01.jpg" />
                                                    </div>
                                                    <div className="d-block">
                                                        <h6>Martin Harn</h6>
                                                        <p>Docker Development</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /Swiper Slide -->

                                        <!-- Swiper Slide -->
                                        <div className="swiper-slide">
                                            <div className="testimonial-item-five">
                                                <div className="testimonial-quote">
                                                    <img className="quote img-fluid" alt="Img" src="assets/img/bg/quote.svg" />
                                                </div>
                                                <div className="testimonial-content">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
                                                        pretium feugiat tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat sit dolor. Vitae donec
                                                        porttitor risus tellus eget vitae sagittis id in. In in tempor ac
                                                        dignissim at. Scelerisque sociis consequat </p>
                                                </div>
                                                <div className="testimonial-ratings">
                                                    <div className="rating">
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star filled"></i>
                                                        <i className="fas fa-star"></i>
                                                        <p className="d-inline-block">4.8<span>ratings</span></p>
                                                    </div>
                                                </div>
                                                <div className="testimonial-users">
                                                    <div className="imgbx">
                                                        <img className="" alt="Img" src="assets/img/profiles/avatar-05.jpg" />
                                                    </div>
                                                    <div className="d-block">
                                                        <h6>Noah Aarons</h6>
                                                        <p>Business Man</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- /Swiper Slide -->


                                    </div>
                                    <div className="testimonial-bottom-nav">
                                        <div className="slide-next-btn testimonial-next-pre"><i className="fas fa-arrow-left"></i>
                                        </div>
                                        <div className="slide-prev-btn testimonial-next-pre"><i className="fas fa-arrow-right"></i>
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

            {/* Latest News & Events Section */}
            <section className="py-16 bg-gray-50 p-40">
                <div className="container mx-auto px-6 lg:px-20">

                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-center mt-28 mb-10" data-aos="fade-up">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Stay Updated with the Latest <span className="text-blue-600">News & Events</span>
                        </h2>
                        {/* <Link to="/blog-list" className="text-blue-600 font-semibold hover:underline flex items-center">
                            See All <i className="fas fa-arrow-right ml-2"></i>
                        </Link> */}
                    </div>

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-24 p-3">

                        {/* Blog Posts */}
                        {[
                            { img: "blog-20.jpg", category: "Industry Insights", title: "Emerging Trends in Tech Education", desc: "Discover the latest innovations transforming coding education and how Codexpress is leading the way.", date: "Jun 15, 2024" },
                            { img: "blog-21.jpg", category: "Career Growth", title: "How to Land Your First Coding Job", desc: "Practical tips from industry experts on building a standout portfolio and acing tech interviews.", date: "Jun 10, 2024" },
                            { img: "blog-22.jpg", category: "Community Events", title: "Codexpress Global Hackathon 2024", desc: "Join the biggest online coding competition and compete with developers worldwide.", date: "May 25, 2024" },
                            { img: "blog-23.jpg", category: "Student Success", title: "From Beginner to Pro: Student Journeys", desc: "Inspiring stories from Codexpress graduates who turned their passion into careers.", date: "May 18, 2024" },
                            { img: "blog-24.jpg", category: "Tech Innovations", title: "AI and the Future of Coding", desc: "How AI is reshaping the programming landscape and what developers need to know.", date: "May 12, 2024" },
                        ].map((post, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-2xl overflow-hidden p-24" data-aos="fade-up">
                                <img className="w-full h-52 object-cover mb-7" src={`assets/img/blog/${post.img}`} alt={post.title} />

                                <div className="p-6">
                                    <span className="bg-blue-500 text-white px-3 py-1 text-xs rounded-full">{post.category}</span>
                                    <h5 className="text-xl font-semibold mt-4 text-gray-800 hover:text-blue-600 transition">
                                        {post.title}
                                    </h5>

                                    <p className="text-gray-500 text-sm mt-2">{post.desc}</p>
                                    <div className="flex items-center text-gray-100 text-xs mt-4">
                                        <i className="fa-solid fa-calendar-days mr-2"></i>
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* <!-- /Latest Blog --> */}



        {/* <!-- Footer --> */}
<footer className="footer footer-three bg-gray-900 text-white px-4 sm:px-8 lg:px-20">

{/* <!-- Footer Top --> */}
<div className="footer-three-top py-8" data-aos="fade-up">
    <div className="container mx-auto">
        <div className="footer-three-top-content p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* <!-- Footer Widget - About --> */}
                <div className="footer-widget-three footer-about">
                    <div className="footer-three-logo mb-6">
                        <Link to="/">
                            <img src={logo} alt="Code Express Logo" className="h-28" />
                        </Link>
                    </div>
                    <div className="footer-three-about mb-6">
                        <p className="text-gray-100 text-sm">Welcome to Code Express! Learn to code and develop your skills with our online coding courses. From Java and Python to full-stack development, we've got you covered!</p>
                    </div>
                </div>
                {/* <!-- /Footer Widget - About --> */}

                {/* <!-- Footer Widget - For Student --> */}
                <div className="footer-widget-three footer-menu-three">
                    <ul className="space-y-2">
                        <li><Link to="/register" className="text-gray-100 hover:text-blue-500 transition-colors">Register</Link></li>
                        <li><Link to="/student/login" className="text-gray-100 hover:text-blue-500 transition-colors">Login</Link></li>
                        <li><Link to="/courses" className="text-gray-100 hover:text-blue-500 transition-colors">Browse Courses</Link></li>
                        <li><Link to="/faq" className="text-gray-100 hover:text-blue-500 transition-colors">FAQ</Link></li>
                    </ul>
                </div>
                {/* <!-- /Footer Widget - For Student --> */}

                {/* <!-- Footer Widget - For Visitor --> */}
                <div className="footer-widget-three footer-menu-three">
                    <ul className="space-y-2">
                        <li><Link to="/about" className="text-gray-100 hover:text-blue-500 transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="text-gray-100 hover:text-blue-500 transition-colors">Contact Us</Link></li>
                        <li><Link to="/courses" className="text-gray-100 hover:text-blue-500 transition-colors">Explore Courses</Link></li>
                    </ul>
                </div>
                {/* <!-- /Footer Widget - For Visitor --> */}

                {/* <!-- Footer Widget - Address & Contact --> */}
                <div className="footer-widget-three footer-menu-three">
                    <ul className="space-y-2">
                        <li className="text-gray-100 text-sm">123 Coding Street, Tech City</li>
                        <li className="text-gray-100 text-sm">Vastral, Ahmedabad - 380036</li>
                        <li className="text-gray-100 text-sm">India</li>
                        <li className="text-yellow-400 text-sm">Phone: +91 123 456 7890</li>
                        <li className="text-yellow-400 text-sm">Email: info@codeexpress.com</li>
                    </ul>
                </div>
                {/* <!-- /Footer Widget - Address & Contact --> */}

            </div>
        </div>
    </div>
</div>
{/* <!-- /Footer Top --> */}

{/* <!-- Footer Bottom --> */}
<div className="footer-three-bottom py-6 ">
    <div className="container mx-auto">
        <div className="copyright-text-three">
            <p className="text-gray-100 text-center">&copy; 2025 CodeExpress. All rights reserved.</p>
        </div>
    </div>
</div>
{/* <!-- /Footer Bottom --> */}

</footer>
{/* <!-- /Footer --> */}
        </div>
    )
}

export default HomeTwo