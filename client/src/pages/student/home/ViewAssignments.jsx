import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setIsLoading(true);

        // Fetch student's enrolled courses
        const enrollmentsRes = await axios.get(
          `http://localhost:3000/enrollments/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Extract enrolled courses with enrollment status 'enrolled'
        const courses = enrollmentsRes.data.enrollments
          .flatMap(enrollment =>
            enrollment.courses
              .filter(course => course.enrollment_status === 'enrolled')
              .map(course => ({
                _id: course.course_id._id,
                name: course.course_id.name,
                batch_id: course.batch_id?._id,
                batch_name: course.batch_id?.name
              }))
          );

        setEnrolledCourses(courses);

        // If courses exist, select the first one by default
        if (courses.length > 0) {
          setSelectedCourse(courses[0]._id);
          setSelectedBatch(courses[0].batch_id);
          await fetchAssignments(courses[0]._id, courses[0].batch_id);
        } else {
          setAssignments([]);
        }

      } catch (error) {
        console.error("Error fetching student data:", error);
        toast.error("Failed to load your enrolled courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [userId]);

  const fetchAssignments = async (courseId, batchId) => {
    if (!courseId || !batchId) {
      setAssignments([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/assignments/course/${courseId}/batch/${batchId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAssignments(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch assignments for selected course");
      console.error("Error fetching assignments:", error);
      setAssignments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCourseChange = async (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const courseId = e.target.value;
    const batchId = selectedOption.getAttribute('data-batch-id');

    setSelectedCourse(courseId);
    setSelectedBatch(batchId);
    await fetchAssignments(courseId, batchId);
  };

  const filteredAssignments = assignments.filter((assignment) => {
    return searchTerm
      ? assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.description?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const isAssignmentDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return today > due;
  };

  const renderEmptyState = () => {
    if (isLoading) return null;

    if (enrolledCourses.length === 0) {
      return (
        <div className="text-center py-8">
          <i className="ph ph-book-open text-5xl text-gray-400 mb-4"></i>
          <h4 className="text-lg font-medium text-gray-600">No Enrolled Courses</h4>
          <p className="text-gray-500 mt-2">
            You are not enrolled in any courses yet
          </p>
          <Link
            to="/student/courses"
            className="btn bg-blue-400 mt-3 hover:bg-blue-500"
          >
            Browse Available Courses
          </Link>
        </div>
      );
    }

    if (!selectedCourse || !selectedBatch) {
      return (
        <div className="text-center py-8">
          <i className="ph ph-folder-open text-5xl text-gray-400 mb-4"></i>
          <h4 className="text-lg font-medium text-gray-600">No Course Selected</h4>
          <p className="text-gray-500 mt-2">
            Please select a course from the dropdown to view assignments
          </p>
        </div>
      );
    }

    if (filteredAssignments.length === 0 && searchTerm) {
      return (
        <div className="text-center py-8">
          <i className="ph ph-magnifying-glass text-5xl text-gray-400 mb-4"></i>
          <h4 className="text-lg font-medium text-gray-600">No Assignments Found</h4>
          <p className="text-gray-500 mt-2">
            No assignments match your search criteria for "{searchTerm}"
          </p>
          <button
            className="btn btn-link text-primary mt-3"
            onClick={() => setSearchTerm("")}
          >
            Clear search
          </button>
        </div>
      );
    }

    if (filteredAssignments.length === 0) {
      return (
        <div className="text-center py-8">
          <i className="ph ph-file-text text-5xl text-gray-400 mb-4"></i>
          <h4 className="text-lg font-medium text-gray-600">No Assignments Available</h4>
          <p className="text-gray-500 mt-2">
            This course doesn't have any assignments yet
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
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
              <span className="text-main-600 fw-normal text-15">Course Assignments</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card mb-24">
        <div className="card-body">
          <div className="flex-align gap-16 flex-wrap">
            <div className="form-group flex-grow-1">
              <label className="form-label text-md">
                Select Course
              </label>
              <select
                className="form-control"
                value={selectedCourse}
                onChange={handleCourseChange}
                disabled={enrolledCourses.length === 0}
              >
                {enrolledCourses.length === 0 ? (
                  <option value="">No enrolled courses</option>
                ) : (
                  <>
                    <option value="">Select a course</option>
                    {enrolledCourses.map((course) => (
                      <option
                        key={course._id}
                        value={course._id}
                        data-batch-id={course.batch_id}
                      >
                        {course.name} - {course.batch_name || 'Default Batch'}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div className="form-group flex-grow-1">
              <label className="form-label text-md">
                Search Assignments
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={!selectedCourse || assignments.length === 0}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">
            {selectedCourse
              ? `Assignments for ${enrolledCourses.find(c => c._id === selectedCourse)?.name || "Selected Course"}`
              : "Course Assignments"}
          </h5>
          {selectedCourse && assignments.length > 0 && (
            <span className="badge bg-primary">
              {filteredAssignments.length} assignment{filteredAssignments.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="card-body">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-gray-600">Loading assignments...</p>
            </div>
          ) : (
            <>
              {renderEmptyState() || (

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredAssignments.map((assignment) => (
                    <Link to={`/student/assignments/${assignment._id}`}>
                    <div
                      key={assignment._id}
                      className={`bg-white border rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md ${isAssignmentDue(assignment.due_date) ? 'border-l-4 border-l-red-500 border-t-0 border-r-0 border-b-0' : 'border-l-4 border-l-blue-500 border-t-0 border-r-0 border-b-0'
                        }`}
                    >
                      <div className="p-3">

                        <div className="text-sm justify-end text-gray-400 flex items-center mt-1 mb-4">
                          <i className="ph ph-clock text-gray-400 mr-1.5"></i>
                          Posted: {formatDate(assignment.created_at)}
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`flex-shrink-0 rounded-full p-2.5 ${isAssignmentDue(assignment.due_date) ? 'bg-red-50' : 'bg-blue-50'
                            }`}>
                            <i className={`ph ${isAssignmentDue(assignment.due_date) ? 'ph-warning-circle text-red-500' : 'ph-file-text text-blue-500'
                              } text-xl`}></i>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 mb-1">{assignment.title}</h3>
                            <div className="flex items-center text-sm">
                              <i className="ph ph-calendar text-gray-400 mr-1.5"></i>
                              <span className="text-gray-600">
                                Due: {formatDate(assignment.due_date)}
                              </span>
                              {isAssignmentDue(assignment.due_date) && (
                                <span className="ml-2 px-2 py-0.5 bg-red-50 text-red-600 text-xs font-medium rounded-full">
                                  Overdue
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {assignment.description && (
                          <div className="px-1 mb-4">
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {assignment.description}
                            </p>
                          </div>
                        )}

                        <div className="pt-3 border-t border-gray-100">
                          <div className="flex flex-col sm:flex-col sm:justify-between sm:items-center gap-3">
                            <div className="flex gap-2 flex-start justify-between">
                              <a
                                href={`http://localhost:3000/${assignment.file_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-2 text-xs font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                                download
                              >
                                <i className="ph ph-download mr-1.5"></i> Download
                              </a>
                              <Link
                                to={`/student/assignments/submit/${assignment._id}`}
                                className="inline-flex items-center px-3 py-2 text-xs font-medium bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-md transition-colors"
                              >
                                <i className="ph ph-upload mr-1.5"></i> Submit
                              </Link>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAssignments;