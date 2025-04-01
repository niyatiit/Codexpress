import React from 'react';
import { CalendarIcon, ArrowRightIcon, ClockIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecentAssignments = ({ assignments }) => {
  // Function to calculate days remaining
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Function to determine status color
  const getStatusColor = (dueDate) => {
    const daysRemaining = getDaysRemaining(dueDate);
    if (daysRemaining < 0) return "text-red-600 bg-red-50";
    if (daysRemaining <= 3) return "text-amber-600 bg-amber-50";
    return "text-green-600 bg-green-50";
  };

  // Function to get status text
  const getStatusText = (dueDate) => {
    const daysRemaining = getDaysRemaining(dueDate);
    if (daysRemaining < 0) return "Overdue";
    if (daysRemaining === 0) return "Due today";
    if (daysRemaining === 1) return "Due tomorrow";
    return `${daysRemaining} days left`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-28 mt-8">
      <div className="flex justify-between items-center mb-30 border-b pb-4">
        <h4 className="text-xl font-semibold text-gray-800">Recent Assignments</h4>
        <a href='student/view/assignments' className="text-blue-600 text-sm font-medium hover:text-blue-800">
          View All
        </a>
      </div>
      
      <div className="overflow-x-auto">
        <div className="grid gap-4">
          {assignments.map((assignment) => {
            const statusClass = getStatusColor(assignment.due_date);
            const daysText = getStatusText(assignment.due_date);
            
            return (
              <div 
                key={assignment._id}
                className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-grow">
                  <h5 className="font-semibold text-gray-800">{assignment.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">{assignment.course_id.name}</p>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon size={16} className="text-gray-500" />
                  <span className="text-gray-600">
                    {new Date(assignment.due_date).toLocaleDateString()}
                  </span>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass} flex items-center gap-1`}>
                  <ClockIcon size={14} />
                  {daysText}
                </div>
                
                <Link 
                  to={`/student/assignments/${assignment._id}`}
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  View Details
                  <ArrowRightIcon size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentAssignments;