import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch assignments from API or use a placeholder
    setTimeout(() => {
      setAssignments([
        {
          id: 1,
          course: "Java",
          batch: "Batch A",
          title: "Java Assignment 1",
          description: "Complete the Java Basics exercises.",
          dueDate: "2025-02-20",
          file: "java_assignment_1.pdf",
        },
        {
          id: 2,
          course: "React",
          batch: "Batch B",
          title: "React Assignment 1",
          description: "Build a simple React application.",
          dueDate: "2025-02-25",
          file: "react_assignment_1.pdf",
        },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="dashboard-body">
{/* Breadcrumb Navigation */}
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title text-gray-800">My Assignments</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/student" className="text-blue-600 hover:text-blue-800">
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      My Assignments
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
       
        <div className="card-body">
          {isLoading ? (
            <div className="loading-message text-center text-gray-600">Loading assignments...</div>
          ) : (
            <div className="assignment-list">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="assignment-item card mb-4">
                  <div className="card-header border-bottom border-gray-100">
                    <h6 className="mb-0 text-gray-800">{assignment.title}</h6>
                  </div>

                  <div className="card-body">
                    <p><strong>Course:</strong> {assignment.course}</p>
                    <p><strong>Batch:</strong> {assignment.batch}</p>
                    <p><strong>Description:</strong> {assignment.description}</p>
                    <p><strong>Due Date:</strong> {assignment.dueDate}</p>
                    <p><strong>Uploaded File:</strong> <a href={`#`} className="text-main-600">{assignment.file}</a></p>
                    <div className="form-actions flex-end gap-4">
                      <button
                        className="btn btn-primary text-white bg-main-600 border-main-600 hover:bg-main-700"
                        onClick={() => alert("Download functionality not implemented yet")}
                      >
                        Download Assignment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAssignments;
