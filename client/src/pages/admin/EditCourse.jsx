import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();
  const categories = ["Development", "Design", "Data Science"];
  const statuses = ["open", "closed", "upcoming"];

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
    rating: "",
    tags: "",
    syllabus: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch course data by ID
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/courses/${id}`);
        const courseData = response.data.course;
        console.log("edit course -",courseData);
        

        // Transform tags and syllabus arrays into strings for the form
        const tagsString = courseData.tags.join(", ");
        const syllabusString = courseData.syllabus.join("\n");

        setCourse({
          ...courseData,
          tags: tagsString,
          syllabus: syllabusString,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course:", err);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!course.name) newErrors.name = "Course title is required";
    if (!course.code) newErrors.code = "Course code is required";
    if (!course.duration) newErrors.duration = "Duration is required";
    if (!course.price || course.price < 0) newErrors.price = "Valid price is required";
    if (!course.category) newErrors.category = "Category is required";
    if (!course.description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Transform tags and syllabus back into arrays
        const tagsArray = course.tags.split(",").map((tag) => tag.trim());
        const syllabusArray = course.syllabus.split("\n").map((line) => line.trim());

        const payload = {
          ...course,
          tags: tagsArray,
          syllabus: syllabusArray,
        };

        const response = await axios.put(`http://localhost:3000/courses/update/${id}`, payload);
        if (response.status === 200) {
          alert("Course updated successfully!");
          navigate("/admin/manage/courses"); // Redirect to the manage courses page
        }
      } catch (err) {
        console.error("Error updating course:", err);
        alert("Failed to update course. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading course details...</div>;
  }

  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/admin" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Edit Course</span>
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
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Course Title</label>
                <input
                  type="text"
                  name="name"
                  value={course.name}
                  onChange={handleChange}
                  className="form-control py-11"
                  placeholder="Course Title"
                />
                {errors.name && <span className="text-danger">{errors.name}</span>}
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Course Code</label>
                <input
                  type="text"
                  name="code"
                  value={course.code}
                  onChange={handleChange}
                  className="form-control py-11"
                  placeholder="Course Code (e.g., CS101)"
                />
                {errors.code && <span className="text-danger">{errors.code}</span>}
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Category</label>
                <select
                  name="category"
                  value={course.category}
                  onChange={handleChange}
                  className="form-select py-9"
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
                {errors.category && <span className="text-danger">{errors.category}</span>}
              </div>
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Description</label>
                <textarea
                  name="description"
                  value={course.description}
                  onChange={handleChange}
                  className="form-control py-11"
                  placeholder="Enter course description"
                ></textarea>
                {errors.description && <span className="text-danger">{errors.description}</span>}
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Price</label>
                <input
                  type="number"
                  name="price"
                  value={course.price}
                  onChange={handleChange}
                  className="form-control py-11"
                  placeholder="Enter price"
                />
                {errors.price && <span className="text-danger">{errors.price}</span>}
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={course.discount}
                  onChange={handleChange}
                  className="form-control py-11"
                  placeholder="Enter discount"
                />
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={course.duration}
                  onChange={handleChange}
                  className="form-control py-11"
                  placeholder="Duration (e.g., 6 months)"
                />
                {errors.duration && <span className="text-danger">{errors.duration}</span>}
              </div>
              <div className="col-sm-6">
                <label className="h5 mb-8 fw-semibold font-heading">Status</label>
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
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Thumbnail URL</label>
                <input
                  type="text"
                  name="thumbnail"
                  value={course.thumbnail}
                  onChange={handleChange}
                  className="form-control py-11"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={course.tags}
                  onChange={handleChange}
                  className="form-control py-11"
                  placeholder="Enter tags (comma-separated, e.g., React, JavaScript, Web Development)"
                />
              </div>
              <div className="col-sm-12">
                <label className="h5 mb-8 fw-semibold font-heading">Syllabus</label>
                <textarea
                  name="syllabus"
                  value={course.syllabus}
                  onChange={handleChange}
                  className="form-control py-11"
                  placeholder="Enter syllabus (one topic per line)"
                  rows={5}
                />
              </div>
              <div className="flex-align justify-content-end gap-8">
                <Link to={`/admin/manage/courses` } className="btn btn-outline-main rounded-pill py-9">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-main rounded-pill py-9">
                  Update Course
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;