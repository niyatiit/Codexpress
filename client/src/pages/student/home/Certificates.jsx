import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('user'))?.id;

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/certificates/student', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates:', error);
        toast.error('Failed to load certificates');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCertificates();
    }
  }, [userId]);

  const handleDownload = async (certificateUrl) => {
    try {
      const response = await axios.get(certificateUrl, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, `certificate_${Date.now()}.pdf`);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download certificate');
    }
  };

  const handleVerify = (certificateNumber) => {
    navigate(`/verify-certificate?certificateNumber=${certificateNumber}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading certificates...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/student" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Certificates</span>
            </li>
          </ul>
        </div>
      </div>
      {/* <h1 className="text-3xl font-bold mb-6">My Certificates</h1> */}
      {certificates.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">You don't have any certificates yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div key={cert._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{cert.course_id?.name}</h3>
                <p className="text-gray-600 mb-1">Batch: {cert.batch_id?.name}</p>
                <p className="text-gray-600 mb-1">
                  Completed on: {new Date(cert.issue_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Certificate #: {cert.certificate_number}
                </p>
                
                <div className="flex space-x-2 mt-4">
                <a
                  href={`http://localhost:3000${cert.certificate_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-blue-500 hover:bg-blue-600 text-white inline-flex items-center"
                  download
                >
                  <i className="ph ph-download mr-2"></i> Download
                </a>
                  <button
                    onClick={() => handleVerify(cert.certificate_number)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;