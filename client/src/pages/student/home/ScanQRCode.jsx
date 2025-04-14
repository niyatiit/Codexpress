import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ScanQrCode = () => {
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    const html5QrScanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA], // ✅ Fixed
      },
      false
    );

    html5QrScanner.render(
      async (decodedText, decodedResult) => {
        await handleScan(decodedText);
        html5QrScanner.clear();
      },
      (errorMessage) => {
        // Optional: console.warn(errorMessage);
      }
    );

    setScanner(html5QrScanner);

    return () => {
      html5QrScanner.clear().catch(() => { });
    };
  }, []);


  const handleScan = async (data) => {
    try {
      const qrData = JSON.parse(data);

      // Validate QR data
      if (!qrData.facultyId || !qrData.courseId || !qrData.batchId) {
        throw new Error('Invalid QR code');
      }

      // Check if QR code is expired
      if (qrData.expiry && Date.now() > qrData.expiry) {
        throw new Error('QR code has expired');
      }

      const studentId = JSON.parse(localStorage.getItem('user'))?._id;
      if (!studentId) throw new Error('Student not found in localStorage');

      const response = await axios.post('http://localhost:3000/attendance/qr', {
        studentId,
        facultyId: qrData.facultyId,
        courseId: qrData.courseId,
        batchId: qrData.batchId,
        timestamp: qrData.timestamp,
      });

      setSuccess('Attendance marked successfully!');
      setError('');
      setScanResult('');

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to mark attendance');
      setSuccess('');
    }
  };

  return (
    <div className="dashboard-body">

      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/student" className="text-gray-800 fw-normal text-15 hover-text-main-600">Home</Link>
            </li>
            <li><span className="text-gray-500 fw-normal d-flex"> <i className="ph ph-caret-right" /></span></li>
            <li><span className="text-main-600 fw-normal text-15">Scan Attendance</span></li>
          </ul>
        </div>
      </div>
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-0">Scan QR Attendance</h5>
        </div>
        <div className="card-body text-center">
          <div className="mb-3">
            <div
              id="qr-reader"
              style={{ width: '100%', maxWidth: '500px', border: '2px solid #ddd', borderRadius: '8px' }}
            />
          </div>

          {error && (
            <div className="alert alert-danger">
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <i className="bi bi-check-circle me-2"></i>
              {success}
            </div>
          )}

          <p className="text-muted">Point your camera at the QR code to mark attendance</p>
        </div>
      </div>
    </div>
  );
};

export default ScanQrCode;
