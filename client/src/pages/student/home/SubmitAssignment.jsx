import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const SubmitAssignment = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignments, setAssignments] = useState([]);

  // Fetch assignments from backend
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:3000/assignments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const today = new Date();
        const upcomingAssignments = response.data.assignments.filter((assignment) => {
          return new Date(assignment.due_date) > today;
        });

        setAssignments(upcomingAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("assignment_id", data.assignment);
      formData.append("file", data.fileUpload[0]);

      const token = localStorage.getItem("authToken");
      await axios.post("http://localhost:3000/assignments/submit", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Assignment submitted successfully!");
      reset();
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit assignment.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="dashboard-body">
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title text-gray-800">Submit Assignment</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/student" className="text-blue-600 hover:text-blue-800">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Submit Assignment</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">Submit Your Assignment</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="assignment-form flex-column gap-4">
            {/* Assignment Dropdown */}
            <div className="form-group">
              <label htmlFor="assignment" className="form-label">Assignment Title</label>
              <select
                id="assignment"
                className={`form-control ${errors.assignment ? "is-invalid" : ""}`}
                {...register("assignment", { required: "Please select an assignment" })}
              >
                <option value="">Select Assignment</option>
                {assignments.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.title} (Due: {new Date(a.due_date).toLocaleDateString()})
                  </option>
                ))}
              </select>
              {errors.assignment && <small className="text-danger">{errors.assignment.message}</small>}
            </div>

            {/* File Upload */}
            <div className="form-group">
              <label htmlFor="fileUpload" className="form-label">Upload Your Assignment</label>
              <input
                type="file"
                id="fileUpload"
                className={`form-control ${errors.fileUpload ? "is-invalid" : ""}`}
                {...register("fileUpload", { required: "Please upload a file" })}
              />
              {errors.fileUpload && <small className="text-danger">{errors.fileUpload.message}</small>}
            </div>

            {/* Submit Buttons */}
            <div className="form-actions flex-end gap-4">
              <button
                type="reset"
                className="btn btn-outline-secondary text-gray-600 border-gray-600 hover:text-white hover:bg-gray-600"
                onClick={() => reset()}
              >
                Reset
              </button>
              <button
                type="submit"
                className="btn btn-primary text-white bg-main-600 border-main-600 hover:bg-main-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Assignment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitAssignment;
