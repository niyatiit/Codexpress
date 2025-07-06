import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { format, isAfter } from 'date-fns';
import { FaCalendarAlt, FaSearch, FaFileExport } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const ViewAttendance = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastFetchedParams, setLastFetchedParams] = useState({
    courseId: '',
    batchId: '',
    date: null
  });

  // Fetch assigned courses for faculty
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/faculty/${userId}/assigned-courses`);
        setCourses(response.data.courses || []);
      } catch (err) {
        setError('Failed to fetch courses.');
      }
    };
    fetchCourses();
  }, [userId]);

  // Fetch batches when course is selected
  useEffect(() => {
    const fetchBatches = async () => {
      if (!selectedCourse) {
        setBatches([]);
        setSelectedBatch('');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/courses/${selectedCourse}/batches`);
        setBatches(response.data.data || []);
        setSelectedBatch('');
      } catch (err) {
        setError('Failed to fetch batches.');
      }
    };
    fetchBatches();
  }, [selectedCourse]);

  // Clear attendance data when filters change
  useEffect(() => {
    if (selectedCourse !== lastFetchedParams.courseId || 
        selectedBatch !== lastFetchedParams.batchId || 
        (selectedDate && lastFetchedParams.date && format(selectedDate, 'yyyy-MM-dd') !== format(lastFetchedParams.date, 'yyyy-MM-dd'))) {
      setAttendanceData([]);
    }
  }, [selectedCourse, selectedBatch, selectedDate, lastFetchedParams]);

  const handleFetchAttendance = async () => {
    if (!selectedCourse || !selectedBatch || !selectedDate) {
      setError('Please select course, batch and date.');
      return;
    }

    if (isAfter(selectedDate, new Date())) {
      setError('Date cannot be in the future.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const response = await axios.get(
        `http://localhost:3000/attendance?courseId=${selectedCourse}&batchId=${selectedBatch}&date=${formattedDate}`
      );
      
      setAttendanceData(response.data.data.attendance || []);
      setLastFetchedParams({
        courseId: selectedCourse,
        batchId: selectedBatch,
        date: selectedDate
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch attendance data.');
      } finally {
        setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (attendanceData.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(
      attendanceData.map(item => ({
        'Student Name': `${item.user_id.first_name} ${item.user_id.last_name}`,
        'Email': item.user_id.email,
        'Status': item.status,
        'Course': courses.find(c => c._id === selectedCourse)?.name || '',
        'Batch': batches.find(b => b._id === selectedBatch)?.name || '',
        'Date': format(selectedDate, 'MMMM d, yyyy')
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, `Attendance_${format(selectedDate, 'yyyyMMdd')}.xlsx`);
  };

  return (
    <div className="dashboard-body">
      {/* Breadcrumb */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/faculty" className="text-gray-800 fw-normal text-15 hover-text-main-600">Home</Link>
            </li>
            <li><span className="text-gray-500 fw-normal d-flex"> <i className="ph ph-caret-right" /></span></li>
            <li><span className="text-main-600 fw-normal text-15">View Attendance</span></li>
          </ul>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header border-bottom border-gray-100 bg-light">
          <h5 className="mb-0 text-gray-800 text-lg">View Attendance Records</h5>
          {/* <p className="text-muted mb-0 small">Select course, batch and date to view attendance</p> */}
        </div>

        <div className="card-body p-4">
          {/* Filters */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label fw-medium">Course*</label>
              <select 
                className="form-select shadow-sm" 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>{course.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-medium">Batch*</label>
              <select 
                className="form-select shadow-sm" 
                value={selectedBatch} 
                onChange={(e) => setSelectedBatch(e.target.value)} 
                disabled={!selectedCourse}
              >
                <option value="">Select Batch</option>
                {batches.map(batch => (
                  <option key={batch._id} value={batch._id}>{batch.name}</option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label fw-medium">Date*</label>
              <div className="input-group shadow-sm">
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  maxDate={new Date()}
                  className="form-control"
                  placeholderText="Select date"
                  dateFormat="MMMM d, yyyy"
                />
                <span className="input-group-text bg-white">
                  <FaCalendarAlt className="text-muted" />
                </span>
              </div>
            </div>

            <div className="col-12 mt-2 flex gap-3">
              <button 
                className="text-white flex gap-2 items-center rounded-lg bg-blue-500 px-4 py-2 shadow-sm hover:bg-blue-700" 
                onClick={handleFetchAttendance} 
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : (
                  <FaSearch className="me-2" />
                )}
                {loading ? 'Loading...' : 'View Attendance'}
              </button>
              
              {attendanceData.length > 0 && (
                <button 
                  className="bg-green-400 text-white flex gap-2 items-center rounded-lg bg-blue-500 px-4 py-2 shadow-sm" 
                  onClick={exportToExcel}
                >
                  <FaFileExport className="me-2" />
                  Export to Excel
                </button>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show">
              <i className="ph ph-warning-circle me-2"></i> 
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}
 
          {/* Attendance Data */}
          {attendanceData.length > 0 && (
            <div className="mt-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h6 className="mb-0 fw-semibold">Attendance for {selectedDate && format(selectedDate, 'MMMM d, yyyy')}</h6>
                  <small className="text-muted">
                    {courses.find(c => c._id === selectedCourse)?.name} - 
                    {batches.find(b => b._id === selectedBatch)?.name}
                  </small>
                </div>
                <span className="badge bg-blue-200 text-blue-700">
                  {attendanceData.length} records found
                </span>
              </div>
              
              <div className="table-responsive border rounded">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">Student Name</th>
                      <th>Email</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record, idx) => (
                      <tr key={idx}>
                        <td className="ps-4 fw-medium">{record.user_id.first_name} {record.user_id.last_name}</td>
                        <td className="text-muted">{record.user_id.email}</td>
                        <td className="text-center">
                          <span className={`badge ${record.status === 'Present' ? 'bg-success' : record.status === 'Late' ? 'bg-warning text-dark' : 'bg-danger'} rounded-pill px-3 py-2`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* No data */}
          {!loading && !error && selectedDate && attendanceData.length === 0 && lastFetchedParams.date && (
            <div className="alert alert-info text-center py-3 mt-4">
              <i className="ph ph-info me-2"></i>
              No attendance records found for the selected criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;