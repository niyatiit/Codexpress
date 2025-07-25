import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Hourglass } from "react-loader-spinner"; // Import the loader

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("enrolled"); // Default tab
  const url = import.meta.env.VITE_BACKEND_URL;
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch enrolled courses from the backend
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}/enrollments/courses/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnrolledCourses(response.data.courses);
        console.log("Fetched courses:", response.data.courses); // Debugging
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        console.error("Error fetching enrolled courses:", error); // Debugging
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [url, user.id]);

  // Filter courses based on the selected tab
  const filteredCourses = enrolledCourses.filter((course) => {
    if (selectedTab === "enrolled") {
      return course.status === "enrolled";
    } else if (selectedTab === "completed") {
      return course.status === "completed";
    }
    return true; // Show all courses if no tab is selected
  });

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
          colors={["#306cce", "#72a1ed"]}
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
  }

  return (
    <div className="dashboard-body w-full">
      {/* Breadcrumb Start */}
      <div className="breadcrumb mb-24">
        <ul className="flex-align gap-4">
          <li>
            <Link
              to="/student"
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
            <span className="text-main-600 fw-normal text-15">Enrolled Courses</span>
          </li>
        </ul>
      </div>
      {/* Breadcrumb End */}

      {/* White Background Section */}
      <div className="bg-white rounded-lg shadow-sm p-36">
        {/* Tab Bar for Filtering Courses */}
        <div className="tab-bar flex gap-36 mb-36">
          <button
            className={`tab-btn px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
              selectedTab === "enrolled"
                ? "bg-blue-100 text-blue-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedTab("enrolled")}
          >
            Enrolled Courses
          </button>
          <button
            className={`tab-btn px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
              selectedTab === "completed"
                ? "bg-yellow-100 text-yellow-500"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedTab("completed")}
          >
            Completed Courses
          </button>
        </div>

        {/* Courses Grid */}
        <div className="all-course">
          <div className="row flex gap-48">
            {filteredCourses.length>0?filteredCourses.map((course) => (
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
                          className={`border-2 w-full px-4 py-2 rounded-lg text-sm font-medium ${
                            course.enrollment_status === "enrolled"
                              ? "border-blue-500 bg-blue-100 text-blue-500"
                              : course.enrollment_status === "completed"
                              ? "border-red-500 bg-red-100 text-red-500"
                              : "border-gray-500 bg-gray-100 text-gray-500"
                          }`}
                        >
                          {course.status}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )):
			<p className="text-left pl-5 text-zinc-300">Course Not Found!</p>
		}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourses;