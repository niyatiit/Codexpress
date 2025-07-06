import React from "react";
import { Link } from "react-router-dom";

const EnrollmentTable = ({ enrollments }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"; // Yellow for pending
      case "enrolled":
        return "bg-green-100 text-green-800"; // Green for enrolled
      case "cancelled":
        return "bg-red-100 text-red-800"; // Red for cancelled
      default:
        return "bg-gray-100 text-gray-800"; // Default gray
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="bg-blue-600 text-center">
            <th className="px-20 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
              Name
            </th>
            <th className="px-8 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
              Email
            </th>
            <th className="px-8 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
              Course
            </th>
            <th className="px-8 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-8 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
              
            </th>
            {/* <th className="px-8 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
              
            </th> */}
          </tr>
        </thead>
        <tbody>
          {enrollments.length === 0 ? (
            <tr className="divide-y divide-gray-200 bg-red-500">
              <td className="bg-white text-center p-3" colSpan={5}>
                No enrollments found.
              </td>
            </tr>
          ) : (
            enrollments.map((enrollment) => (
              <React.Fragment key={enrollment._id}>
                {enrollment.courses.map((course) => (
                  <tr
                    key={course._id}
                    className="divide-y divide-gray-200 hover:bg-blue-50 transition duration-150 ease-in-out"
                  >
                    <td className="pl-6 py-4 text-sm font-medium text-gray-900">
                      {enrollment.user_id.first_name || "Student"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {enrollment.user_id.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {course.course_id.name} {/* Display course name */}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          course.enrollment_status
                        )}`}
                      >
                        {course.enrollment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {/* Show "Assign Batch" button only if no batch is assigned */}
                      {!course.batch_id ? (
                        <Link
                          to={`/admin/assign/batch/${enrollment.user_id._id}?course_id=${course.course_id?._id || course.course_id}`}
                          className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out"
                        >
                          Assign Batch
                        </Link>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500 px-3 rounded-md py-2 bg-gray-100">
                            Batch Assigned
                          </span>

                        </div>
                      )}
                    </td>
                    {/* <td>
                      <Link
                      to={`/admin/assign/batch/${enrollment.user_id._id}?course_id=${course.course_id?._id || course.course_id}`}
                      className="inline-flex underline items-center px-1 py-2 text-yellow-500"
                    >
                      Edit
                    </Link></td> */}
                  </tr>
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentTable;