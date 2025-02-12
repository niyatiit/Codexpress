import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// Sample assignments data from the backend (this will come from your API in a real scenario)
const assignmentsData = [
  { id: 1, title: "Java Assignment 1", dueDate: "2025-02-20", course: "Java" },
  { id: 2, title: "React Assignment 2", dueDate: "2025-02-10", course: "React" },
  { id: 3, title: "Node.js Assignment 1", dueDate: "2025-02-25", course: "Node.js" },
];

const SubmitAssignment = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);

  // Filter assignments where due date is still in the future
  useEffect(() => {
    const today = new Date();
    const filtered = assignmentsData.filter((assignment) => {
      const dueDate = new Date(assignment.dueDate);
      return dueDate > today;
    });
    setFilteredAssignments(filtered);
  }, [assignments]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    // Placeholder for form submission logic
    setTimeout(() => {
      console.log("Assignment Submitted:", data);
      reset();
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title text-gray-800">Submit Assignment</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/student" className="text-blue-600 hover:text-blue-800">
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Submit Assignment
                    </li>
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
            {/* Assignment Title */}
            <div className="form-group">
              <label htmlFor="assignment" className="form-label">Assignment Title</label>
              <select
                id="assignment"
                className={`form-control ${errors.assignment ? "is-invalid" : ""}`}
                {...register("assignment", { required: "Assignment title is required" })}
              >
                <option value="">Select Assignment</option>
                {filteredAssignments.map((assignment) => (
                  <option key={assignment.id} value={assignment.id}>
                    {assignment.title} (Due: {assignment.dueDate})
                  </option>
                ))}
              </select>
              {errors.assignment && <small className="text-danger">{errors.assignment.message}</small>}
            </div>

            {/* Course */}
            <div className="form-group">
              <label htmlFor="course" className="form-label">Course</label>
              <select
                id="course"
                className={`form-control ${errors.course ? "is-invalid" : ""}`}
                {...register("course", { required: "Course is required" })}
              >
                <option value="">Select Course</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="Web Development">Web Development</option>
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
              </select>
              {errors.course && <small className="text-danger">{errors.course.message}</small>}
            </div>

            {/* Batch */}
            <div className="form-group">
              <label htmlFor="batch" className="form-label">Batch</label>
              <select
                id="batch"
                className={`form-control ${errors.batch ? "is-invalid" : ""}`}
                {...register("batch", { required: "Batch is required" })}
              >
                <option value="">Select Batch</option>
                <option value="Batch A">Batch A</option>
                <option value="Batch B">Batch B</option>
                <option value="Batch C">Batch C</option>
              </select>
              {errors.batch && <small className="text-danger">{errors.batch.message}</small>}
            </div>

            {/* File Upload */}
            <div className="form-group">
              <label htmlFor="fileUpload" className="form-label">Upload Your Assignment</label>
              <input
                type="file"
                id="fileUpload"
                className={`form-control ${errors.fileUpload ? "is-invalid" : ""}`}
                {...register("fileUpload", { required: "File upload is required" })}
              />
              {errors.fileUpload && <small className="text-danger">{errors.fileUpload.message}</small>}
            </div>

            {/* Submit Button */}
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
