import React from 'react';

const AvailableCourses = () => {
  return (
    <div className='flex flex-col justify-center items-center m-0 p-0'>
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title">Available Courses</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/student">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Available Courses</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12 col-lg-9">
        <div className="settings-widget card-info">
          <div className="settings-menu p-0">
            <div className="checkout-form pb-0">
              <div className="wishlist-tab">
                <ul className="nav">
                  <li className="nav-item">
                    <a href="javascript:void(0);" className="active" data-bs-toggle="tab"
                      data-bs-target="#all-courses">All Courses (10)</a>
                  </li>
                  <li className="nav-item">
                    <a href="javascript:void(0);" data-bs-toggle="tab"
                      data-bs-target="#free-courses">Free Courses (04)</a>
                  </li>
                  <li className="nav-item">
                    <a href="javascript:void(0);" data-bs-toggle="tab"
                      data-bs-target="#paid-courses">Paid Courses (06)</a>
                  </li>
                </ul>
              </div>

              <div className="tab-content">
                <div className="tab-pane fade show active" id="all-courses">
                  <div className="row">

                    {/* <!-- Course Grid --> */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="course-box flex-fill">
                        <div className="product">
                          <div className="product-img">
                            <a href="course-details.html">
                              <img className="img-fluid" alt="Img"
                                src="assets/img/course/course-01.jpg" />
                            </a>
                            <div className="price">
                              <h3>$100 <span>$120.00</span></h3>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="course-group d-flex">
                              <div className="course-group-img d-flex">
                                <a href="instructor-profile.html"><img
                                  src="assets/img/user/user1.jpg"
                                  alt="Img" className="img-fluid" /></a>
                                <div className="course-name">
                                  <h4><a href="instructor-profile.html">John Doe</a></h4>
                                  <p>Instructor</p>
                                </div>
                              </div>
                              <div
                                className="course-share d-flex align-items-center justify-content-center">
                                <a href="#"><i className="fa-regular fa-heart"></i></a>
                              </div>
                            </div>
                            <h3 className="title instructor-text"><a
                              href="course-details.html">Introduction to Web Development</a></h3>
                            <div className="course-info d-flex align-items-center">
                              <div className="rating-img d-flex align-items-center">
                                <img src="assets/img/icon/icon-01.svg" alt="Img" />
                                <p>20+ Lesson</p>
                              </div>
                              <div className="course-view d-flex align-items-center">
                                <img src="assets/img/icon/icon-02.svg" alt="Img" />
                                <p>90hr 00min</p>
                              </div>
                            </div>
                            <div className="rating mb-0">
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star"></i>
                              <span className="d-inline-block average-rating"><span>4.5</span> (25)</span>
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
                              <img className="img-fluid" alt="Img"
                                src="assets/img/course/course-02.jpg" />
                            </a>
                            <div className="price combo">
                              <h3>FREE</h3>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="course-group d-flex">
                              <div className="course-group-img d-flex">
                                <a href="instructor-profile.html"><img
                                  src="assets/img/user/user2.jpg"
                                  alt="Img" className="img-fluid" /></a>
                                <div className="course-name">
                                  <h4><a href="instructor-profile.html">Jane Smith</a></h4>
                                  <p>Instructor</p>
                                </div>
                              </div>
                              <div
                                className="course-share d-flex align-items-center justify-content-center">
                                <a href="#"><i className="fa-regular fa-heart"></i></a>
                              </div>
                            </div>
                            <h3 className="title instructor-text"><a
                              href="course-details.html">Advanced JavaScript Concepts</a></h3>
                            <div className="course-info d-flex align-items-center">
                              <div className="rating-img d-flex align-items-center">
                                <img src="assets/img/icon/icon-01.svg" alt="Img" />
                                <p>15+ Lesson</p>
                              </div>
                              <div className="course-view d-flex align-items-center">
                                <img src="assets/img/icon/icon-02.svg" alt="Img" />
                                <p>60hr 30min</p>
                              </div>
                            </div>
                            <div className="rating mb-0">
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <span className="d-inline-block average-rating"><span>3.5</span> (18)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Course Grid --> */}

                    {/* Add more course grids here */}

                  </div>
                </div>

                <div className="tab-pane fade" id="free-courses">
                  <div className="row">
                    {/* <!-- Course Grid --> */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="course-box flex-fill">
                        <div className="product">
                          <div className="product-img">
                            <a href="course-details.html">
                              <img className="img-fluid" alt="Img"
                                src="assets/img/course/course-03.jpg" />
                            </a>
                            <div className="price combo">
                              <h3>FREE</h3>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="course-group d-flex">
                              <div className="course-group-img d-flex">
                                <a href="instructor-profile.html"><img
                                  src="assets/img/user/user3.jpg"
                                  alt="Img" className="img-fluid" /></a>
                                <div className="course-name">
                                  <h4><a href="instructor-profile.html">Alice Johnson</a></h4>
                                  <p>Instructor</p>
                                </div>
                              </div>
                              <div
                                className="course-share d-flex align-items-center justify-content-center">
                                <a href="#"><i className="fa-regular fa-heart"></i></a>
                              </div>
                            </div>
                            <h3 className="title instructor-text"><a
                              href="course-details.html">Introduction to Python Programming</a></h3>
                            <div className="course-info d-flex align-items-center">
                              <div className="rating-img d-flex align-items-center">
                                <img src="assets/img/icon/icon-01.svg" alt="Img" />
                                <p>12+ Lesson</p>
                              </div>
                              <div className="course-view d-flex align-items-center">
                                <img src="assets/img/icon/icon-02.svg" alt="Img" />
                                <p>50hr 20min</p>
                              </div>
                            </div>
                            <div className="rating mb-0">
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <span className="d-inline-block average-rating"><span>3.0</span> (15)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Course Grid --> */}

                    {/* Add more free course grids here */}

                  </div>
                </div>

                <div className="tab-pane fade" id="paid-courses">
                  <div className="row">
                    {/* <!-- Course Grid --> */}
                    <div className="col-xxl-4 col-md-6 d-flex">
                      <div className="course-box flex-fill">
                        <div className="product">
                          <div className="product-img">
                            <a href="course-details.html">
                              <img className="img-fluid" alt="Img"
                                src="assets/img/course/course-04.jpg" />
                            </a>
                            <div className="price">
                              <h3>$150 <span>$200.00</span></h3>
                            </div>
                          </div>
                          <div className="product-content">
                            <div className="course-group d-flex">
                              <div className="course-group-img d-flex">
                                <a href="instructor-profile.html"><img
                                  src="assets/img/user/user4.jpg"
                                  alt="Img" className="img-fluid" /></a>
                                <div className="course-name">
                                  <h4><a href="instructor-profile.html">Bob Brown</a></h4>
                                  <p>Instructor</p>
                                </div>
                              </div>
                              <div
                                className="course-share d-flex align-items-center justify-content-center">
                                <a href="#"><i className="fa-regular fa-heart"></i></a>
                              </div>
                            </div>
                            <h3 className="title instructor-text"><a
                              href="course-details.html">Mastering React.js</a></h3>
                            <div className="course-info d-flex align-items-center">
                              <div className="rating-img d-flex align-items-center">
                                <img src="assets/img/icon/icon-01.svg" alt="Img" />
                                <p>25+ Lesson</p>
                              </div>
                              <div className="course-view d-flex align-items-center">
                                <img src="assets/img/icon/icon-02.svg" alt="Img" />
                                <p>100hr 00min</p>
                              </div>
                            </div>
                            <div className="rating mb-0">
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star filled"></i>
                              <i className="fas fa-star"></i>
                              <span className="d-inline-block average-rating"><span>4.0</span> (20)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- /Course Grid --> */}

                    {/* Add more paid course grids here */}

                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  <a href="#"><i className="bx bx-chevron-right"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AvailableCourses;