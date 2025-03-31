import React, { useState } from 'react';

const AdminCertificateAssignment = () => {
  const [filter, setFilter] = useState('pending');
  const students = [
    {
      id: '101',
      name: 'John Doe',
      course: 'Web Development Fundamentals',
      progress: 100,
      examScore: 92,
      status: 'pending'
    },
    {
      id: '102',
      name: 'Jane Smith',
      course: 'Data Science Basics',
      progress: 100,
      examScore: 88,
      status: 'approved'
    },
    {
      id: '103',
      name: 'Mike Johnson',
      course: 'Web Development Fundamentals',
      progress: 95,
      examScore: null,
      status: 'incomplete'
    }
  ];

  const filteredStudents = students.filter((student) => 
    filter === 'all' ? true : student.status === filter
  );

  const handleApprove = (studentId) => {
    // Handle approval logic
    console.log(`Approved certificate for student ${studentId}`);
    alert('Certificate approved successfully!');
  };

  return (
    <div className="dashboard-body">
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <a href="/admin" className="text-gray-200 fw-normal text-15 hover-text-main-600">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            <li>
              <span className="text-main-600 fw-normal text-15">Certificate Assignment</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between">
          <h5 className="mb-0">Certificate Assignment</h5>
          <div className="flex gap-8">
            <select
              className="form-select form-select-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="incomplete">Incomplete</option>
              <option value="all">All Students</option>
            </select>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Course</th>
                  <th>Progress</th>
                  <th>Exam Score</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>
                      <div className="progress progress-sm">
                        <div
                          className="progress-bar bg-main-600"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <small>{student.progress}%</small>
                    </td>
                    <td>{student.examScore || '-'}</td>
                    <td>
                      <span className={`badge ${
                        student.status === 'approved' ? 'bg-success' :
                        student.status === 'pending' ? 'bg-warning' : 'bg-secondary'
                      }`}>
                        {student.status === 'approved' ? 'Approved' :
                         student.status === 'pending' ? 'Pending' : 'Incomplete'}
                      </span>
                    </td>
                    <td>
                      {student.status === 'pending' && student.progress === 100 && (
                        <button
                          className="btn btn-sm btn-main"
                          onClick={() => handleApprove(student.id)}
                        >
                          Approve Certificate
                        </button>
                      )}
                      {student.status === 'approved' && (
                        <span className="text-success">Certificate Issued</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCertificateAssignment;