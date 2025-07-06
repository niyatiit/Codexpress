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
      <div className="flex justify-center flex-col items-center h-screen">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
        <p>Loading ...</p>
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
    <div className="dashboard-body w-full p-6">
      {/* <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Courses</h1>
          <p className="text-gray-600">Manage your assigned courses</p>
        </div>
        <Link 
          to="/create-course" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <span>+</span> Create New
        </Link>
      </div> */}
      {/* Breadcrumb Section */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24 flex justify-between">
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
              <span className="text-main-600 fw-normal text-15">View Assigned Courses</span>
            </li>
          </ul>
          
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {courses.length > 0 ? (
          <div className="divide-y divide-gray-200 p-2 ">
            {courses.map((course) => (
              <div key={course._id} className="p-6 hover:bg-gray-50 transition-colors p-24">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className=" h-48 w-48 bg-gray-100 rounded-sm overflow-hidden">
                      {course.thumbnail && (
                        <img
                          src={course.thumbnail}
                          alt={course.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        <Link to={`/faculty/courses/${course._id}`}>{course.name}</Link>
                      </h3>
                      <p className="text-gray-600 text-sm">{course.category}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${course.status === 'open'
                          ? 'bg-green-100 text-green-800'
                          : course.status === 'closed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {course.status}
                        </span>
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          {course.total_students_enrolled || 0} students
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">

                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <Link
                      to={`/faculty/view/batches?course=${course._id}`}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 flex items-center gap-2"
                    >
                      <i className="ph ph-users"></i>
                      View Batches
                    </Link>
                    <Link
                      to={`/faculty/view/resources?course=${course._id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center gap-2"
                    >
                      <i className="ph ph-folder"></i>
                      View Resources
                    </Link>
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No courses assigned
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't been assigned to any courses yet.
              </p>
              <div className="mt-6">
                <Link
                  to="/request-course"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Request Course Assignment
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedCourses;