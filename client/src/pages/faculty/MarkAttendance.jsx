import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MarkAttendance = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [selectedBatchName, setSelectedBatchName] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [loading, setLoading] = useState({
    courses: false,
    batches: false,
    students: false,
    submitting: false
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Fetch courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(prev => ({ ...prev, courses: true }));
        const response = await axios.get('http://localhost:3000/courses');
        setCourses(response.data.courses || []);
      } catch (error) {
        setMessage({ text: "Failed to load courses", type: "error" });
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(prev => ({ ...prev, courses: false }));
      }
    };
    fetchCourses();
  }, []);

  // Fetch batches when course is selected
  useEffect(() => {
    const fetchBatches = async () => {
      if (!selectedCourseId) return;

      try {
        setLoading(prev => ({ ...prev, batches: true }));
        const response = await axios.get(`http://localhost:3000/courses/${selectedCourseId}/batches`);
        setBatches(response.data.data || []);
        setSelectedBatchId("");
        setSelectedBatchName("");
        setStudents([]);
      } catch (error) {
        setMessage({ text: "Failed to load batches", type: "error" });
        console.error("Error fetching batches:", error);
      } finally {
        setLoading(prev => ({ ...prev, batches: false }));
      }
    };
    fetchBatches();
  }, [selectedCourseId]);

  // Fetch students when batch is selected
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedBatchId) return;

      try {
        setLoading(prev => ({ ...prev, students: true }));
        const response = await axios.get(`http://localhost:3000/enrollments/batch/${selectedBatchId}`);

        // Filter out students who don't have user_id populated
        const validStudents = (response.data.students || []).filter(
          student => student.user_id && student.user_id.username
        );

        setStudents(validStudents);

        // Initialize attendance status with 'Absent' as default
        const initialStatus = {};
        validStudents.forEach(student => {
          initialStatus[student.user_id._id] = "Absent"; // Default to Absent
        });
        setAttendanceStatus(initialStatus);
      } catch (error) {
        setMessage({ text: "Failed to load students", type: "error" });
        console.error("Error fetching students:", error);
      } finally {
        setLoading(prev => ({ ...prev, students: false }));
      }
    };
    fetchStudents();
  }, [selectedBatchId]);

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    const courseName = e.target.options[e.target.selectedIndex].text;
    setSelectedCourseId(courseId);
    setSelectedCourseName(courseName);
    setSelectedBatchId("");
    setSelectedBatchName("");
    setStudents([]);
    setAttendanceStatus({});
    setMessage({ text: "", type: "" });
  };

  const handleBatchChange = (e) => {
    const batchId = e.target.value;
    const batchName = e.target.options[e.target.selectedIndex].text;
    setSelectedBatchId(batchId);
    setSelectedBatchName(batchName);
    setStudents([]);
    setAttendanceStatus({});
    setMessage({ text: "", type: "" });
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const confirmSubmit = () => {
    if (window.confirm("Are you sure you want to submit this attendance?")) {
      handleSubmitAttendance();
    }
  };

  const handleSubmitAttendance = async () => {
    // Validate batch selection
    if (!selectedBatchId) {
      setMessage({ text: "Please select a batch before submitting attendance", type: "error" });
      return;
    }
  
    // Validate students exist
    if (students.length === 0) {
      setMessage({ text: "No students found in the selected batch", type: "warning" });
      return;
    }
  
    // Check if at least one attendance status is changed from default
    const hasChanges = Object.keys(attendanceStatus).some(
      (studentId) => attendanceStatus[studentId] !== "Absent"
    );
  
    if (!hasChanges) {
      setMessage({ text: "Please mark attendance for at least one student", type: "warning" });
      return;
    }
  
    try {
      setLoading((prev) => ({ ...prev, submitting: true }));
  
      // Prepare attendance data
      const attendanceData = {
        date: attendanceDate,
        batch_id: selectedBatchId,
        course_id: selectedCourseId,
        attendance: students.map((student) => ({
          student_id: student.user_id._id,
          status: attendanceStatus[student.user_id._id] || "Absent", // Default to Absent if not set
        })),
      };
  
      // Submit attendance to the server
      const response = await axios.post(
        "http://localhost:3000/attendance",
        attendanceData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: (status) => status >= 200 && status < 500,
        }
      );
  
      // Handle response
      if (response.status === 201) {
        setMessage({ text: "Attendance submitted successfully!", type: "success" });
  
        // Reset form state after successful submission
        setTimeout(() => {
          setSelectedBatchId("");
          setSelectedBatchName("");
          setStudents([]);
          setAttendanceStatus({});
        }, 2000);
      } else if (response.status === 400) {
        // Handle validation errors from server
        const errorMessage =
          response.data.message || "Invalid data submitted for attendance";
        setMessage({ text: errorMessage, type: "error" });
  
        // Handle specific field errors if available
        if (response.data.errors) {
          console.error("Field errors:", response.data.errors);
        }
      } else if (response.status === 409) {
        // Handle conflict (attendance already marked)
        setMessage({ 
          text: response.data.message || "Attendance already marked for today", 
          type: "warning" 
        });
      } else {
        throw new Error(response.data.message || "Failed to submit attendance");
      }
    } catch (error) {
      console.error("Attendance submission error:", error);
  
      // Handle network errors
      if (error.isAxiosError && !error.response) {
        setMessage({ text: "Network error - please check your connection", type: "error" });
      } else {
        // Handle other errors
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to submit attendance";
        setMessage({ text: errorMessage, type: "error" });
      }
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false }));
    }
  };

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
              <span className="text-main-600 fw-normal text-15">Mark Attendance</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100">
          <h5 className="mb-0">Mark Student Attendance</h5>
          {selectedCourseName && (
            <p className="text-muted mb-0">Course: {selectedCourseName}</p>
          )}
          {selectedBatchName && (
            <p className="text-muted mb-0">Batch: {selectedBatchName}</p>
          )}
        </div>

        <div className="card-body">
          {/* Message Display */}
          {message.text && (
            <div className={`alert alert-${message.type} mb-16`}>
              {message.text}
            </div>
          )}

          {/* Course Selection */}
          <div className="mb-16">
            <label htmlFor="course" className="form-label fw-medium">
              Select Course
            </label>
            <select
              id="course"
              value={selectedCourseId}
              onChange={handleCourseChange}
              className="form-select"
              disabled={loading.courses}
            >
              <option value="">-- Select Course --</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
            {loading.courses && (
              <div className="mt-2 text-sm text-gray-500">Loading courses...</div>
            )}
          </div>

          {/* Batch Selection */}
          {selectedCourseId && (
            <div className="mb-16">
              <label htmlFor="batch" className="form-label fw-medium">
                Select Batch
              </label>
              <select
                id="batch"
                value={selectedBatchId}
                onChange={handleBatchChange}
                className="form-select"
                disabled={loading.batches || !selectedCourseId}
              >
                <option value="">-- Select Batch --</option>
                {batches.map(batch => (
                  <option key={batch._id} value={batch._id}>
                    {batch.name}
                  </option>
                ))}
              </select>
              {loading.batches && (
                <div className="mt-2 text-sm text-gray-500">Loading batches...</div>
              )}
            </div>
          )}

          {/* Date Selection */}
          {selectedBatchId && (
            <div className="mb-16">
              <label htmlFor="attendanceDate" className="form-label fw-medium">
                Attendance Date
              </label>
              <input
                type="date"
                id="attendanceDate"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="form-control"
                disabled
              />
            </div>
          )}

          {/* Students List */}
          {selectedBatchId && (
            <div className="mb-16">
              <label className="form-label fw-medium d-block">
                Students in Batch
              </label>

              {loading.students ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-main-600" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : students.length === 0 ? (
                <div className="alert alert-info">No students found in this batch</div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Roll Number</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student._id}>
                          <td>{student.user_id.first_name} {student.user_id.last_name}</td>
                          <td>{index + 1}</td>
                          <td>
                            <div className="btn-group btn-group-sm flex gap-2">
                              <button
                                type="button"
                                className={`btn ${attendanceStatus[student.user_id._id] === 'Present' ? 'btn-success' : 'btn-success'}`}
                                onClick={() => handleAttendanceChange(student.user_id._id, 'Present')}
                              >
                                Present
                              </button>
                              <button
                                type="button"
                                className={`btn ${attendanceStatus[student.user_id._id] === 'Absent' ? 'btn-danger' : 'btn-danger'}`}
                                onClick={() => handleAttendanceChange(student.user_id._id, 'Absent')}
                              >
                                Absent
                              </button>
                              <button
                                type="button"
                                className={`btn ${attendanceStatus[student.user_id._id] === 'Late' ? 'btn-warning' : 'btn-warning'}`}
                                onClick={() => handleAttendanceChange(student.user_id._id, 'Late')}
                              >
                                Late
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          {selectedBatchId && students.length > 0 && (
            <div className="text-end">
              <button
                onClick={confirmSubmit}
                className="btn btn-main rounded-pill"
                disabled={loading.submitting}
              >
                {loading.submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Attendance"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;