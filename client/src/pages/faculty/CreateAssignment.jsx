import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateAssignment = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    // Placeholder for form submission logic
    setTimeout(() => {
      console.log("Assignment Created:", data);
      reset();
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="dashboard-body">
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

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">Create a New Assignment</h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="assignment-form flex-column gap-4">
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

            <div className="form-group">
              <label htmlFor="title" className="form-label">Assignment Title</label>
              <input
                type="text"
                id="title"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                placeholder="Enter assignment title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && <small className="text-danger">{errors.title.message}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                placeholder="Enter assignment description"
                rows="4"
                {...register("description", { required: "Description is required" })}
              ></textarea>
              {errors.description && <small className="text-danger">{errors.description.message}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="dueDate" className="form-label">Due Date</label>
              <input
                type="date"
                id="dueDate"
                className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
                {...register("dueDate", { required: "Due date is required" })}
              />
              {errors.dueDate && <small className="text-danger">{errors.dueDate.message}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="fileUpload" className="form-label">Upload File</label>
              <input
                type="file"
                id="fileUpload"
                className={`form-control ${errors.fileUpload ? "is-invalid" : ""}`}
                {...register("fileUpload", { required: "File upload is required" })}
              />
              {errors.fileUpload && <small className="text-danger">{errors.fileUpload.message}</small>}
            </div>

            {/* <div className="form-group">
              <label htmlFor="totalMarks" className="form-label">Total Marks</label>
              <input
                type="number"
                id="totalMarks"
                className={`form-control ${errors.totalMarks ? "is-invalid" : ""}`}
                placeholder="Enter total marks"
                {...register("totalMarks", { required: "Total marks are required", min: { value: 1, message: "Marks should be greater than 0" } })}
              />
              {errors.totalMarks && <small className="text-danger">{errors.totalMarks.message}</small>}
            </div> */}

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
