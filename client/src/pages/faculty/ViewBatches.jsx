import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewBatches = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const [searchParams] = useSearchParams();
  const courseIdFromUrl = searchParams.get("course");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        // Fetch assigned courses
        const coursesRes = await axios.get(
          `http://localhost:3000/faculty/${userId}/assigned-courses`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setCourses(coursesRes.data.courses || []);

        // Priority 1: Use course ID from URL if provided
        if (courseIdFromUrl) {
          setSelectedCourse(courseIdFromUrl);
          await fetchBatches(courseIdFromUrl);
        }
        // Priority 2: Select the first course by default if no URL param
        else if (coursesRes.data.courses?.length > 0) {
          const initialCourse = coursesRes.data.courses[0]._id;
          setSelectedCourse(initialCourse);
          await fetchBatches(initialCourse);
        } else {
          setBatches([]);
        }

        setHasFetched(true);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load initial data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [userId, courseIdFromUrl]);

  const fetchBatches = async (courseId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:3000/courses/${courseId}/batches`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBatches(response.data.data || []);
    } catch (error) {
      console.error("Error fetching batches:", error);
      toast.error("Failed to fetch batches");
      setBatches([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    if (courseId) {
      await fetchBatches(courseId);
    } else {
      setBatches([]);
    }
  };

  const isBatchExpired = (endDate) => {
    if (!endDate) return false;

    // Get current date in UTC (ignoring local timezone)
    const todayUTC = new Date();
    todayUTC.setUTCHours(0, 0, 0, 0);

    // Parse the batch end date (already in UTC format)
    const batchEndDate = new Date(endDate);

    return batchEndDate < todayUTC;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-body p-20">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-with-buttons mb-24 flex-between flex-wrap gap-8">
        <div className="breadcrumb mb-24">
          <ul className="flex-align gap-4">
            <li>
              <Link
                to="/faculty"
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
              <span className="text-main-600 fw-normal text-15">View Batches</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Course Selection Dropdown */}
      <div className="bg-white rounded-lg p-16 shadow-sm">
        <h5 className="text-xl font-semibold mb-4 text-gray-800">Select Course</h5>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCourse}
          onChange={handleCourseChange}
          disabled={isLoading}
        >
          <option value="">-- Select a Course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Batches Table */}
      {selectedCourse && (
        <div className="bg-white rounded-lg p-24 mt-6 shadow-sm">
          <h5 className="text-xl font-semibold mb-4 text-gray-800">
            Available Batches for {courses.find(c => c._id === selectedCourse)?.name || "Selected Course"}
          </h5>

          {batches.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left text-sm font-semibold text-gray-600">Batch Name</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600">Start Date</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600">End Date</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600">Batch Type</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600">Seats Available</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((batch) => {
                    const expired = isBatchExpired(batch.end_date);
                    return (
                      <tr
                        key={batch._id}
                        className={`border-b border-gray-100 ${expired ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-50'}`}
                      >
                        <td className="p-3 text-sm text-gray-700">
                          {batch.name}
                          {expired && <span className="ml-2 text-xs text-red-500">(Expired)</span>}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {new Date(batch.start_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                          })}
                        </td>
                        <td className="p-3 text-sm text-gray-700">
                          {new Date(batch.end_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                          })}
                        </td>

                        <td className="p-3 text-sm text-gray-700">{batch.batch_type}</td>
                        <td className="p-3 text-sm text-gray-700">{batch.seats_available}</td>
                        <td className="p-3 text-sm">
                          {expired ? (
                            <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-md text-xs">
                              Inactive
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                              Active
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-gray-500">No batches available for this course.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewBatches;