import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    course: '',
    status: '',
    fromDate: '',
    toDate: ''
  });

  // Fetch attendance data
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/attendance/student/history', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAttendanceData(res.data.data);
      setFilteredData(res.data.data);
    } catch (err) {
      console.error("Error fetching attendance", err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let result = attendanceData;

    if (filters.course) {
      result = result.filter(item =>
        item.course.toLowerCase().includes(filters.course.toLowerCase())
      );
    }

    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }

    if (filters.fromDate) {
      result = result.filter(item => new Date(item.date) >= new Date(filters.fromDate));
    }

    if (filters.toDate) {
      result = result.filter(item => new Date(item.date) <= new Date(filters.toDate));
    }

    setFilteredData(result);
  }, [filters, attendanceData]);

  // Reset filters
  const resetFilters = () => {
    setFilters({
      course: '',
      status: '',
      fromDate: '',
      toDate: ''
    });
    setFilteredData(attendanceData);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="dashboard-body p-rounded-lg">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-with-buttons mb-28 flex-between flex-wrap gap-4">
        <div className="breadcrumb">
          <ul className="flex-align gap-2">
            <li>
              <Link
                to="/student"
                className="text-gray-500 hover:text-blue-600 text-sm transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-400">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-blue-600 font-medium text-sm">View Attendance</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='bg-white p-3 rounded-lg'>
        {/* Summary Stats */}
        {!loading && filteredData.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <i className="ph ph-calendar-check text-blue-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Records</p>
                  <p className="text-xl font-semibold text-gray-800">{filteredData.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <i className="ph ph-check-circle text-green-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Present Days</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {filteredData.filter(item => item.status === 'Present').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-full">
                  <i className="ph ph-x-circle text-red-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Absent Days</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {filteredData.filter(item => item.status === 'Absent').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Header */}
        {/* <div className="flex-between mb-6 bg-white p-5"> */}
        {/* <h2 className="text-xl font-semibold text-gray-800">Attendance Records</h2> */}
        {/* <button 
          onClick={fetchAttendance}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 transition-colors"
        >
          <i className="ph ph-arrow-clockwise"></i>
          Refresh
        </button> */}
        {/* </div> */}

        {/* Filters Section */}
        <div className="bg-blue-50 mt-4 p-3 rounded-lg mb-8">
          {/* <h3 className="text-md font-medium text-gray-700 mb-3">Filter Records</h3> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <input
                type="text"
                placeholder="Search by course"
                value={filters.course}
                onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
                <option value="Late">Late</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={resetFilters}
              className="bg-blue-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm mr-2 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
            <i className="ph ph-clipboard-text text-4xl text-blue-500 mb-3"></i>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No attendance records found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Batch
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((att, index) => (
                  <tr key={index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(att.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        weekday: 'short'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {att.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {att.batch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${att.status === 'Present'
                        ? 'bg-green-100 text-green-800'
                        : att.status === 'Absent'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {att.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default ViewAttendance;