import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiDownload, FiSearch, FiFilter, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const ManageCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [filters, setFilters] = useState({
    course: '',
    batch: '',
    student: '',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/courses');
        setCourses(response.data.courses || []);
      } catch {
        toast.error('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchBatches = async () => {
      if (!selectedCourse) return setBatches([]);
      try {
        const response = await axios.get(`http://localhost:3000/courses/${selectedCourse}/batches`);
        setBatches(response.data.data || []);
      } catch {
        toast.error('Failed to fetch batches');
      }
    };
    fetchBatches();
  }, [selectedCourse]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const certsResponse = await axios.get('http://localhost:3000/certificates', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log(certsResponse.data.data);
        setCertificates(certsResponse.data.data);
      } catch (error) {
        toast.error('Failed to load certificates');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    return certificates.filter(cert => (
      (!filters.course || cert.course_id._id === filters.course) &&
      (!filters.batch || cert.batch_id._id === filters.batch) &&
      (!filters.student || cert.user_id._id === filters.student) &&
      (!filters.dateFrom || new Date(cert.issue_date) >= new Date(filters.dateFrom)) &&
      (!filters.dateTo || new Date(cert.issue_date) <= new Date(filters.dateTo))
    ));
  };

  const filteredCertificates = applyFilters();

  const handleDownloadAll = async () => {
    try {
      toast.info('Preparing bulk download...');
      const response = await axios.post('http://localhost:3000/certificates/admin/download', { filters }, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const blob = new Blob([response.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificates_${new Date().toISOString().split('T')[0]}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Bulk download started!');
    } catch {
      toast.error('Failed to download certificates');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading certificate data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-body p-36">
 {/* Breadcrumb Navigation */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-20">
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
              <span className="text-main-600 fw-normal text-15">Manage Certificates</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
       

        <div className="bg-white rounded-xl shadow-md p-16 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md font-semibold text-blue-700 flex items-center">
              <FiFilter className="mr-2" /> Filter Certificates
            </h2>
            {/* <button
              onClick={handleDownloadAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <FiDownload className="mr-2" /> Download All
            </button> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <select
                name="course"
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setFilters(prev => ({ ...prev, course: e.target.value }));
                }}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>{course.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
              <select
                name="batch"
                value={selectedBatch}
                onChange={(e) => {
                  setSelectedBatch(e.target.value);
                  setFilters(prev => ({ ...prev, batch: e.target.value }));
                }}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Batches</option>
                {batches.map(batch => (
                  <option key={batch._id} value={batch._id}>{batch.name}</option>
                ))}
              </select>
            </div>

            {/* <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div> */}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-3 mb-3 overflow-hidden">
          <div className="px-6 py-2 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-md font-semibold text-blue-700 pb-2">{filteredCertificates.length} Certificates Found</h2>
            <div className="flex items-center  text-gray-500">
              {/* <FiSearch className="ml-6" /> */}
              {/* <input
                type="text"
                placeholder="Search certificates..."
                className="pl-5 py-1 border border-gray-300 rounded-lg"
              /> */}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-500">
                <tr>
                 <th className="px-16 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Batch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Issue Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Certificate #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCertificates.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No certificates found</td>
                  </tr>
                ) : (
                  filteredCertificates.map(cert => (
                    <tr key={cert._id} className="hover:bg-blue-50">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        {/* <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiUsers className="text-blue-600" />
                        </div> */}
                        <div className="px-2 text-sm font-medium text-gray-700">{cert.user_id.first_name} {cert.user_id.last_name}</div>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">{cert.course_id.name}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">{cert.batch_id.name}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">{new Date(cert.issue_date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">{cert.certificate_number}</td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <a
                          href={cert.download_url}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCertificates;