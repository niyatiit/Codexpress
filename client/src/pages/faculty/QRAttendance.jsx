import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv'; // For exporting data

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QRAttendance = () => {
  const allData = [
    { employee: 'John Doe', id: 'EMP001', total: 22, present: 20, absent: 2 },
    { employee: 'Jane Smith', id: 'EMP002', total: 22, present: 21, absent: 1 },
    { employee: 'Michael Johnson', id: 'EMP003', total: 22, present: 19, absent: 3 },
    { employee: 'Emily Davis', id: 'EMP004', total: 22, present: 22, absent: 0 },
    { employee: 'David Wilson', id: 'EMP005', total: 22, present: 18, absent: 4 },
  ];

  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(allData);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      const data = allData.filter(item => {
        return selectedEmployee ? item.employee === selectedEmployee : true;
      });
      setFilteredData(data);
      setIsLoading(false);
    }, 1000);
  }, [selectedEmployee]);

  const employees = [...new Set(allData.map(item => item.employee))];

  const data = {
    labels: filteredData.map(item => item.employee),
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
        text: 'QR Attendance Overview',
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
              <span className="text-main-600 fw-normal text-15">QR Attendance</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">QR Attendance Details</h5>
        </div>
        <div className="card-body">
          {/* Filters for Employees */}
          <div className="filters mb-4 flex-wrap gap-4">
            <div className="d-flex">
              <select
                className="form-control"
                value={selectedEmployee}
                onChange={e => setSelectedEmployee(e.target.value)}
              >
                <option value="">Select Employee</option>
                {employees.map(employee => (
                  <option key={employee} value={employee}>
                    {employee}
                  </option>
                ))}
              </select>
            </div>

            {/* Export Button */}
            <div className="d-flex align-items-center">
              <CSVLink
                data={filteredData}
                headers={[
                  { label: 'Employee Name', key: 'employee' },
                  { label: 'Employee ID', key: 'id' },
                  { label: 'Present', key: 'present' },
                  { label: 'Absent', key: 'absent' },
                  { label: 'Total Days', key: 'total' },
                ]}
                filename="qr_attendance_report.csv"
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
                  <li>Total Days: {filteredData.reduce((acc, item) => acc + item.total, 0)}</li>
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

export default QRAttendance;
