import React, { useState } from "react";
import { Link } from "react-router-dom";
const ViewAttendance = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Mock attendance data (Replace this with actual API call)
  const attendanceData = {
    "2025-02-01": "P",
    "2025-02-02": "A",
    "2025-02-03": "P",
    "2025-02-04": "P",
    "2025-02-05": "A",
    "2025-02-06": "P",
    "2025-02-07": "P",
    "2025-02-08": "P",
    "2025-02-09": "A",
    "2025-02-10": "P",
    "2025-02-11": "P",
    "2025-02-12": "A",
    "2025-02-13": "P",
  };

  // Get the number of days in the selected month
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  // Function to handle month navigation
  const changeMonth = (offset) => {
    let newMonth = selectedMonth + offset;
    let newYear = selectedYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  return (
    <div className="dashboard-body p-6">
      <div className="breadcrumb-bar breadcrumb-bar-info">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <h2 className="breadcrumb-title">My Attendance</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/student">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">My Attendance</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="attendance-container">
        {/* Breadcrumb Navigation */}

        {/* Month Navigation */}
        <div className="month-navigation">
          <button onClick={() => changeMonth(-1)}>← Previous</button>
          <h3>
            {new Date(selectedYear, selectedMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <button
            onClick={() => changeMonth(1)}
            disabled={selectedYear === currentDate.getFullYear() && selectedMonth === currentDate.getMonth()}
          >
            Next →
          </button>
        </div>

        {/* Attendance Grid */}
        <div className="attendance-grid">
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const formattedDate = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const status = attendanceData[formattedDate] || (new Date(selectedYear, selectedMonth, day) > currentDate ? "future" : "A");

            return (
              <div
                key={day}
                className={`attendance-day ${status === "P" ? "present" : status === "A" ? "absent" : "disabled"}`}
              >
                <p>{status === "P" ? "P" : status === "A" ? "A" : day}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;
