import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format, isValid } from 'date-fns';
import { Hourglass } from "react-loader-spinner";

const MyBatches = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const [currentBatches, setCurrentBatches] = useState([]);
  const [pastBatches, setPastBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/enrollments/user/${userId}`);

        const now = new Date();
        const current = [];
        const past = [];

        response.data.enrollments.forEach(enrollment => {
          enrollment.courses.forEach(course => {
            if (course.batch_id && course.enrollment_status === 'enrolled') {
              const batch = {
                ...course.batch_id,
                course: course.course_id,
                enrollment: course
              };

              // Validate and parse end date
              const endDate = new Date(course.batch_id.end_date);
              if (isValid(endDate)) {
                if (endDate >= now) {
                  current.push(batch);
                } else {
                  past.push(batch);
                }
              } else {
                console.warn('Invalid end date:', course.batch_id.end_date);
              }
            }
          });
        });

        setCurrentBatches(current);
        setPastBatches(past);
      } catch (err) {
        console.error('Error fetching batches:', err);
        setError('Failed to load batch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBatches();
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [userId]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid date';
    } catch (e) {
      console.error('Date formatting error:', e);
      return 'Invalid date';
    }
  };

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

  if (error) {
    return (
      <div className="dashboard-body p-6">
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-body p-4 md:p-6">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24 flex justify-between">
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
              <span className="text-main-600 fw-normal text-15">View Batches</span>
            </li>
          </ul>

        </div>
      </div>


      {/* Current Batch Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-12 border-b border-zinc-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Current Batches</h3>
            <span className="mt-2 md:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {currentBatches.length} Active
            </span>
          </div>
        </div>

        <div className="p-36">
          {currentBatches.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-1">
              {currentBatches.map((batch, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-16 w-full hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center mb-3  ">
                    <h4 className="text-lg font-semibold text-gray-800">{batch.name}</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="mb-1 bg-blue-100 text-blue-500 px-3 rounded-2xl p-2 inline">
                      <span className="font-medium">Course:</span> {batch.course?.name}
                    </p>
                    {/* <p className="text-gray-600 mb-1">
                    <span className="font-medium">Faculty:</span> {batch.faculty_ids?.[0]?.first_name || 'Not assigned'}
                    </p> */}

                    <p className="text-zinc-400 mt-3">
                      <span className="font-medium"></span> {batch.batch_description || 'No description available'}
                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{formatDate(batch.start_date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">{formatDate(batch.end_date)}</p>
                    </div>
                  </div>

                  {/* <div className="mb-4">
                    <p className="text-sm text-gray-500">Schedule</p>
                    <p className="font-medium">
                      {batch.days?.join(', ')} at {batch.timing}
                    </p>
                  </div> */}

                  <div className="flex justify-between items-center">
                    <Link
                      to={`/student/batch-details/${batch._id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/courses/${batch.course?._id}/materials`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Course Materials →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No current batches</h3>
              <p className="mt-1 text-sm text-gray-500">You're not enrolled in any active batches right now.</p>
              <div className="mt-6">
                <Link
                  to="/courses"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Past Batches Section */}
      <div className="bg-white rounded-xl filter grayscale shadow-md overflow-hidden">
        <div className="p-16 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h3 className="text-xl font-semibold text-gray-800">Past Batches</h3>
            <span className="mt-2 md:mt-0 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              {pastBatches.length} Completed
            </span>
          </div>
        </div>

        <div className="p-26">
          {pastBatches.length > 0 ? (
            <div className="space-y-4">
              {pastBatches.map((batch, index) => (

                <div key={index} className="filter grayscale border border-gray-200 rounded-lg p-16 w-full hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center mb-3  ">
                    <h4 className="text-lg font-semibold text-gray-800">{batch.name}</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-400">
                      Inactive
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="mb-1 bg-blue-100 text-blue-500 px-3 rounded-2xl p-2 inline">
                      <span className="font-medium">Course:</span> {batch.course?.name}
                    </p>
                    {/* <p className="text-gray-600 mb-1">
                   <span className="font-medium">Faculty:</span> {batch.faculty_ids?.[0]?.first_name || 'Not assigned'}
                   </p> */}

                    <p className="text-zinc-400 mt-3">
                      <span className="font-medium"></span> {batch.batch_description || 'No description available'}
                    </p>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">{formatDate(batch.start_date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">{formatDate(batch.end_date)}</p>
                    </div>
                  </div>

                  {/* <div className="mb-4">
                   <p className="text-sm text-gray-500">Schedule</p>
                   <p className="font-medium">
                     {batch.days?.join(', ')} at {batch.timing}
                   </p>
                 </div> */}

                  <div className="flex justify-between items-center">
                    <Link
                      to={`/student/batch-details/${batch._id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/courses/${batch.course?._id}/materials`}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Course Materials →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No past batches</h3>
              <p className="mt-1 text-sm text-gray-500">You haven't completed any batches yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBatches;
