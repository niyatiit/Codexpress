import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { format } from 'date-fns';

const GenerateQRAttendance = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [qrExpiry, setQrExpiry] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // Fetch courses for faculty
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/faculty/${userId}/assigned-courses`);
        setCourses(response.data.courses || []);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
      }
    };
    fetchCourses();
  }, [userId]);

  // Fetch batches when course is selected
  useEffect(() => {
    const fetchBatches = async () => {
      if (!selectedCourse) {
        setBatches([]);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/courses/${selectedCourse}/batches`);
        setBatches(response.data.data || []);
      } catch (err) {
        console.error('Failed to fetch batches:', err);
      }
    };
    fetchBatches();
  }, [selectedCourse]);

  // Generate QR code data
  useEffect(() => {
    if (isActive && selectedCourse && selectedBatch) {
      const data = {
        facultyId: userId,
        courseId: selectedCourse,
        batchId: selectedBatch,
        timestamp: new Date().toISOString(),
        expiry: Date.now() + 15 * 60 * 1000 // 15 minutes expiry
      };
      setQrValue(JSON.stringify(data));
      setQrExpiry(new Date(data.expiry));
      
      // Refresh QR code every 30 seconds for security
      const interval = setInterval(() => {
        const newData = {
          ...data,
          timestamp: new Date().toISOString()
        };
        setQrValue(JSON.stringify(newData));
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isActive, selectedCourse, selectedBatch, userId]);

  const toggleQR = () => {
    if (!selectedCourse || !selectedBatch) {
      alert('Please select both course and batch');
      return;
    }
    setIsActive(!isActive);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-light">
        <h5 className="mb-0">Generate QR Attendance</h5>
      </div>
      <div className="card-body">
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Course*</label>
            <select 
              className="form-select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              disabled={isActive}
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>{course.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Batch*</label>
            <select 
              className="form-select"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              disabled={isActive || !selectedCourse}
            >
              <option value="">Select Batch</option>
              {batches.map(batch => (
                <option key={batch._id} value={batch._id}>{batch.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          className={`px-4 py-2 ${isActive ? 'bg-red-500 text-white rounded-lg' : 'bg-blue-500 text-white rounded-lg'}`}
          onClick={toggleQR}
        >
          {isActive ? 'Stop QR Attendance' : 'Start QR Attendance'}
        </button>

        {isActive && (
          <div className="mt-4 text-center">
            <div className="mb-3">
              <p className="mb-1">Scan this QR code to mark attendance</p>
              {qrExpiry && (
                <p className="text-muted small">
                  Expires at: {format(qrExpiry, 'hh:mm a')} (auto-refreshing)
                </p>
              )}
            </div>
            <div className="d-flex justify-content-center p-3 bg-white rounded">
              <QRCode 
                value={qrValue} 
                size={256}
                level="H" // High error correction
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateQRAttendance;