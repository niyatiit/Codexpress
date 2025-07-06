import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
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
                batch_id: course.batch_id?._id
              }))
          );

        setEnrolledCourses(courses);
        
        // If courses exist, select the first one by default
        if (courses.length > 0) {
          setSelectedCourse(courses[0]._id);
          await fetchResourcesByCourse(courses[0]._id);
        } else {
          setResources([]);
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

  const fetchResourcesByCourse = async (courseId) => {
    if (!courseId) {
      setResources([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/resources/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResources(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch resources for selected course");
      console.error("Error fetching resources:", error);
      setResources([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    await fetchResourcesByCourse(courseId);
  };

  const filteredResources = resources.filter((resource) => {
    return searchTerm 
      ? resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
  });

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

    if (!selectedCourse) {
      return (
        <div className="text-center py-8">
          <i className="ph ph-folder-open text-5xl text-gray-400 mb-4"></i>
          <h4 className="text-lg font-medium text-gray-600">No Course Selected</h4>
          <p className="text-gray-500 mt-2">
            Please select a course from the dropdown to view resources
          </p>
        </div>
      );
    }

    if (filteredResources.length === 0 && searchTerm) {
      return (
        <div className="text-center py-8">
          <i className="ph ph-magnifying-glass text-5xl text-gray-400 mb-4"></i>
          <h4 className="text-lg font-medium text-gray-600">No Resources Found</h4>
          <p className="text-gray-500 mt-2">
            No resources match your search criteria for "{searchTerm}"
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

    if (filteredResources.length === 0) {
      return (
        <div className="text-center py-8">
          <i className="ph ph-file-text text-5xl text-gray-400 mb-4"></i>
          <h4 className="text-lg font-medium text-gray-600">No Resources Available</h4>
          <p className="text-gray-500 mt-2">
            This course doesn't have any resources yet
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
              <span className="text-main-600 fw-normal text-15">Course Resources</span>
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
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div className="form-group flex-grow-1">
              <label className="form-label text-md">
                Search Resources
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={!selectedCourse || resources.length === 0}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">
            {selectedCourse 
              ? `Resources for ${enrolledCourses.find(c => c._id === selectedCourse)?.name || "Selected Course"}`
              : "Course Resources"}
          </h5>
          {selectedCourse && resources.length > 0 && (
            <span className="badge bg-primary">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <div className="card-body">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-gray-600">Loading resources...</p>
            </div>
          ) : (
            <>
              {renderEmptyState() || (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredResources.map((resource) => (
                    <div key={resource._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start mb-3">
                        <div className="bg-blue-100 p-3 rounded-lg mr-3">
                          <i className="ph ph-file-text text-blue-600 text-2xl"></i>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{resource.title}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(resource.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      {resource.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {resource.description}
                        </p>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <a
                          href={`http://localhost:3000${resource.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn bg-blue-500 hover:bg-blue-600 text-white"
                          download
                        >
                          <i className="ph ph-download mr-2"></i> Download
                        </a>
                        <span className="text-sm text-gray-500">
                          {resource.fileType}
                        </span>
                      </div>
                    </div>
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

export default ViewResources;