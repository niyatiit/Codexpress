import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, ArrowRightIcon, ClockIcon } from "lucide-react";
import axios from "axios";

const ViewAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).id; // Get user ID from localStorage
        const response = await axios.get(`http://localhost:3000/enrollments/user/${userId}`);
        
        const { enrollments, assignments } = response.data;
        
        // Extract enrolled course IDs
        const enrolledCourseIds = enrollments.flatMap(enrollment =>
          enrollment.courses.map(course => course.course_id._id)
        );

        // Filter assignments to only those in enrolled courses
        const filteredAssignments = assignments.filter(assignment =>
          enrolledCourseIds.includes(assignment.course_id)
        );

        setAssignments(filteredAssignments);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAssignments();
  }, []);

  return (
    <div className="dashboard-body">
    
      <div className="card">
        <div className="card-body">
          {isLoading ? (
            <div className="loading-message text-center text-gray-600">Loading assignments...</div>
          ) : (
            <div className="assignment-list">
              {assignments.map(assignment => (
                <div key={assignment._id} className="assignment-item card mb-4">
                  <div className="card-header border-bottom border-gray-100">
                    <h6 className="mb-0 text-gray-800">{assignment.title}</h6>
                  </div>
                  <div className="card-body">
                    <p><strong>Course:</strong> {assignment.course_id.name}</p>
                    <p><strong>Description:</strong> {assignment.description}</p>
                    <p><strong>Due Date:</strong> {new Date(assignment.due_date).toLocaleDateString()}</p>
                    <Link to={`/student/assignments/${assignment._id}`} className="text-blue-600 hover:underline">
                      View Details
                    </Link>
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