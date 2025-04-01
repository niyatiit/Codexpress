import { useState, useEffect } from "react";
import axios from "axios";

const ViewAssignments = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/enrollments/user/${userId}`
        );
        setCourses(response.data.enrollments[0].courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [userId]);

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    if (!courseId) {
      setSelectedCourse(null);
      setBatches([]);
      setSelectedBatch("");
      setAssignments([]);
      return;
    }

    const selected = courses.find((c) => c.course_id._id === courseId);
    setSelectedCourse(selected);
    
    // Prepare batches data - only include if batch_id exists and is not null
    const availableBatches = selected.batch_id 
      ? [{ _id: selected.batch_id, name: `Batch ${selected.batch_id.slice(-4)}` }] 
      : [];
    setBatches(availableBatches);
    setSelectedBatch("");
    setAssignments([]);
  };

  const handleBatchChange = async (e) => {
    const batchId = e.target.value;
    setSelectedBatch(batchId);

    if (!batchId || !selectedCourse) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/assignments?course_id=${selectedCourse.course_id._id}&batch_id=${batchId}`
      );
      setAssignments(response.data.assignments || []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">View Assignments</h2>

        {/* Course Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Course:</label>
          <select
            onChange={handleCourseChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">-- Select Course --</option>
            {courses.map((course) => (
              <option key={course.course_id._id} value={course.course_id._id}>
                {course.course_id.name}
              </option>
            ))}
          </select>
        </div>

        {/* Batch Dropdown */}
        {selectedCourse && batches.length > 0 && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Select Batch:</label>
            <select
              onChange={handleBatchChange}
              value={selectedBatch}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="">-- Select Batch --</option>
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Assignments List */}
        {!loading && selectedBatch && (
          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Assignments</h3>
            {assignments.length > 0 ? (
              <ul className="space-y-4">
                {assignments.map((assignment) => (
                  <li key={assignment._id} className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50">
                    <h4 className="font-medium text-blue-600">{assignment.title}</h4>
                    <p className="text-gray-600 mt-1">{assignment.description}</p>
                    {assignment.dueDate && (
                      <p className="text-sm text-gray-500 mt-2">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No assignments found for this batch.</p>
            )}
          </div>
        )}

        {/* No batches available message */}
        {selectedCourse && batches.length === 0 && !loading && (
          <p className="text-gray-500 italic">No batches available for the selected course.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAssignments;