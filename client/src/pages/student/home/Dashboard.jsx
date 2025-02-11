import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
const Dashboard = () => {
  return <>
  <div className="extra_main_div p-0 flex flex-col justify-center">
        {/* <!-- Header --> */}
       
        {/* <!-- /Header --> */}

        {/* <!-- Breadcrumb --> */}
        <div className="breadcrumb-bar breadcrumb-bar-info m-0 p-0">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <h2 className="breadcrumb-title">Dashboard</h2>
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Dashboard
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Breadcrumb --> */}

        {/* <!-- Page Content --> */}
        <div className="mt-50">
          <div className="container">
            <div className="row flex justify-center items-center">
              {/* <!-- sidebar --> */}
              
              {/* <!-- /Sidebar --> */}

              {/* <!-- Student Dashboard --> */}
              <div className="col-xl-9 col-lg-9 flex flex-col justify-center">
                {/* <!-- Dashboard Grid --> */}
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-6 d-flex">
                    <div className="card dash-info flex-fill">
                      <div className="card-body">
                        <h5>Enrolled Courses</h5>
                        <h2>12</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 d-flex">
                    <div className="card dash-info flex-fill">
                      <div className="card-body">
                        <h5>Active Courses</h5>
                        <h2>03</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 d-flex">
                    <div className="card dash-info flex-fill">
                      <div className="card-body">
                        <h5>Completed Courses</h5>
                        <h2>13</h2>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- /Dashboard Grid --> */}

                <div className="dashboard-title">
                  <h4>Recently Enrolled Courses</h4>
                </div>
                <div className="row">
                  {/* <!-- Course Grid --> */}
                  <div className="col-xxl-4 col-md-6 d-flex">
                    <div className="course-box flex-fill">
                      <div className="product">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img
                              className="img-fluid"
                              alt="Img"
                              src="assets/img/course/course-02.jpg"
                            />
                          </a>
                          <div className="price">
                            <h3>
                              $80 <span>$99.00</span>
                            </h3>
                          </div>
                        </div>
                        <div className="product-content">
                          <div className="course-group d-flex">
                            <div className="course-group-img d-flex">
                              <a href="instructor-profile.html">
                                <img
                                  src="assets/img/user/user2.jpg"
                                  alt="Img"
                                  className="img-fluid"
                                />
                              </a>
                              <div className="course-name">
                                <h4>
                                  <a href="instructor-profile.html">Cooper</a>
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div className="course-share d-flex align-items-center justify-content-center">
                              <a href="#">
                                <i className="fa-regular fa-heart"></i>
                              </a>
                            </div>
                          </div>
                          <h3 className="title instructor-text">
                            <a href="course-details.html">
                              Wordpress for Beginners - Master Wordpress Quickly
                            </a>
                          </h3>
                          <div className="course-info d-flex align-items-center">
                            <div className="rating-img d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>12+ Lesson</p>
                            </div>
                            <div className="course-view d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>70hr 30min</p>
                            </div>
                          </div>
                          <div className="rating mb-0">
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <span className="d-inline-block average-rating">
                              <span>5.0</span> (20)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Course Grid --> */}

                  {/* <!-- Course Grid --> */}
                  <div className="col-xxl-4 col-md-6 d-flex">
                    <div className="course-box flex-fill">
                      <div className="product">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img
                              className="img-fluid"
                              alt="Img"
                              src="assets/img/course/course-03.jpg"
                            />
                          </a>
                          <div className="price combo">
                            <h3>FREE</h3>
                          </div>
                        </div>
                        <div className="product-content">
                          <div className="course-group d-flex">
                            <div className="course-group-img d-flex">
                              <a href="instructor-profile.html">
                                <img
                                  src="assets/img/user/user5.jpg"
                                  alt="Img"
                                  className="img-fluid"
                                />
                              </a>
                              <div className="course-name">
                                <h4>
                                  <a href="instructor-profile.html">Jenny</a>
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div className="course-share d-flex align-items-center justify-content-center">
                              <a href="#">
                                <i className="fa-regular fa-heart"></i>
                              </a>
                            </div>
                          </div>
                          <h3 className="title instructor-text">
                            <a href="course-details.html">
                              Sketch from A to Z (2024): Become an app designer
                            </a>
                          </h3>
                          <div className="course-info d-flex align-items-center">
                            <div className="rating-img d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>10+ Lesson</p>
                            </div>
                            <div className="course-view d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>40hr 10min</p>
                            </div>
                          </div>
                          <div className="rating mb-0">
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <span className="d-inline-block average-rating">
                              <span>3.0</span> (18)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Course Grid --> */}

                  {/* <!-- Course Grid --> */}
                  <div className="col-xxl-4 col-md-6 d-flex">
                    <div className="course-box flex-fill">
                      <div className="product">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img
                              className="img-fluid"
                              alt="Img"
                              src="assets/img/course/course-04.jpg"
                            />
                          </a>
                          <div className="price">
                            <h3>
                              $65 <span>$70.00</span>
                            </h3>
                          </div>
                        </div>
                        <div className="product-content">
                          <div className="course-group d-flex">
                            <div className="course-group-img d-flex">
                              <a href="instructor-profile.html">
                                <img
                                  src="assets/img/user/user4.jpg"
                                  alt="Img"
                                  className="img-fluid"
                                />
                              </a>
                              <div className="course-name">
                                <h4>
                                  <a href="instructor-profile.html">
                                    Nicole Brown
                                  </a>
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div className="course-share d-flex align-items-center justify-content-center">
                              <a href="#">
                                <i className="fa-regular fa-heart"></i>
                              </a>
                            </div>
                          </div>
                          <h3 className="title instructor-text">
                            <a href="course-details.html">
                              Learn Angular Fundamentals From beginning to
                              advance lavel
                            </a>
                          </h3>
                          <div className="course-info d-flex align-items-center">
                            <div className="rating-img d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>15+ Lesson</p>
                            </div>
                            <div className="course-view d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>80hr 40min</p>
                            </div>
                          </div>
                          <div className="rating mb-0">
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star"></i>
                            <span className="d-inline-block average-rating">
                              <span>4.0</span> (10)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Course Grid --> */}

                  {/* <!-- Course Grid --> */}
                  <div className="col-xxl-4 col-md-6 d-flex">
                    <div className="course-box flex-fill">
                      <div className="product">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img
                              className="img-fluid"
                              alt="Img"
                              src="assets/img/course/course-05.jpg"
                            />
                          </a>
                          <div className="price combo">
                            <h3>FREE</h3>
                          </div>
                        </div>
                        <div className="product-content">
                          <div className="course-group d-flex">
                            <div className="course-group-img d-flex">
                              <a href="instructor-profile.html">
                                <img
                                  src="assets/img/user/user3.jpg"
                                  alt="Img"
                                  className="img-fluid"
                                />
                              </a>
                              <div className="course-name">
                                <h4>
                                  <a href="instructor-profile.html">
                                    John Smith
                                  </a>
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div className="course-share d-flex align-items-center justify-content-center">
                              <a href="#">
                                <i className="fa-regular fa-heart"></i>
                              </a>
                            </div>
                          </div>
                          <h3 className="title instructor-text">
                            <a href="course-details.html">
                              Build Responsive Real World Websites with Crash
                              Course
                            </a>
                          </h3>
                          <div className="course-info d-flex align-items-center">
                            <div className="rating-img d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>12+ Lesson</p>
                            </div>
                            <div className="course-view d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>70hr 30min</p>
                            </div>
                          </div>
                          <div className="rating mb-0">
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star"></i>
                            <span className="d-inline-block average-rating">
                              <span>4.0</span> (15)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Course Grid --> */}

                  {/* <!-- Course Grid --> */}
                  <div className="col-xxl-4 col-md-6 d-flex">
                    <div className="course-box flex-fill">
                      <div className="product">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img
                              className="img-fluid"
                              alt="Img"
                              src="assets/img/course/course-07.jpg"
                            />
                          </a>
                          <div className="price">
                            <h3>
                              $70 <span>$80.00</span>
                            </h3>
                          </div>
                        </div>
                        <div className="product-content">
                          <div className="course-group d-flex">
                            <div className="course-group-img d-flex">
                              <a href="instructor-profile.html">
                                <img
                                  src="assets/img/user/user6.jpg"
                                  alt="Img"
                                  className="img-fluid"
                                />
                              </a>
                              <div className="course-name">
                                <h4>
                                  <a href="instructor-profile.html">
                                    Stella Johnson
                                  </a>
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div className="course-share d-flex align-items-center justify-content-center">
                              <a href="#">
                                <i className="fa-regular fa-heart"></i>
                              </a>
                            </div>
                          </div>
                          <h3 className="title instructor-text">
                            <a href="course-details.html">
                              Learn JavaScript and Express to become a Expert
                            </a>
                          </h3>
                          <div className="course-info d-flex align-items-center">
                            <div className="rating-img d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>15+ Lesson</p>
                            </div>
                            <div className="course-view d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>70hr 30min</p>
                            </div>
                          </div>
                          <div className="rating mb-0">
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star"></i>
                            <span className="d-inline-block average-rating">
                              <span>4.6</span> (15)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Course Grid --> */}

                  {/* <!-- Course Grid --> */}
                  <div className="col-xxl-4 col-md-6 d-flex">
                    <div className="course-box flex-fill">
                      <div className="product">
                        <div className="product-img">
                          <a href="course-details.html">
                            <img
                              className="img-fluid"
                              alt="Img"
                              src="assets/img/course/course-08.jpg"
                            />
                          </a>
                          <div className="price combo">
                            <h3>FREE</h3>
                          </div>
                        </div>
                        <div className="product-content">
                          <div className="course-group d-flex">
                            <div className="course-group-img d-flex">
                              <a href="instructor-profile.html">
                                <img
                                  src="assets/img/user/user1.jpg"
                                  alt="Img"
                                  className="img-fluid"
                                />
                              </a>
                              <div className="course-name">
                                <h4>
                                  <a href="instructor-profile.html">
                                    Nicole Brown
                                  </a>
                                </h4>
                                <p>Instructor</p>
                              </div>
                            </div>
                            <div className="course-share d-flex align-items-center justify-content-center">
                              <a href="#">
                                <i className="fa-regular fa-heart"></i>
                              </a>
                            </div>
                          </div>
                          <h3 className="title instructor-text">
                            <a href="course-details.html">
                              Introduction to Programming- Python & Java
                            </a>
                          </h3>
                          <div className="course-info d-flex align-items-center">
                            <div className="rating-img d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-01.svg"
                                alt="Img"
                              />
                              <p>10+ Lesson</p>
                            </div>
                            <div className="course-view d-flex align-items-center">
                              <img
                                src="assets/img/icon/icon-02.svg"
                                alt="Img"
                              />
                              <p>70hr 30min</p>
                            </div>
                          </div>
                          <div className="rating mb-0">
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <i className="fas fa-star filled"></i>
                            <span className="d-inline-block average-rating">
                              <span>5.0</span> (13)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- /Course Grid --> */}
                </div>
                <div className="dash-pagination">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <p>Page 1 of 2</p>
                    </div>
                    <div className="col-6">
                      <ul className="pagination">
                        <li className="active">
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="bx bx-chevron-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Student Dashboard --> */}
            </div>
          </div>
        </div>
        {/* <!-- /Page Content --> */}
      </div></>;
};

export default Dashboard;
