import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";

const AssignedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAssignedCourses = async () => {
      if (!userId) {
        setError("User ID not found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${url}/faculty/${userId}/assigned-courses`);
        if (response.data.success) {
          setCourses(response.data.courses);
        } else {
          setError("Failed to fetch assigned courses.");
        }
      } catch (error) {
        setError("Failed to fetch assigned courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedCourses();
  }, [userId, url]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Hourglass visible={true} height="40" width="40" ariaLabel="hourglass-loading" colors={["#306cce", "#72a1ed"]} />
      </div>
    );
  }

  if (error) return (
    <div className="p-8 flex justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-xl">
        <p className="text-red-600 flex items-center gap-2">
          <span className="inline-block w-6 h-6">⚠️</span>
          {error}
        </p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-body w-full">
      <div className="breadcrumb mb-24">
        <ul className="flex-align gap-4">
          <li>
            <Link
              to="/faculty"
              className="text-gray-200 fw-normal text-15 hover-text-main-600"
            >
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-500 fw-normal d-flex">
              <i className="ph ph-caret-right"></i>
            </span>
          </li>
          <li>
            <span className="text-main-600 fw-normal text-15">Assigned Courses</span>
          </li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-20">
        <h3 className="text-lg font-semibold mb-4">Assigned Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                className="col-xl-3 col-lg-6 col-md-6 col-12"
                key={course._id}
                data-aos="fade-up"
              >
                <div
                  className="course-box-three"
                  style={{ height: "440px", width: "300px" }}
                >
                  <div className="course-three-item h-100">
                    {/* Course Image */}
                    <div
                      className="course-three-img"
                      style={{ height: "170px", overflow: "hidden" }}
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
                            <p className="px-3 rounded-2xl mb-3 bg-blue-100 text-blue-700 text-sm">
                              {course.category}
                            </p>
                            <h3 className="title instructor-text">{course.name}</h3>
                          </Link>
                        </div>

                        {/* Price and Duration */}
                        <div className="price-three-group d-flex align-items-center justify-content-between">
                          <div className="price-three-view d-flex align-items-center">
                            <div className="course-price-three">
                              <h3>
                                ₹{course.price - course.price * (course.discount / 100)}{" "}
                                {course.discount > 0 ? (
                                  <span>₹{course.price}</span>
                                ) : (
                                  <span></span>
                                )}
                              </h3>
                            </div>
                          </div>
                          <div className="price-three-time d-inline-flex align-items-center">
                            <i className="fa-regular fa-clock me-2"></i>
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Button */}
                      <div className="mt-auto">
                        <button
                          className={`border-2 w-full px-4 py-2 rounded-lg text-sm font-medium ${course.status === "upcoming"
                              ? "border-blue-500 bg-blue-100 text-blue-500"
                              : course.status === "open"
                                ? "border-green-500 bg-green-100 text-green-500"
                                : "border-red-500 bg-red-100 text-red-500"
                            }`}
                        >
                          {course.status}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No courses assigned.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignedCourses;
