import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const AssignmentSubmission = () => {
  const FACULTY_ID = JSON.parse(localStorage.getItem("user"))?.id;; // Replace with actual faculty ID or pass as prop

  const [loading, setLoading] = useState({
    courses: false,
    batches: false,
    assignments: false,
    submissions: false
  });
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // 10 seconds

      return () => clearTimeout(timer); // cleanup in case component unmounts early
    }
  }, [error]);

  // Fetch courses assigned to faculty
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(prev => ({ ...prev, courses: true }));
        const response = await axios.get(`http://localhost:3000/faculty/${FACULTY_ID}/assigned-courses`);
        setCourses(response.data.courses || []);
      } catch (err) {
        setError('Failed to load courses');
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(prev => ({ ...prev, courses: false }));
      }
    };
    fetchCourses();
  }, []);

  // Fetch batches when course is selected
  useEffect(() => {
    const fetchBatches = async () => {
      if (!selectedCourseId) return;

      try {
        setLoading(prev => ({ ...prev, batches: true }));
        const response = await axios.get(`http://localhost:3000/courses/${selectedCourseId}/batches`);
        setBatches(response.data.data || []);
        setSelectedBatchId('');
        setAssignments([]);
        setSubmissions([]);
      } catch (err) {
        setError('Failed to load batches');
        console.error("Error fetching batches:", err);
      } finally {
        setLoading(prev => ({ ...prev, batches: false }));
      }
    };
    fetchBatches();
  }, [selectedCourseId]);

  // Fetch assignments when batch is selected
  useEffect(() => {
    const fetchAssignments = async () => {
      if (!selectedCourseId || !selectedBatchId) return;

      try {
        setLoading(prev => ({ ...prev, assignments: true }));
        const response = await axios.get(
          `http://localhost:3000/assignments/course/${selectedCourseId}/batch/${selectedBatchId}`
        );
        setAssignments(response.data.data || []);
        setSubmissions([]);
      } catch (err) {
        setError('Failed to load assignments');
        console.error("Error fetching assignments:", err);
      } finally {
        setLoading(prev => ({ ...prev, assignments: false }));
      }
    };
    fetchAssignments();
  }, [selectedCourseId, selectedBatchId]);

  // Fetch submissions for an assignment
  const fetchSubmissions = async (assignmentId) => {
    try {
      setLoading(prev => ({ ...prev, submissions: true }));
      setSelectedAssignmentId(assignmentId);
      const response = await axios.get(`http://localhost:3000/assignments/submissions/${assignmentId}`);
      setSubmissions(response.data.data || []);
    } catch (err) {
      setError('Failed to load submissions');
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(prev => ({ ...prev, submissions: false }));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen dashboard-body p-6">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/faculty" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Assignment Submissions</span>
            </li>
          </ul>
        </div>
      </div>

      {/* <h1 className="text-3xl font-bold text-blue-800 mb-6">Assignment Submissions</h1> */}
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 flex items-center justify-between text-red-700 p-4 mb-4"
          role="alert"
        >
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-red-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - filters */}
        <div className="lg:col-span-1 bg-white p-16 rounded-lg shadow-md">
          <h2 className="text-lg text-blue-700 mb-4">Filter Submissions</h2>
          <div className="space-y-4">
            {/* Course selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
              <select
                value={selectedCourseId}
                onChange={
                  (e) => {
                    setSelectedCourseId(e.target.value)
                    setBatches([])
                    // selectedBatchId("")
                  }
                }
                disabled={loading.courses}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {loading.courses && <div className="mt-2 text-blue-600">Loading courses...</div>}
            </div>

            {/* Batch selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Batch</label>
              <select
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                disabled={!selectedCourseId || loading.batches}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a batch</option>
                {batches.map((batch) => (
                  <option key={batch._id} value={batch._id}>
                    {batch.name}
                  </option>
                ))}
              </select>
              {loading.batches && <div className="mt-2 text-blue-600">Loading batches...</div>}
            </div>

            {/* Assignments list */}
            {assignments.length > 0 && (
              <div className="mt-36 ">
                <h3 className=" mb-2">Your Assignments</h3>
                <div className="space-y-3">
                  {assignments.map((assignment) => (
                    <div
                      key={assignment._id}
                      className="p-3 border-l-4 border-blue-500 bg-blue-100 rounded"
                    >
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-gray-600">Due: {formatDate(assignment.due_date)}</p>
                      <button
                        onClick={() => fetchSubmissions(assignment._id)}
                        disabled={loading.submissions && selectedAssignmentId === assignment._id}
                        className="mt-2 px-3 py-1  bg-blue-500 text-white rounded-md text-sm"
                      >
                        {loading.submissions && selectedAssignmentId === assignment._id ? (
                          'Loading...'
                        ) : (
                          'View Submissions'
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main content - submissions */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg text-blue-700 mb-2 p-2">
            {selectedAssignmentId ? 'Student Submissions' : 'Select an assignment to view submissions'}
          </h2>

          {/* Course and Batch Info */}
          {(selectedCourseId || selectedBatchId) && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md">
              <div className="flex flex-wrap flex-col gap-2">
                {selectedCourseId && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Course: </span>
                    <span className="text-sm font-semibold text-blue-700">
                      {courses.find(c => c._id === selectedCourseId)?.name || 'N/A'}
                    </span>
                  </div>
                )}
                {selectedBatchId && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Batch: </span>
                    <span className="text-sm font-semibold text-blue-700">
                      {batches.find(b => b._id === selectedBatchId)?.name || 'N/A'}
                    </span>
                  </div>
                )}
                {selectedAssignmentId && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Assignment: </span>
                    <span className="text-sm font-semibold text-blue-700">
                      {assignments.find(a => a._id === selectedAssignmentId)?.title || 'N/A'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {loading.submissions ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : submissions.length > 0 ? (
            <div className="overflow-x-auto px-2">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-600">
                  <tr>
                    <th className="py-3 text-left text-xs pl-8 font-medium text-white uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Submission Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      File
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-gray-50">
                      <td className="pl-8 py-4 whitespace-nowrap">
                        {submission.student_id?.first_name} {submission.student_id?.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {submission.student_id?.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(submission.submitted_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${submission.graded ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {submission.graded ? 'Graded' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`http://localhost:3000${submission.file_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 underline text-sm"
                          download
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : selectedAssignmentId ? (
            <div className="text-center py-12 text-gray-500">
              No submissions found for this assignment.
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Please select an assignment to view submissions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmission;