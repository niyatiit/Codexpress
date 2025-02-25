import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select"; // For multi-select dropdown

const AddBatch = () => {
  // State for batch details
  const [batchDetails, setBatchDetails] = useState({
    name: "",
    start_date: "",
    end_date: "",
    course_id: "",
    faculty_ids: [],
    total_seats: "",
    batch_type: "Weekday",
    batch_description: "",
  });

  const [courses, setCourses] = useState([]); // List of courses
  const [allFaculty, setAllFaculty] = useState([]); // All faculty members
  const [selectedFaculty, setSelectedFaculty] = useState([]); // Selected faculty (as tags)
  const [errors, setErrors] = useState({}); // Form validation errors
  const [loading, setLoading] = useState(false); // Loading state for form submission

  // Fetch courses and faculty on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, facultyResponse] = await Promise.all([
          axios.get("http://localhost:3000/courses"),
          axios.get("http://localhost:3000/faculty"),
        ]);

        setCourses(coursesResponse.data.courses || []);
        setAllFaculty(facultyResponse.data.faculties || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch courses or faculty. Please try again.");
      }
    };

    fetchData();
  }, []);

  // Handle input changes for text, number, and date fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatchDetails({
      ...batchDetails,
      [name]: value,
    });
  };

  // Handle course selection
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    const selectedCourse = courses.find((course) => course._id === courseId);

    if (!selectedCourse || !selectedCourse.duration) {
      setBatchDetails({ ...batchDetails, course_id: courseId, end_date: "" });
      return;
    }

    const calculatedEndDate = calculateEndDate(batchDetails.start_date, selectedCourse.duration);
    setBatchDetails({
      ...batchDetails,
      course_id: courseId,
      end_date: calculatedEndDate,
    });
  };

  // Handle start date change
  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    const selectedCourse = courses.find((course) => course._id === batchDetails.course_id);

    setBatchDetails({
      ...batchDetails,
      start_date: startDate,
      end_date: calculateEndDate(startDate, selectedCourse?.duration),
    });
  };

  // Calculate end date based on course duration and start date
  const calculateEndDate = (startDate, duration) => {
    if (!startDate || !duration) return "";
  
    const [value, unit] = duration.split(" "); // Split duration into value and unit (e.g., "6 months")
    const start = new Date(startDate);
  
    switch (unit) {
      case "months":
        start.setMonth(start.getMonth() + parseInt(value));
        break;
      case "years":
        start.setFullYear(start.getFullYear() + parseInt(value));
        break;
      default:
        return "";
    }
  
    return start.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };
  // Handle faculty selection using react-select
  const handleFacultySelect = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setSelectedFaculty(selectedOptions); // Store full objects for display
    setBatchDetails({
      ...batchDetails,
      faculty_ids: selectedIds, // Store only IDs for submission
    });
  };

  // Handle faculty removal
  const handleFacultyRemove = (facultyId) => {
    const updatedFaculty = selectedFaculty.filter((faculty) => faculty.value !== facultyId);
    setSelectedFaculty(updatedFaculty);
    setBatchDetails({
      ...batchDetails,
      faculty_ids: updatedFaculty.map((faculty) => faculty.value), // Update faculty_ids
    });
  };

  // Format faculty data for react-select
  const facultyOptions = allFaculty.map((fac) => ({
    value: fac._id, // Faculty ID
    label: `${fac.user_id.first_name} ${fac.user_id.last_name}`, // Full name
  }));

  // Validate form fields
  const validateForm = () => {
    let newErrors = {};
    if (!batchDetails.name) newErrors.name = "Batch name is required";
    if (!batchDetails.start_date) newErrors.start_date = "Start date is required";
    if (!batchDetails.end_date) newErrors.end_date = "End date is required";
    if (!batchDetails.course_id) newErrors.course_id = "Course is required";
    if (!batchDetails.total_seats || batchDetails.total_seats < 1)
      newErrors.total_seats = "Valid total seats is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        // Ensure total_seats is a number
        const payload = {
          ...batchDetails,
          total_seats: Number(batchDetails.total_seats),
        };
  
        console.log("Submitting Batch Details:", JSON.stringify(payload, null, 2)); // Log payload
  
        const response = await axios.post("http://localhost:3000/batches/add", payload);
        if (response.status === 201) {
          alert("Batch created successfully!");
          // Reset form after successful submission
          setBatchDetails({
            name: "",
            start_date: "",
            end_date: "",
            course_id: "",
            faculty_ids: [],
            total_seats: "",
            batch_type: "Weekday",
            batch_description: "",
          });
          setSelectedFaculty([]);
        } else {
          alert(response.data.message || "Failed to create batch.");
        }
      } catch (error) {
        console.error("Error creating batch:", error.response?.data || error.message);
        alert(error.response?.data?.message || "An error occurred while creating the batch.");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="dashboard-body">
      {/* Breadcrumb Section */}
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
              <span className="text-main-600 fw-normal text-15">Add New Batch</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Batch Form */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-align gap-8">
          <h5 className="mb-0">Batch Details</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Batch Name */}
              <div>
                <label className="font-medium text-lg mb-2 block">Batch Name</label>
                <input
                  type="text"
                  name="name"
                  value={batchDetails.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter batch name"
                  required
                />
                {errors.name && <span className="text-danger">{errors.name}</span>}
              </div>

              {/* Course */}
              <div>
                <label className="font-medium text-lg mb-2 block">Course</label>
                <select
                  name="course_id"
                  value={batchDetails.course_id}
                  onChange={handleCourseChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option disabled value="">
                    Select Course
                  </option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name} ({course.duration})
                    </option>
                  ))}
                </select>
                {errors.course_id && <span className="text-danger">{errors.course_id}</span>}
              </div>

              {/* Start Date */}
              <div>
                <label className="font-medium text-lg mb-2 block">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={batchDetails.start_date}
                  onChange={handleStartDateChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                {errors.start_date && <span className="text-danger">{errors.start_date}</span>}
              </div>

              {/* End Date */}
              <div>
                <label className="font-medium text-lg mb-2 block">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={batchDetails.end_date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  readOnly // Make end date read-only
                />
                {errors.end_date && <span className="text-danger">{errors.end_date}</span>}
              </div>

              {/* Total Seats */}
              <div>
                <label className="font-medium text-lg mb-2 block">Total Seats</label>
                <input
                  type="number"
                  name="total_seats"
                  value={batchDetails.total_seats}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter total seats"
                  min="1"
                  required
                />
                {errors.total_seats && <span className="text-danger">{errors.total_seats}</span>}
              </div>

              {/* Batch Type */}
              <div>
                <label className="font-medium text-lg mb-2 block">Batch Type</label>
                <select
                  name="batch_type"
                  value={batchDetails.batch_type}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="Weekday">Weekday</option>
                  <option value="Weekend">Weekend</option>
                  <option value="Crash Course">Crash Course</option>
                </select>
              </div>

              {/* Assigned Faculty */}
              <div>
                <label className="font-medium text-lg text-black mb-2 block">Assigned Faculty</label>
                <Select
                  isMulti
                  options={facultyOptions}
                  value={selectedFaculty}
                  onChange={handleFacultySelect}
                  className="w-full"
                  classNamePrefix="select"
                  placeholder="Select faculty..."
                />
                {/* Display selected faculty as tags */}
                {/* <div className="mt-2 flex flex-wrap gap-2">
                  {selectedFaculty.map((faculty) => (
                    <div key={faculty.value} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
                      <span>{faculty.label}</span>
                      <button
                        type="button"
                        onClick={() => handleFacultyRemove(faculty.value)}
                        className="text-blue-800 hover:text-blue-900"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* Batch Description */}
              <div className="col-span-2">
                <label className="font-medium text-lg mb-2 block">Description</label>
                <textarea
                  name="batch_description"
                  value={batchDetails.batch_description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter batch description"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="col-span-2 flex justify-end gap-4 mt-6">
                <Link to="/admin/add/batch" className="btn btn-outline-main rounded-pill py-9">Cancel</Link>
                <button type="submit" className="btn btn-main rounded-pill py-9">{loading ? "Saving..." : "Add Batch"}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBatch;