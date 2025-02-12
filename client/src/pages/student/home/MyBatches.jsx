import React from 'react';
import { Link } from 'react-router-dom';

const MyBatches = () => {
  // Sample batch data for illustration
  const currentBatch = [
    {
      batchName: "Frontend Development",
      course: "Web Development",
      startDate: "2025-01-15",
      endDate: "2025-04-15",
      batchTiming: "10:00 AM - 12:00 PM",
      days: ["Monday", "Wednesday", "Friday"],
      faculty: "Dr. John Doe",
      description: "This batch focuses on building responsive websites using HTML, CSS, and JavaScript.",
    },
    {
      batchName: "Backend Development",
      course: "Web Development",
      startDate: "2025-01-15",
      endDate: "2025-04-15",
      batchTiming: "10:00 AM - 12:00 PM",
      days: ["Monday", "Wednesday", "Friday"],
      faculty: "Dr. John Doe",
      description: "This batch focuses on building backend systems using Node.js and Express.",
    },
  ];

  const pastBatches = [
    {
      batchName: "JavaScript Basics",
      course: "Programming",
      startDate: "2024-06-01",
      endDate: "2024-09-01",
      batchTiming: "2:00 PM - 4:00 PM",
      days: ["Tuesday", "Thursday"],
      faculty: "Prof. Jane Smith",
      description: "Introduction to JavaScript for beginners.",
    },
    {
      batchName: "React Development",
      course: "Web Development",
      startDate: "2024-09-10",
      endDate: "2024-12-10",
      batchTiming: "11:00 AM - 1:00 PM",
      days: ["Monday", "Wednesday", "Friday"],
      faculty: "Dr. Mike Brown",
      description: "Intermediate React course covering state management and hooks.",
    },
  ];

  return (
    <div className="dashboard-body p-6">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title">My Batches</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/student">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">My</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Current Batch Section */}
      <div className="card bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="card-header flex justify-between items-center border-b border-gray-200 pb-4">
          <h5 className="text-xl font-semibold">Current Batch</h5>
          <Link to="/batch-details" className="text-main-600 hover:text-main-800 flex items-center gap-2">
            <i className="ph ph-link-simple" /> View Details
          </Link>
        </div>
        <div className="card-body">
          {currentBatch.length > 0 ? (
            currentBatch.map((batch, index) => (
              <div key={index} className="batch-detail mb-4 p-4 rounded-lg shadow-md">
                <h6 className="font-semibold text-lg">{batch.batchName}</h6>
                <p className="bg-blue-100 my-2 mx-0 inline-block px-3 py-1 rounded-xl">{batch.course}</p>
                <div className="flex justify-between">
                  <p><strong><i className="ph ph-calendar" /> Start Date:</strong> {batch.startDate}</p>
                  <p><strong><i className="ph ph-calendar" /> End Date:</strong> {batch.endDate}</p>
                </div>
                <p><strong><i className="ph ph-clock" /> Batch Timing:</strong> {batch.batchTiming}</p>
                <p><strong>Days:</strong> {batch.days.join(", ")}</p>
                <p><strong>Description:</strong> {batch.description}</p>
                <Link
                  to={`/batch-details/${batch.batchName}`}
                  className="mt-4 inline-block bg-main-600 text-white py-2 px-12 rounded-lg shadow-lg hover:bg-main-700 transition duration-200"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500">You have not joined any past batches yet.</p>
          )}
        </div>
      </div>

      {/* Past Batches Section */}
      <div className="card bg-white p-6 rounded-xl shadow-lg">
        <div className="card-header flex justify-between items-center border-b border-gray-200 pb-4">
          <h5 className="text-xl font-semibold">Past Batches</h5>
        </div>
        <div className="card-body">
          {pastBatches.length > 0 ? (
            pastBatches.map((batch, index) => (
              <div key={index} className="batch-detail mb-4 p-4 bg-gray-100 rounded-lg shadow-sm opacity-50">
                <h6 className="font-semibold text-lg">{batch.batchName}</h6>
                <p className="bg-blue-100 my-2 mx-0 inline-block px-3 py-1 rounded-xl">{batch.course}</p>
                <div className="flex justify-between">
                  <p><strong><i className="ph ph-calendar" /> Start Date:</strong> {batch.startDate}</p>
                  <p><strong><i className="ph ph-calendar" /> End Date:</strong> {batch.endDate}</p>
                </div>
                <p><strong><i className="ph ph-clock" /> Batch Timing:</strong> {batch.batchTiming}</p>
                <p><strong>Days:</strong> {batch.days.join(", ")}</p>
                <p><strong><i className="ph ph-person" /> Faculty:</strong> {batch.faculty}</p>
                <p><strong>Description:</strong> {batch.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">You have not joined any past batches yet.</p>
          )}
        </div>
      </div>

      {/* Enroll Button
      <div className="text-center mt-8">
        <Link to="/enroll" className="bg-main-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-main-700 transition duration-200">
          Enroll in New Batch
        </Link>
      </div> */}
    </div>
  );
};

export default MyBatches;
