import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner'; // Import the loader

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${url}/courses`);
        setCourses(response.data.courses);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className="dashboard-body w-full">
        {/* Breadcrumb Start */}
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Student Courses</span>
            </li>
          </ul>
        </div>
        {/* Breadcrumb End */}

        {/* Course Tab Start */}
        <div className="card">
          <div className="card-body">
            <div className="mb-24">
              <h1 className="text-2xl font-semibold text-center py-3">All Courses</h1>
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="alltab" role="tabpanel">
                <div className="all-course">
                  <div className="row">
                    {Array.isArray(courses) &&
                      courses.map((course) => (
                        <div
                          className="col-xl-3 col-lg-6 col-md-6 col-12"
                          key={course._id}
                          data-aos="fade-up"
                        >
                          <div
                            className="course-box-three"
                            style={{ height: '440px', width: '100%' }}
                          >
                            <div className="course-three-item h-100">
                              {/* Course Image */}
                              <div
                                className="course-three-img"
                                style={{ height: '200px', overflow: 'hidden' }}
                              >
                                <Link to={`/courses/${course._id}`}>
                                  <img
                                    className="img-fluid w-full h-full object-cover"
                                    alt={course.name}
                                    src={course.thumbnail}
                                  />
                                </Link>
                              </div>

                              {/* Course Content */}
                              <div className="course-three-content m-0 p-4 pt-0 h-[calc(100%-200px)] flex flex-col justify-between overflow-y-auto">
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
                                          {
                                            (course.discount > 0 ?
                                              <span>₹{course.price}</span>
                                              :
                                              <span></span>
                                            )
                                          }
                                        </h3>
                                      </div>
                                    </div>
                                    <div className="price-three-time d-inline-flex align-items-center">
                                      <i className="fa-regular fa-clock me-2"></i>
                                      <span>{course.duration}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Enroll Button */}
                                <div className="mt-auto">
                                  {course.status === "open" ? (
                                    <Link
                                      to={`/courses/${course._id}`}
                                      className="mybtn w-full bg-blue-500 text-white p-2 rounded-lg text-center block"
                                    >
                                      Enroll
                                    </Link>
                                  ) : (

                                    <button className="border-2 border-blue-500 w-full bg-blue-100 text-blue-500 px-4 py-2 rounded-lg">
                                      {course.status}
                                    </button>
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
        {/* Course Tab End */}
      </div>
    </>
  );
};

export default Courses;