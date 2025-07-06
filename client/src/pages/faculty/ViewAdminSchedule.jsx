import React, { useState } from "react";

const ViewAdminSchedule = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [viewTime, setViewTime] = useState(null); // Track the time when "View Schedule" is clicked

  // Dummy schedule data for the table
  const dummySchedules = [
    {
      id: 1,
      course: "Java",
      batch: "Batch A",
      date: "2025-02-12",
      topic: "Inheritance in Java",
    },
    {
      id: 2,
      course: "React",
      batch: "Batch B",
      date: "2025-02-13",
      topic: "Hooks Overview",
    },
    {
      id: 3,
      course: "Python",
      batch: "Batch C",
      date: "2025-02-14",
      topic: "Working with APIs",
    },
  ];

  // Filter schedules based on course and batch
  const handleViewSchedule = () => {
    const filteredSchedules = dummySchedules.filter(
      (schedule) =>
        (selectedCourse === "" || schedule.course === selectedCourse) &&
        (selectedBatch === "" || schedule.batch === selectedBatch)
    );
    setSchedules(filteredSchedules);

    // Set current time when "View Schedule" is clicked
    const currentTime = new Date().toLocaleTimeString();
    setViewTime(currentTime);
  };

  return (
    <div className="view-admin-schedule-page p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">View Admin Schedule</h1>
        <p className="text-gray-600">
          View schedules for all courses and batches.
        </p>
      </div>

      {/* Form for Course and Batch Selection */}
      <div className="card bg-white p-6 shadow-md rounded-lg space-y-6">
        {/* Select Course */}
        <div>
          <label
            htmlFor="selectedCourse"
            className="block text-gray-700 font-medium"
          >
            Select Course
          </label>
          <select
            id="selectedCourse"
            className="form-control border-gray-300 rounded-md p-2 w-full"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Select Course --</option>
            <option value="Java">Java</option>
            <option value="React">React</option>
            <option value="Python">Python</option>
          </select>
        </div>

        {/* Select Batch */}
        <div>
          <label
            htmlFor="selectedBatch"
            className="block text-gray-700 font-medium"
          >
            Select Batch
          </label>
          <select
            id="selectedBatch"
            className="form-control border-gray-300 rounded-md p-2 w-full"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">-- Select Batch --</option>
            <option value="Batch A">Batch A</option>
            <option value="Batch B">Batch B</option>
            <option value="Batch C">Batch C</option>
          </select>
        </div>

        {/* View Schedule Button */}
        <div>
          <button
            onClick={handleViewSchedule}
            className="btn bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-600"
          >
            View Schedule
          </button>
        </div>
      </div>

      {/* Display Time of Viewing */}
      {viewTime && (
        <div className="bg-gray-100 p-4 rounded-md shadow">
          <p className="text-gray-700 font-medium">
            Schedule viewed at: <span className="font-bold">{viewTime}</span>
          </p>
        </div>
      )}

      {/* Schedule Table */}
      {schedules.length > 0 ? (
        <div className="card bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Schedule</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Topic
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Course
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Batch
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {schedule.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {schedule.topic}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {schedule.course}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {schedule.batch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No schedules available.</p>
      )}
    </div>
  );
};

export default ViewAdminSchedule;
