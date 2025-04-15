import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiDownload, FiCheckCircle, FiCalendar, FiBook } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const GenerateCertificate = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/enrollments/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const now = new Date();
        const completedCourses = response.data.enrollments.flatMap(enrollment =>
          enrollment.courses
            .filter(course => {
              const endDate = new Date(course.batch_id?.end_date);
              return endDate < now;
            })
            .map(course => ({
              courseId: course.course_id._id,
              courseName: course.course_id.name,
              batchId: course.batch_id?._id,
              batchName: course.batch_id?.name,
              batchStart: course.batch_id?.start_date,
              batchEnd: course.batch_id?.end_date
            }))
        );

        setCourses(completedCourses);
        if (completedCourses.length > 0) {
          setSelectedCourse(completedCourses[0].courseId);
          updateBatches(completedCourses[0].courseId);
        }
      } catch (error) {
        console.error('Error fetching completed courses:', error);
        toast.error('Failed to load completed courses');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCompletedCourses();
    }
  }, [userId]);

  const updateBatches = (courseId) => {
    const courseBatches = courses
      .filter(course => course.courseId === courseId)
      .map(course => ({
        id: course.batchId,
        name: course.batchName,
        startDate: course.batchStart,
        endDate: course.batchEnd
      }));
    
    setBatches(courseBatches);
    if (courseBatches.length > 0) {
      setSelectedBatch(courseBatches[0].id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    updateBatches(courseId);
  };

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  const handleGenerateCertificate = async () => {
    if (!selectedCourse || !selectedBatch) {
      toast.error('Please select both course and batch');
      return;
    }

    try {
      setIsGenerating(true);
      const response = await axios.post('http://localhost:3000/certificates/generate', {
        courseId: selectedCourse,
        batchId: selectedBatch
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      toast.success('Certificate generated successfully!');
      window.open(response.data.downloadUrl, '_blank');
    } catch (error) {
      console.error('Certificate generation failed:', error);
      const errorMsg = error.response?.data?.message || 'Failed to generate certificate';
      toast.error(errorMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your completed courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-body mx-auto px-4 py-8">
      {/* <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Your Certificates</h1>
        <p className="opacity-90">Generate certificates for your completed courses</p>
      </div> */}
        <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/student" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Generate Certificates</span>
            </li>
          </ul>
        </div>
      </div>
      {courses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-16 text-center">
          <FiBook className="mx-auto text-5xl text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Completed Courses Yet</h2>
          <p className="text-gray-500">You don't have any completed courses available for certification.</p>
        </div>
      ) : (
        <div className="space-y-6 ">
          <div className="bg-white rounded-xl shadow-lg p-16">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiCheckCircle className="text-green-500 mr-2" />
              Completed Courses
            </h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="course">
                Select Course
              </label>
              <select
                id="course"
                value={selectedCourse}
                onChange={handleCourseChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {courses.map((course, index) => (
                  <option key={index} value={course.courseId}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>

            {batches.length > 0 && (
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="batch">
                  Select Batch
                </label>
                <div className="space-y-3">
                  {batches.map((batch) => (
                    <div 
                      key={batch.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedBatch === batch.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                      onClick={() => setSelectedBatch(batch.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-800">{batch.name}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <FiCalendar className="mr-1" />
                            <span>{formatDate(batch.startDate)} - {formatDate(batch.endDate)}</span>
                          </div>
                        </div>
                        {selectedBatch === batch.id && (
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            Selected
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleGenerateCertificate}
              disabled={isGenerating}
              className={`w-full md:w-auto px-16 py-2 rounded-lg text-white font-medium flex items-center justify-center space-x-2 ${
                isGenerating 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 transition-colors'
              }`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <FiDownload className="text-lg" />
                  <span>Generate Certificate</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-16">
            <h2 className="text-md text-gray-800 mb-4">All Completed Courses</h2>
            <div className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{course.courseName}</h3>
                      <p className="text-sm text-gray-500 mt-1 flex items-center">
                        <FiCalendar className="mr-1" />
                        Completed on {formatDate(course.batchEnd)}
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateCertificate;