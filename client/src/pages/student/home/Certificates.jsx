import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
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
      toast.info('Preparing your download...', { autoClose: 1500 });
      const response = await axios.get(certificateUrl, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      saveAs(blob, `certificate_${Date.now()}.pdf`);
      toast.success('Download started!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download certificate');
    }
  };

  const handleVerify = (certificateNumber) => {
    navigate(`/student/verify-certificate?certificateNumber=${certificateNumber}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
          <div className="breadcrumb mb-20">
            <ul className="flex-align gap-4">
              <li>
                <Link
                  to="/student"
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
                <span className="text-main-600 fw-normal text-15">My Certificates</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">My Certificates</h1>
          <p className="mt-2 text-md text-gray-500">
            Your achievements in one place
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-16 text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
            <p className="text-gray-500 mb-6">Your earned certificates will appear here once you complete courses.</p>
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <div
                key={cert._id}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${hoveredCard === cert._id ? 'transform -translate-y-2 shadow-lg' : ''}`}
                onMouseEnter={() => setHoveredCard(cert._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="p-16">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                      <svg className="w-28 h-28 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{cert.course_id?.name}</h3>
                      <p className="text-sm text-gray-500">Batch: {cert.batch_id?.name}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Issued:</span>
                      <span className="font-medium">{new Date(cert.issue_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>Certificate #:</span>
                      <span className="font-mono text-blue-600">{cert.certificate_number}</span>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      
                      <button>
                      <a
                        href={`http://localhost:3000${cert.certificate_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        download
                      >
                         <svg className="-ml-1 mr-2 h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg> Download
                      </a>
                      </button>
                      <button
                        onClick={() => handleVerify(cert.certificate_number)}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <svg className="-ml-1 mr-2 h-16 w-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                        Verify
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;