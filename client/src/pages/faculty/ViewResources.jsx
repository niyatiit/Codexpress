import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch assigned courses
        const coursesRes = await axios.get(
          `http://localhost:3000/faculty/${userId}/assigned-courses`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setCourses(coursesRes.data.courses || []);
        
        // If courses exist, select the first one by default
        if (coursesRes.data.courses?.length > 0) {
          const initialCourse = coursesRes.data.courses[0]._id;
          setSelectedCourse(initialCourse);
          await fetchResourcesByCourse(initialCourse);
        } else {
          setResources([]);
        }

        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load initial data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
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
      // console.log("here is the data :",response.data.data)
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

  const handleDelete = async (resourceId) => {
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await axios.delete(`http://localhost:3000/resources/${resourceId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Resource deleted successfully");
        setResources(resources.filter((res) => res._id !== resourceId));
      } catch (error) {
        toast.error("Failed to delete resource");
        console.error("Error deleting resource:", error);
      }
    }
  };

  const filteredResources = resources.filter((resource) => {
    return searchTerm 
      ? resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
  });


  const renderEmptyState = () => {
    if (!hasFetched) return null;
    
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
          <Link
            to="/faculty/upload/resource"
            className="btn bg-blue-400 mt-3 hover:bg-blue-500"
          >
            Upload First Resource
          </Link>
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
                   <span className="text-main-600 fw-normal text-15">View Resources</span>
                 </li>
               </ul>
             </div>
           </div>

      <div className="card mb-24">
        <div className="card-body">
          <div className="flex-align gap-16 flex-wrap">
          <div className="form-group flex-grow-1">
              <label className="form-label text-md ">
                Select Course
              </label>
              <select 
                className="form-control "
                value={selectedCourse}
                onChange={handleCourseChange}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group flex-grow-1">
              <label className="form-label text-md ">
                Search Resources
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
           
          
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">
            {selectedCourse 
              ? `Resources for ${courses.find(c => c._id === selectedCourse)?.name || "Selected Course"}`
              : "Resources"}
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
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Uploaded On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((resource, index) => (
                      <tr key={resource._id}>
                        <td>{index + 1}</td>
                        <td>
                          <a
                            href={`http://localhost:3000${resource.fileUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 hover-underline"
                          >
                            {resource.title}
                          </a>
                        </td>
                        <td className="text-truncate" style={{maxWidth: '200px'}}>
                          {resource.description || "-"}
                        </td>
                        <td>
                          {new Date(resource.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <a
                              href={`http://localhost:3000${resource.fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn bg-blue-500"
                              download
                            >
                              Download
                            </a>  
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(resource._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewResources;