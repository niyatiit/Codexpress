import React, { useState, useEffect } from "react";
import axios from "axios";

const AddNotice = () => {
  const [recipientType, setRecipientType] = useState("student"); // 'student', 'faculty', or 'both'
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [loadingBatches, setLoadingBatches] = useState(false);

  // Fetch courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/courses');
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Fetch batches when course is selected
  useEffect(() => {
    if (selectedCourse && (recipientType === 'student' || recipientType === 'both')) {
      const fetchBatches = async () => {
        try {
          setLoadingBatches(true);
          const response = await axios.get(`http://localhost:3000/courses/${selectedCourse}/batches`);
          setBatches(response.data.data || []);
          setSelectedBatches([]); // Reset selected batches when course changes
        } catch (error) {
          console.error("Error fetching batches:", error);
        } finally {
          setLoadingBatches(false);
        }
      };
      fetchBatches();
    } else {
      setBatches([]);
      setSelectedBatches([]);
    }
  }, [selectedCourse, recipientType]);

  const handleRecipientChange = (e) => {
    const newRecipientType = e.target.value;
    setRecipientType(newRecipientType);
    // Reset course and batches if switching to faculty only
    if (newRecipientType === 'faculty') {
      setSelectedCourse("");
      setBatches([]);
      setSelectedBatches([]);
    }
  };

  const handleBatchSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedBatches([...selectedBatches, value]);
    } else {
      setSelectedBatches(selectedBatches.filter(batch => batch !== value));
    }
  };

  const handleSelectAllBatches = (e) => {
    if (e.target.checked) {
      setSelectedBatches(batches.map(batch => batch.id));
    } else {
      setSelectedBatches([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      recipientType,
      ...(recipientType !== 'faculty' && {
        courseId: selectedCourse,
        batchIds: selectedBatches
      }),
      attachment: e.target.attachment.files[0] || null
    };
    console.log("Form data:", formData);
    // Add your API call here
  };

  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <a href="/admin" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Add Notice</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">Create and Send Notification</h5>
        </div>
        <div className="card-body">
          <form className="form" onSubmit={handleSubmit}>
            {/* Notice Title */}
            <div className="mb-16">
              <label htmlFor="title" className="form-label fw-medium">
                Notice Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                placeholder="Enter the notice title"
                required
              />
            </div>

            {/* Notice Description */}
            <div className="mb-16">
              <label htmlFor="description" className="form-label fw-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="4"
                placeholder="Enter detailed description for the notice"
                required
              ></textarea>
            </div>

            {/* Recipient Type */}
            <div className="mb-16">
              <label htmlFor="recipientType" className="form-label fw-medium">
                Send To
              </label>
              <select
                id="recipientType"
                className="form-select"
                value={recipientType}
                onChange={handleRecipientChange}
              >
                <option value="student">Students Only</option>
                <option value="faculty">Faculty Only</option>
                <option value="both">Both Students and Faculty</option>
              </select>
            </div>

            {/* Course and Batch Selection (only shown when students are included) */}
            {(recipientType === 'student' || recipientType === 'both') && (
              <>
                <div className="mb-16">
                  <label htmlFor="course" className="form-label fw-medium">
                    Course
                  </label>
                  <select
                    id="course"
                    className="form-select"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))}
                  </select>
                </div>

                {selectedCourse && (
                  <div className="mb-16">
                    <label className="form-label fw-medium d-block">Select Batches</label>
                    {loadingBatches ? (
                      <div className="text-center py-8">
                        <div className="spinner-border text-main-600" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : batches.length > 0 ? (
                      <>
                        <div className="form-check mb-8">
                          <input
                            type="checkbox"
                            id="selectAllBatches"
                            className="form-check-input"
                            checked={selectedBatches.length === batches.length}
                            onChange={handleSelectAllBatches}
                          />
                          <label htmlFor="selectAllBatches" className="form-check-label">
                            Select All Batches
                          </label>
                        </div>
                        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                          {batches.map(batch => (
                            <div key={batch.id} className="form-check">
                              <input
                                type="checkbox"
                                id={`batch-${batch.id}`}
                                className="form-check-input"
                                value={batch.id}
                                checked={selectedBatches.includes(batch.id)}
                                onChange={handleBatchSelection}
                              />
                              <label htmlFor={`batch-${batch.id}`} className="form-check-label">
                                {batch.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="alert alert-info">
                        No batches found for this course
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Attachment Upload */}
            <div className="mb-16">
              <label htmlFor="attachment" className="form-label fw-medium">
                Attach File (Optional)
              </label>
              <input
                type="file"
                id="attachment"
                name="attachment"
                className="form-control"
                accept=".pdf, .docx, .jpg, .png"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-16">
              <button type="reset" className="btn border-2 text-gray-300 border-gray-300 rounded-pill hover:bg-gray-200">
                Clear
              </button>
              <button type="submit" className="btn btn-main rounded-pill">
                Send Notification
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotice;