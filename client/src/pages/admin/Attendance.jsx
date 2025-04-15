import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, subDays } from 'date-fns';
import { 
  FiDownload, 
  FiFilter, 
  FiRefreshCw, 
  FiCalendar,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiClock
} from 'react-icons/fi';
import * as XLSX from 'xlsx';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
);

const Attendance = () => {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 7),
    end: new Date()
  });
  const [attendanceData, setAttendanceData] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/courses');
        setCourses(response.data.courses || []);
      } catch (err) {
        setError('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, []);

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
        setError('Failed to fetch batches');
      }
    };
    fetchBatches();
  }, [selectedCourse]);

  // Fetch attendance data when filters change
  const fetchAttendanceData = async () => {
    if (!selectedCourse || !selectedBatch) {
      setError('Please select both course and batch');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const params = {
        courseId: selectedCourse,
        batchId: selectedBatch,
        startDate: format(dateRange.start, 'yyyy-MM-dd'),
        endDate: format(dateRange.end, 'yyyy-MM-dd')
      };

      const response = await axios.get('http://localhost:3000/attendance/summary', { params });
      
      setAttendanceData(response.data.dailyData || []);
      setSummaryData(response.data.summary || null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch attendance data');
    } finally {
      setLoading(false);
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    if (!attendanceData.length) return;

    const worksheet = XLSX.utils.json_to_sheet(
      attendanceData.map(item => ({
        Date: format(new Date(item.date), 'MMMM d, yyyy'),
        'Total Students': item.total,
        Present: item.present,
        Absent: item.absent,
        Late: item.late,
        'Attendance Percentage': `${Math.round((item.present / item.total) * 100)}%`
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AttendanceSummary");
    XLSX.writeFile(workbook, `Attendance_Summary_${format(new Date(), 'yyyyMMdd')}.xlsx`);
  };

  // Chart data
  const barChartData = {
    labels: attendanceData.map(item => format(new Date(item.date), 'MMM d')),
    datasets: [
      {
        label: 'Present',
        data: attendanceData.map(item => item.present),
        backgroundColor: '#4ade80',
        borderColor: '#22c55e',
        borderWidth: 1
      },
      {
        label: 'Absent',
        data: attendanceData.map(item => item.absent),
        backgroundColor: '#f87171',
        borderColor: '#ef4444',
        borderWidth: 1
      },
      {
        label: 'Late',
        data: attendanceData.map(item => item.late),
        backgroundColor: '#fbbf24',
        borderColor: '#f59e0b',
        borderWidth: 1
      },
    ]
  };

  const pieChartData = summaryData ? {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [{
      data: [summaryData.totalPresent, summaryData.totalAbsent, summaryData.totalLate],
      backgroundColor: ['#4ade80', '#f87171', '#fbbf24'],
      borderColor: ['#22c55e', '#ef4444', '#f59e0b'],
      borderWidth: 1
    }]
  } : null;

  return (
    <div className="dashboard-body bg-gray-50">
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
              <span className="text-main-600 fw-normal text-15">Manage Attendance</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-6">
        {/* Filters Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-16">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Attendance Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <select
                className="w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>{course.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
              <select
                className="w-full rounded-md border p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div className="flex gap-2">
                <DatePicker
                  selected={dateRange.start}
                  onChange={(date) => setDateRange({...dateRange, start: date})}
                  selectsStart
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  maxDate={new Date()}
                  className="w-full border p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  placeholderText="Start date"
                />
                <DatePicker
                  selected={dateRange.end}
                  onChange={(date) => setDateRange({...dateRange, end: date})}
                  selectsEnd
                  startDate={dateRange.start}
                  endDate={dateRange.end}
                  minDate={dateRange.start}
                  maxDate={new Date()}
                  className="w-full rounded-md border p-2  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  placeholderText="End date"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAttendanceData}
              disabled={loading || !selectedCourse || !selectedBatch}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <FiRefreshCw className="animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <FiFilter />
                  Apply Filters
                </>
              )}
            </button>

            {attendanceData.length > 0 && (
              <button
                onClick={exportToExcel}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                <FiDownload />
                Export Data
              </button>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Summary Cards */}
        {summaryData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total Students</p>
                  <h3 className="text-2xl font-bold text-gray-800">{summaryData.totalStudents}</h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FiUsers size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Present</p>
                  <h3 className="text-2xl font-bold text-green-600">{summaryData.totalPresent}</h3>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <FiCheckCircle size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Absent</p>
                  <h3 className="text-2xl font-bold text-red-600">{summaryData.totalAbsent}</h3>
                </div>
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <FiXCircle size={20} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Late</p>
                  <h3 className="text-2xl font-bold text-yellow-600">{summaryData.totalLate}</h3>
                </div>
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <FiClock size={20} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        {attendanceData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Attendance Trend</h3>
              <Bar 
                data={barChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Attendance by Day',
                    },
                  },
                }}
              />
            </div>

            {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Attendance</h3>
              <div className="h-64">
                <Pie 
                  data={pieChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Overall Attendance Rate</span>
                  <span className="font-semibold text-blue-600">
                    {Math.round((summaryData.totalPresent / summaryData.totalRecords) * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Average Daily Present</span>
                  <span className="font-semibold text-blue-600">
                    {Math.round(summaryData.totalPresent / attendanceData.length)}
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        )}

        {/* Detailed Table */}
        {attendanceData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Detailed Attendance Records</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {format(new Date(item.date), 'MMMM d, yyyy')}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.total}</td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{item.present}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{item.absent}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">{item.late}</td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                        {Math.round((item.present / item.total) * 100)}%
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;