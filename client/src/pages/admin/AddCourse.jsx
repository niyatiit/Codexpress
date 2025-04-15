import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
const AddCourse = () => {
  const categories = ["Development", "Design", "Data Science"];
  const statuses = ["open", "closed", "upcoming"];
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    name: "",
    code: "",
    duration: "",
    price: "",
    discount: "",
    category: "",
    description: "",
    thumbnail: "",
    status: "open",
    tags: "", // Tags as a comma-separated string
    syllabus: "", // Syllabus as a multi-line string
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
    // Clear errors when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Validate Course Title
    if (!course.name.trim()) {
      newErrors.name = "Course title is required";
    }

    // Validate Course Code
    if (!course.code.trim()) {
      newErrors.code = "Course code is required";
    }

    // Validate Duration
    if (!course.duration.trim()) {
      newErrors.duration = "Duration is required";
    }

    // Validate Price
    if (!course.price || course.price < 0) {
      newErrors.price = "Valid price is required";
    }

    // Validate Discount (optional, but must be between 0 and 100 if provided)
    if (course.discount && (course.discount < 0 || course.discount > 100)) {
      newErrors.discount = "Discount must be between 0 and 100";
    }

    // Validate Category
    if (!course.category.trim()) {
      newErrors.category = "Category is required";
    }

    // Validate Description
    if (!course.description.trim()) {
      newErrors.description = "Description is required";
    }

    // Validate Thumbnail URL (optional, but must be a valid URL if provided)
    if (course.thumbnail && !/^https?:\/\/\S+$/.test(course.thumbnail)) {
      newErrors.thumbnail = "Invalid URL";
    }

    // Validate Tags (optional, but must be comma-separated if provided)

    // Validate Syllabus (optional, but must be multi-line if provided)
    if (course.syllabus && !/^[\w\s\S]+(\n[\w\s\S]+)*$/.test(course.syllabus)) {
      newErrors.syllabus = "Syllabus must be multi-line";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Convert tags from comma-separated string to an array
        const tagsArray = course.tags.split(",").map((tag) => tag.trim());
        // Convert syllabus from multi-line string to an array
        const syllabusArray = course.syllabus
          .split("\n")
          .map((line) => line.trim());

        const payload = {
          ...course,
          tags: tagsArray,
          syllabus: syllabusArray,
        };

        const response = await axios.post(
          "http://localhost:3000/courses/add",
          payload
        );
        if (response.status === 201) {
          alert("Course added successfully!");
          // Reset the form
          setCourse({
            name: "",
            code: "",
            duration: "",
            price: "",
            discount: "",
            category: "",
            description: "",
            thumbnail: "",
            status: "open",
            tags: "",
            syllabus: "",
          });
          navigate("/admin/manage/courses");
        }
      } catch (error) {
        console.error("There was an error adding the course!", error);
        alert("There was an error adding the course. Please try again.");
      }
    }
  };

  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link
                to="/admin"
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
              <span className="text-main-600 fw-normal text-15">
                Add New Course
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-align gap-8">
          <h5 className="mb-0">Course Details</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row gy-20">
              {/* Course Title */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">
                  Course Title
                </label>
                <input
                  type="text"
                  name="name"
                  value={course.name}
                  onChange={handleChange}
                  className={`form-control py-11 ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  placeholder="Course Title"
                />
                {errors.name && (
                  <span className="text-danger">{errors.name}</span>
                )}
              </div>

              {/* Course Code */}
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">
                  Course Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={course.code}
                  onChange={handleChange}
                  className={`form-control py-11 ${
                    errors.code ? "is-invalid" : ""
                  }`}
                  placeholder="Course Code (e.g., CS101)"
                />
                {errors.code && (
                  <span className="text-danger">{errors.code}</span>
                )}
              </div>

              {/* Category */}
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">
                  Category
                </label>
                <select
                  name="category"
                  value={course.category}
                  onChange={handleChange}
                  className={`form-select py-9 ${
                    errors.category ? "is-invalid" : ""
                  }`}
                >
                  <option disabled value="">
                    Select Course Category
                  </option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-danger">{errors.category}</span>
                )}
              </div>

              {/* Description */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">
                  Description
                </label>
                <textarea
                  name="description"
                  value={course.description}
                  onChange={handleChange}
                  className={`form-control py-11 ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  placeholder="Enter course description"
                ></textarea>
                {errors.description && (
                  <span className="text-danger">{errors.description}</span>
                )}
              </div>

              {/* Price */}
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={course.price}
                  onChange={handleChange}
                  className={`form-control py-11 ${
                    errors.price ? "is-invalid" : ""
                  }`}
                  placeholder="Enter price"
                />
                {errors.price && (
                  <span className="text-danger">{errors.price}</span>
                )}
              </div>

              {/* Discount */}
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discount"
                  value={course.discount}
                  onChange={handleChange}
                  className={`form-control py-11 ${
                    errors.discount ? "is-invalid" : ""
                  }`}
                  placeholder="Enter discount"
                />
                {errors.discount && (
                  <span className="text-danger">{errors.discount}</span>
                )}
              </div>

              {/* Duration */}
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={course.duration}
                  onChange={handleChange}
                  className={`form-control py-11 ${
                    errors.duration ? "is-invalid" : ""
                  }`}
                  placeholder="Duration (e.g., 6 months)"
                />
                {errors.duration && (
                  <span className="text-danger">{errors.duration}</span>
                )}
              </div>

              {/* Status */}
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">
                  Status
                </label>
                <select
                  name="status"
                  value={course.status}
                  onChange={handleChange}
                  className="form-select py-9"
                >
                  {statuses.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Thumbnail URL */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">
                  Thumbnail URL
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  value={course.thumbnail}
                  onChange={handleChange}
                  className={`form-control py-11 ${
                    errors.thumbnail ? "is-invalid" : ""
                  }`}
                  placeholder="Enter image URL"
                />
                {errors.thumbnail && (
                  <span className="text-danger">{errors.thumbnail}</span>
                )}
              </div>

              {/* Tags */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={course.tags}
                  onChange={handleChange}
                  className={`form-control py-11 ${
                    errors.tags ? "is-invalid" : ""
                  }`}
                  placeholder="Enter tags (comma-separated, e.g., React, JavaScript, Web Development)"
                />
                {errors.tags && (
                  <span className="text-danger">{errors.tags}</span>
                )}
              </div>

              {/* Syllabus */}
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">
                  Syllabus
                </label>
                <ReactQuill
                  theme="snow"
                  value={course.syllabus}
                  onChange={(value) => {
                    setCourse({ ...course, syllabus: value });
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      syllabus: "",
                    }));
                  }}
                  className={`${errors.syllabus ? "is-invalid" : ""}`}
                  placeholder="Enter syllabus (supports rich text formatting)"
                />
                {errors.syllabus && (
                  <span className="text-danger">{errors.syllabus}</span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex-align justify-content-end gap-8">
                <Link
                  to="/admin/add/course"
                  className="btn btn-outline-main rounded-pill py-9"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-main rounded-pill py-9"
                >
                  Add Course
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
