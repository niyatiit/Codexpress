import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadResource = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm();
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authUser = JSON.parse(localStorage.getItem("user"));
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/faculty/${userId}/assigned-courses`);
        console.log(response.data.courses)
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/faculty/${authUser.id}`);
        if (response.data.success) {
          setFaculty(response.data.user[0]);
        }
      } catch (error) {
        console.error("Error fetching faculty:", error);
      }
    };
    fetchFaculty();
  }, [authUser.id]);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const onSubmit = async (data) => {
    setIsSubmitting(true);
  
    if (!selectedCourse) {
      toast.error("Please select a course.");
      setIsSubmitting(false);
      return;
    }
  
    if (!file) {
      toast.error("Please select a file to upload.");
      setIsSubmitting(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || ""); // Make description optional
    formData.append("course", selectedCourse);
    formData.append("uploadedBy", faculty._id);
    formData.append("file", file);
  
    try {
      const response = await axios.post(
        "http://localhost:3000/resources/upload", // Updated endpoint path
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add auth token
          },
        }
      );
  
      if (response.data.success) {
        toast.success(response.data.message || "Resource uploaded successfully!");
        reset();
        setSelectedCourse("");
        setFile(null);
      } else {
        toast.error(response.data.message || "Failed to upload resource");
      }
    } catch (error) {
      console.error("Error uploading resource:", error);
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Failed to upload resource. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-body p-6">
      <ToastContainer />
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/faculty" className="text-gray-800 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Upload Resource</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="card rounded-md">
        <div className="bg-blue-100 card-header">
          <h5 className="text-md">Upload New Resource</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Course Selection */}
            <div className="form-group mt-1">
              <label>Course</label>
              <select
                className={`form-control`}
                value={selectedCourse}
                onChange={handleCourseChange}
                required
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {isSubmitted && !selectedCourse && (
                <small className="text-danger">Course selection is required.</small>
              )}
            </div>

            {/* Resource Title */}
            <div className="form-group mt-3">
              <label>Resource Title</label>
              <input
                required
                type="text"
                className={`form-control ${isSubmitted && errors.title ? "is-invalid" : ""}`}
                {...register("title", { required: "Title is required" })}
                placeholder="Type something..."
              />
              {isSubmitted && errors.title && <small className="text-danger">{errors.title.message}</small>}
            </div>

            {/* Resource Description */}
            <div className="form-group mt-3">
              <label>Description</label>
              <textarea
                className={`form-control ${isSubmitted && errors.description ? "is-invalid" : ""}`}
                rows="4"
                {...register("description")}
                placeholder="Type something..."
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="form-group mt-3">
              <label>Upload File</label>
              <input
                type="file"
                className={`form-control ${isSubmitted && !file ? "is-invalid" : ""}`}
                onChange={handleFileChange}
                required
              />
              {isSubmitted && !file && <small className="text-danger">File upload is required.</small>}
            </div>

            {/* Submit Button */}
            <div className="form-actions mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading..." : "Upload Resource"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadResource;