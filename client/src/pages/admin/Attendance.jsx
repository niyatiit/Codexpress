import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv'; // For exporting data

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Attendance = () => {
  const allData = [
    { batch: 'Java', course: 'Full Stack', total: 30, present: 25, absent: 5 },
    { batch: 'C++', course: 'C Programming', total: 25, present: 20, absent: 5 },
    { batch: 'Web Development', course: 'Web Dev Basics', total: 40, present: 30, absent: 10 },
    { batch: 'React', course: 'Full Stack', total: 35, present: 28, absent: 7 },
    { batch: 'Node.js', course: 'Full Stack', total: 20, present: 18, absent: 2 },
  ];

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [filteredData, setFilteredData] = useState(allData); // Set initial data

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      const data = allData.filter(item => {
        return (
          (selectedCourse ? item.course === selectedCourse : true) &&
          (selectedBatch ? item.batch === selectedBatch : true)
        );
      });
      setFilteredData(data);
      setIsLoading(false);
    }, 1000); // Simulate API delay
  }, [selectedCourse, selectedBatch]);

  const courses = [...new Set(allData.map(item => item.course))];
  const batches = selectedCourse
    ? [...new Set(allData.filter(item => item.course === selectedCourse).map(item => item.batch))]
    : [];

  const data = {
    labels: filteredData.map(item => item.batch),
    datasets: [
      {
        label: 'Present',
        data: filteredData.map(item => item.present),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Absent',
        data: filteredData.map(item => item.absent),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Attendance by Batch',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link to="/admin" className="text-gray-800 fw-normal text-15 hover-text-main-600">
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

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">Attendance by Batch</h5>
        </div>
        <div className="card-body">
          {/* Filters for Course and Batch */}
          <div className="filters mb-4 flex-wrap gap-4">
            <div className="d-flex">
              <select
                className="form-control"
                value={selectedCourse}
                onChange={e => {
                  setSelectedCourse(e.target.value);
                  setSelectedBatch('');
                }}
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              <select
                className="form-control ms-4"
                value={selectedBatch}
                onChange={e => setSelectedBatch(e.target.value)}
                disabled={!selectedCourse}
              >
                <option value="">Select Batch</option>
                {batches.map(batch => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Button */}
            <div className="d-flex align-items-center">
              <CSVLink
                data={filteredData}
                headers={[
                  { label: 'Batch', key: 'batch' },
                  { label: 'Course', key: 'course' },
                  { label: 'Present', key: 'present' },
                  { label: 'Absent', key: 'absent' },
                  { label: 'Total Students', key: 'total' },
                ]}
                filename="attendance_report.csv"
                className="btn btn-sm btn-outline-success text-green-600 border-green-600 hover:text-white hover:bg-green-600"
              >
                Export Report
              </CSVLink>
            </div>
          </div>

          {/* Loading Spinner */}
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Attendance Bar Chart */}
              <Bar data={data} options={options} />

              {/* Attendance Summary */}
              <div className="attendance-summary mt-4">
                <h6>Attendance Summary</h6>
                <ul>
                  <li>Total Students: {filteredData.reduce((acc, item) => acc + item.total, 0)}</li>
                  <li>Total Present: {filteredData.reduce((acc, item) => acc + item.present, 0)}</li>
                  <li>Total Absent: {filteredData.reduce((acc, item) => acc + item.absent, 0)}</li>
                  <li>
                    Overall Attendance: {(
                      (filteredData.reduce((acc, item) => acc + item.present, 0) /
                        filteredData.reduce((acc, item) => acc + item.total, 0)) *
                      100
                    ).toFixed(2)}%
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
