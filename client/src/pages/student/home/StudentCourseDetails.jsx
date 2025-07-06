import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner';
import { format, isValid } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';

const StudentCourseDetails = () => {
  const navigate = useNavigate();
  const [enrollmentDetails, setEnrollmentDetails] = useState(null);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');
  
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchEnrollmentDetails = async () => {
      try {
        setLoading(true);
        const enrollmentResponse = await axios.get(`http://localhost:3000/enrollments/user/${userId}`);
        setEnrollmentDetails(enrollmentResponse.data.enrollments[0]);

        const courseDetails = await Promise.all(
          enrollmentResponse.data.enrollments[0].courses.map(async (course) => {
            const courseData = await axios.get(`http://localhost:3000/courses/${course.course_id._id}`);
            return { 
              ...course, 
              courseData: courseData.data,
              batchName: course.batch_id ? course.batch_id.name : 'Not Assigned'
            };
          })
        );
        setCourses(courseDetails);
        setFilteredCourses(courseDetails);
      } catch (err) {
        setError('Failed to load enrollment details. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentDetails();
  }, [userId]);

  useEffect(() => {
    let results = courses;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(course => 
        course.course_id.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      results = results.filter(course => course.enrollment_status === statusFilter);
    }
    
    // Apply payment filter
    if (paymentFilter !== 'all') {
      results = results.filter(course => course.payment_status === paymentFilter);
    }
    
    // Apply batch filter
    if (batchFilter !== 'all') {
      if (batchFilter === 'assigned') {
        results = results.filter(course => course.batch_id);
      } else {
        results = results.filter(course => !course.batch_id);
      }
    }
    
    setFilteredCourses(results);
  }, [searchTerm, statusFilter, paymentFilter, batchFilter, courses]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isValid(date) ? format(date, 'dd MMM yyyy') : 'Invalid date';
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'enrolled':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentBadge = (status) => {
    switch(status) {
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'partial':
        return 'bg-orange-100 text-orange-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <p className="mt-4 text-lg text-gray-600">Loading your course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-body p-6">
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2L10 14zm2-6l2 2m0 0L12 8m2 2l-2 2M12 8l-2-2m2 2L12 8z"></path>
            </svg>
            <span>{error}</span>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-body p-6 max-w-7xl mx-auto">
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
                  <span className="fw-normal d-flex">
                    <i className="ph ph-caret-right"></i>
                  </span>
                </li>
                <li>
                  <span className="text-main-600 fw-normal text-15">Courses Details</span>
                </li>
              </ul>
            </div>
          </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-20">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900">Total Courses</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{courses.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900">Completed Courses</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {courses.filter(c => c.enrollment_status === 'completed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium text-gray-900">Pending Payments</h3>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {courses.filter(c => c.payment_status !== 'paid').length}
          </p>
        </div>
      </div>
      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Courses</label>
            <input
              type="text"
              placeholder="Search by course name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Status</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="enrolled">Enrolled</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Batch Assignment</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="assigned">Assigned</option>
              <option value="unassigned">Not Assigned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 ">
              <tr>
                <th scope="col" className="px-12 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Course Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Batch
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Enrollment Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.course_id.name}</div>
                          {/* <div className="text-sm text-white">{course.course_id.code || 'N/A'}</div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(course.enrollment_status)}`}>
                        {course.enrollment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentBadge(course.payment_status)}`}>
                        {course.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.batch_id ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {course.batchName}
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Not Assigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(course.enrolled_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => navigate(`/courses/${course.course_id._id}`)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      {course.batch_id && (
                        <button 
                          onClick={() => navigate(`/student/batch-details/${course.batch_id._id}`)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Batch
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-white">
                    No courses match your current filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default StudentCourseDetails;