import React, { useState } from "react";

const ViewAssignments = () => {
  // Dummy data for assignment submissions
  const [assignments, setAssignments] = useState([
    { id: 1, student: "John Doe", title: "React Basics", course: "React", batch: "Batch A", submittedOn: "2025-02-10 10:30 AM" },
    { id: 2, student: "Jane Smith", title: "Java OOP Concepts", course: "Java", batch: "Batch B", submittedOn: "2025-02-09 4:15 PM" },
    { id: 3, student: "Sam Wilson", title: "HTML Forms", course: "Web Development", batch: "Batch C", submittedOn: "2025-02-09 1:45 PM" },
  ]);

  // State for search functionality
  const [search, setSearch] = useState("");

  // Filtered list of assignments based on search input
  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.student.toLowerCase().includes(search.toLowerCase()) ||
      assignment.title.toLowerCase().includes(search.toLowerCase()) ||
      assignment.course.toLowerCase().includes(search.toLowerCase()) ||
      assignment.batch.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-body">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <a href="/faculty" className="text-gray-800 fw-normal text-15 hover-text-main-600">
                Home
              </a>
            </li>
            <li>
              <span className="text-gray-500 fw-normal d-flex">
                <i className="ph ph-caret-right"></i>
              </span>
            </li>
            {/* <li>
              <a href="/assignments" className="text-gray-800 fw-normal text-15 hover-text-main-600">
                Assignments
              </a>
            </li> */}
            <li>
              <span className="text-main-600 fw-normal text-15">View Assignments</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Card for Assignment List */}
      <div className="card">
        <div className="card-header border-bottom border-gray-100 flex-between gap-8">
          <h5 className="mb-0 text-gray-800">View Assignments</h5>
          <input
            type="text"
            placeholder="Search by student, title, course, or batch..."
            className="form-control w-50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead className="bg-gray-100">
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Assignment Title</th>
                  <th>Course</th>
                  <th>Batch</th>
                  <th>Submitted On</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment, index) => (
                    <tr key={assignment.id}>
                      <td>{index + 1}</td>
                      <td>{assignment.student}</td>
                      <td>{assignment.title}</td>
                      <td>{assignment.course}</td>
                      <td>{assignment.batch}</td>
                      <td>{assignment.submittedOn}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-gray-600">
                      No assignments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAssignments;
