import React, { useState, useEffect } from "react";

const BatchAssignmentForm = ({ enrollment, batches, onAssignBatch }) => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // Check if a batch is already assigned
  useEffect(() => {
    if (enrollment) {
      const assignedCourse = enrollment.courses.find(
        (course) => course.course_id === batches[0]?.course_id
      );
      if (assignedCourse && assignedCourse.batch_id) {
        setSelectedBatch(assignedCourse.batch_id); // Pre-select the assigned batch
        setIsUpdateMode(true); // Enable update mode
      }
    }
  }, [enrollment, batches]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBatch) {
      alert("Please select a batch.");
      return;
    }
    onAssignBatch(selectedBatch); // Call the parent function to assign/update the batch
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">
        {isUpdateMode ? "Update Batch for" : "Assign Batch to"} {enrollment.user_id.username}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select Batch</label>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required // Ensure a batch is selected
          >
            <option value="">Select a batch</option>
            {batches.map((batch) => (
              <option key={batch._id} value={batch._id}>
                {batch.name} (Start: {new Date(batch.start_date).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={`${
            isUpdateMode ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded-md transition duration-150 ease-in-out`}
        >
          {isUpdateMode ? "Update Batch" : "Assign Batch"}
        </button>
      </form>
    </div>
  );
};

export default BatchAssignmentForm;