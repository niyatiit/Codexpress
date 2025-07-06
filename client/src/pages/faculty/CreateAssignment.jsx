import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAssignment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm();
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState(null);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authUser = JSON.parse(localStorage.getItem("user"));
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/faculty/${userId}/assigned-courses`);
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

  useEffect(() => {
    const fetchBatches = async () => {
      if (selectedCourse) {
        try {
          const response = await axios.get(`http://localhost:3000/batches/course/${selectedCourse}`);
          setBatches(response.data.data);
        } catch (error) {
          console.error("Error fetching batches:", error);
        }
      }
    };

    fetchBatches();
  }, [selectedCourse]);

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedBatches([]);
  };

  const handleBatchSelection = (batchId) => {
    if (selectedBatches.includes(batchId)) {
      setSelectedBatches(selectedBatches.filter((id) => id !== batchId));
    } else {
      setSelectedBatches([...selectedBatches, batchId]);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    if (selectedBatches.length === 0) {
      toast.error("Please select at least one batch.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("due_date", data.dueDate);
    formData.append("course_id", selectedCourse);
    formData.append("faculty_id", faculty._id);
    formData.append("batch_ids", JSON.stringify(selectedBatches));
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/assignments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Assignment created successfully!");
        reset();
        setSelectedCourse("");
        setSelectedBatches([]);
        setFile(null);
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast.error("Failed to create assignment. Please try again.");
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
              <span className="text-main-600 fw-normal text-15">Create Assignment</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="card rounded-md">
        <div className="bg-blue-100 card-header">
          <h5 className="text-md">Create a New Assignment</h5>
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
              {/* {isSubmitted && !selectedCourse && (
                <small className="text-danger">Course selection is required.</small>
              )} */}
            </div>

            {/* Batch Selection */}
            <div className="form-group mt-3">
              <label>Select Batches</label>
              {batches.length === 0 ? (
                <div className="border-[1px] rounded-md px-3 py-2 text-gray-500">
                  No batches available for this course.
                </div>
              ) : (
                <div className="border-[1px] rounded-md px-3 py-2">
                  {batches.map((batch) => (
                    <div key={batch._id} className="form-check flex pl-7">
                      <input
                        type="checkbox"
                        id={batch._id}
                        className="form-check-input"
                        checked={selectedBatches.includes(batch._id)}
                        onChange={() => handleBatchSelection(batch._id)}
                      />
                      <label htmlFor={batch._id} className="form-check-label mt-1">
                        {batch.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {/* {isSubmitted && selectedBatches.length === 0 && batches.length > 0 && (
                <small className="text-danger">Please select at least one batch.</small>
              )} */}
            </div>

            {/* Assignment Title */}
            <div className="form-group mt-3">
              <label>Assignment Title</label>
              <input
              required
                type="text"
                className={`form-control `}
                {...register("title", { required: "Title is required" })}
                placeholder="Type something..."
              />
              {/* {isSubmitted && errors.title && <small className="text-danger">{errors.title.message}</small>} */}
            </div>

            {/* Assignment Description */}
            <div className="form-group mt-3">
              <label>Description</label>
              <textarea
              required
                className={`form-control`}
                rows="4"
                {...register("description", { required: "Description is required" })}
                placeholder="Type something..."
              ></textarea>
              {/* {isSubmitted && errors.description && <small className="text-danger">{errors.description.message}</small>} */}
            </div>

            {/* Due Date */}
            <div className="form-group mt-3">
              <label>Due Date</label>
              <input
                type="date"
                required
                className={`form-control ${isSubmitted && errors.dueDate ? "is-invalid" : ""}`}
                {...register("dueDate", { required: "Due date is required" })}
              />
              {/* {isSubmitted && errors.dueDate && <small className="text-danger">{errors.dueDate.message}</small>} */}
            </div>

            {/* File Upload */}
            <div className="form-group mt-3">
              <label>Upload File</label>
              <input
                type="file"
                className={`form-control`}
                onChange={handleFileChange}
                required
              />
              {/* {isSubmitted && !file && <small className="text-danger">File upload is required.</small>} */}
            </div>

            {/* Submit Button */}
            <div className="form-actions mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                disabled={isSubmitting || batches.length === 0}
              >
                {isSubmitting ? "Creating..." : "Create Assignment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;