import React, { useState } from "react";
import { CSVLink } from "react-csv";

const AttendanceReport = () => {
  const [courses] = useState([
    { id: "1", name: "React Development" },
    { id: "2", name: "Node.js Backend" },
    { id: "3", name: "JavaScript Fundamentals" },
    { id: "4", name: "UI/UX Design" },
  ]);
  
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const mockBatches = {
    "1": [
      { id: "101", name: "Morning Batch (9AM-12PM)", startDate: "2023-01-15", endDate: "2023-04-15" },
      { id: "102", name: "Evening Batch (6PM-9PM)", startDate: "2023-02-10", endDate: "2023-05-10" },
      { id: "103", name: "Weekend Batch (Sat-Sun)", startDate: "2023-03-01", endDate: "2023-06-01" },
    ],
    "2": [
      { id: "201", name: "Regular Batch", startDate: "2023-01-20", endDate: "2023-05-20" },
      { id: "202", name: "Fast-track Batch", startDate: "2023-03-15", endDate: "2023-07-15" },
    ],
    "3": [
      { id: "301", name: "Foundation Batch", startDate: "2023-02-01", endDate: "2023-03-15" },
    ],
    "4": [
      { id: "401", name: "Design Mastery Batch", startDate: "2023-01-10", endDate: "2023-04-10" },
      { id: "402", name: "UX Specialization Batch", startDate: "2023-04-15", endDate: "2023-07-15" },
    ],
  };

  const mockStudents = {
    "101": [
      { id: "1", name: "Aarav Sharma", email: "aarav.sharma@example.com", joinDate: "2023-01-10" },
      { id: "2", name: "Diya Patel", email: "diya.patel@example.com", joinDate: "2023-01-12" },
      { id: "3", name: "Vihaan Gupta", email: "vihaan.gupta@example.com", joinDate: "2023-01-08" },
    ],
    "102": [
      { id: "4", name: "Ananya Singh", email: "ananya.singh@example.com", joinDate: "2023-02-05" },
      { id: "5", name: "Reyansh Joshi", email: "reyansh.joshi@example.com", joinDate: "2023-02-01" },
    ],
    "103": [
      { id: "6", name: "Ishaan Kumar", email: "ishaan.kumar@example.com", joinDate: "2023-02-28" },
      { id: "7", name: "Myra Reddy", email: "myra.reddy@example.com", joinDate: "2023-03-01" },
    ],
    "201": [
      { id: "8", name: "Advait Desai", email: "advait.desai@example.com", joinDate: "2023-01-15" },
      { id: "9", name: "Saanvi Iyer", email: "saanvi.iyer@example.com", joinDate: "2023-01-18" },
    ],
    "202": [
      { id: "10", name: "Arjun Nair", email: "arjun.nair@example.com", joinDate: "2023-03-10" },
      { id: "11", name: "Kiara Menon", email: "kiara.menon@example.com", joinDate: "2023-03-12" },
    ],
    "301": [
      { id: "12", name: "Riya Chatterjee", email: "riya.chatterjee@example.com", joinDate: "2023-01-30" },
      { id: "13", name: "Kabir Malhotra", email: "kabir.malhotra@example.com", joinDate: "2023-01-28" },
    ],
    "401": [
      { id: "14", name: "Aanya Khanna", email: "aanya.khanna@example.com", joinDate: "2023-01-05" },
      { id: "15", name: "Vivaan Mehra", email: "vivaan.mehra@example.com", joinDate: "2023-01-07" },
    ],
    "402": [
      { id: "16", name: "Anika Rao", email: "anika.rao@example.com", joinDate: "2023-04-10" },
      { id: "17", name: "Dhruv Saxena", email: "dhruv.saxena@example.com", joinDate: "2023-04-12" },
    ],
  };

  const mockAttendance = {
    "101": [
      { name: "Aarav Sharma", present: 18, total: 20, late: 2, excused: 1 },
      { name: "Diya Patel", present: 15, total: 20, late: 1, excused: 0 },
      { name: "Vihaan Gupta", present: 20, total: 20, late: 0, excused: 0 },
    ],
    "102": [
      { name: "Ananya Singh", present: 12, total: 15, late: 3, excused: 2 },
      { name: "Reyansh Joshi", present: 14, total: 15, late: 1, excused: 1 },
    ],
    "103": [
      { name: "Ishaan Kumar", present: 8, total: 10, late: 0, excused: 1 },
      { name: "Myra Reddy", present: 9, total: 10, late: 2, excused: 0 },
    ],
    "201": [
      { name: "Advait Desai", present: 25, total: 30, late: 5, excused: 2 },
      { name: "Saanvi Iyer", present: 28, total: 30, late: 1, excused: 1 },
    ],
    "202": [
      { name: "Arjun Nair", present: 12, total: 15, late: 2, excused: 0 },
      { name: "Kiara Menon", present: 14, total: 15, late: 1, excused: 1 },
    ],
    "301": [
      { name: "Riya Chatterjee", present: 18, total: 20, late: 1, excused: 1 },
      { name: "Kabir Malhotra", present: 19, total: 20, late: 0, excused: 0 },
    ],
    "401": [
      { name: "Aanya Khanna", present: 35, total: 40, late: 3, excused: 2 },
      { name: "Vivaan Mehra", present: 38, total: 40, late: 1, excused: 1 },
    ],
    "402": [
      { name: "Anika Rao", present: 10, total: 12, late: 1, excused: 0 },
      { name: "Dhruv Saxena", present: 11, total: 12, late: 0, excused: 1 },
    ],
  };

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    setSelectedBatch("");
    setBatches(mockBatches[courseId] || []);
    setStudents([]);
    setAttendanceData([]);
  };

  const handleBatchChange = (event) => {
    const batchId = event.target.value;
    setSelectedBatch(batchId);
    setStudents(mockStudents[batchId] || []);
    setAttendanceData(mockAttendance[batchId] || []);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const totalStudents = students.length;
  const totalPresent = attendanceData.reduce((acc, item) => acc + item.present, 0);
  const totalAbsent = attendanceData.reduce((acc, item) => acc + (item.total - item.present), 0);
  const totalLate = attendanceData.reduce((acc, item) => acc + (item.late || 0), 0);
  const totalExcused = attendanceData.reduce((acc, item) => acc + (item.excused || 0), 0);
  const overallAttendance = totalStudents > 0 ? ((totalPresent / (totalStudents * (attendanceData[0]?.total || 1))) * 100 ): 0;

  return (
    <div className="dashboard-body">
    <div className="max-w-7xl mx-auto p-24 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-indigo-800">Attendance Report</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
            <select 
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedCourse} 
              onChange={handleCourseChange}
            >
              <option value="">-- Select Course --</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Batch</label>
            <select 
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
              value={selectedBatch} 
              onChange={handleBatchChange} 
              disabled={!selectedCourse}
            >
              <option value="">-- Select Batch --</option>
              {batches.map(batch => (
                <option key={batch.id} value={batch.id}>{batch.name}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedBatch && (
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Batch Information</h3>
            {batches.find(b => b.id === selectedBatch) && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-600">Start Date:</p>
                  <p className="font-medium">{batches.find(b => b.id === selectedBatch).startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">End Date:</p>
                  <p className="font-medium">{batches.find(b => b.id === selectedBatch).endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Students:</p>
                  <p className="font-medium">{totalStudents}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Batch Type:</p>
                  <p className="font-medium">
                    {batches.find(b => b.id === selectedBatch).name.includes("Morning") ? "Morning" : 
                     batches.find(b => b.id === selectedBatch).name.includes("Evening") ? "Evening" : 
                     batches.find(b => b.id === selectedBatch).name.includes("Weekend") ? "Weekend" : "Regular"}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {students.length > 0 ? (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">Student Attendance Details</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes Attended</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Classes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Arrivals</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Excused Absences</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student, index) => {
                    const record = attendanceData.find(a => a.name === student.name) || { present: 0, total: 10, late: 0, excused: 0 };
                    const attendancePercent = ((record.present / record.total) * 100).toFixed(2);
                    const status = attendancePercent >= 75 ? "Good" : attendancePercent >= 50 ? "Warning" : "Critical";
                    
                    return (
                      <tr 
                        key={student.id} 
                        className={`hover:bg-gray-50 cursor-pointer ${selectedStudent?.id === student.id ? 'bg-indigo-50' : ''}`}
                        onClick={() => handleStudentSelect(student)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-600 font-medium">{student.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.present}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.late}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.excused}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className="mr-2">{attendancePercent}%</span>
                            <div className="relative w-full">
                              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                <div 
                                  style={{ width: `${attendancePercent}%` }}
                                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                    attendancePercent >= 75 ? 'bg-green-500' : 
                                    attendancePercent >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            status === 'Good' ? 'bg-green-100 text-green-800' :
                            status === 'Warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200 p-20">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">Batch Attendance Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm text-green-600">Present</p>
                    <p className="text-xl font-bold">{totalPresent}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <p className="text-sm text-red-600">Absent</p>
                    <p className="text-xl font-bold">{totalAbsent}</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded">
                    <p className="text-sm text-yellow-600">Late Arrivals</p>
                    <p className="text-xl font-bold">{totalLate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Overall Attendance Percentage</p>
                  <div className="flex items-center">
                    <span className="text-3xl font-bold mr-2">{overallAttendance.toFixed(2)}%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                        <div 
                          style={{ width: `${overallAttendance}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            overallAttendance >= 75 ? 'bg-green-500' : 
                            overallAttendance >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedStudent && (
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-semibold text-indigo-800 mb-4">Student Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-2xl text-indigo-600 font-medium">{selectedStudent.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-bold">{selectedStudent.name}</h4>
                      <p className="text-gray-600">{selectedStudent.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Join Date</p>
                      <p className="font-medium">{selectedStudent.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Batch</p>
                      <p className="font-medium">{batches.find(b => b.id === selectedBatch)?.name}</p>
                    </div>
                  </div>
                  {attendanceData.find(a => a.name === selectedStudent.name) && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Attendance Performance</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-sm text-blue-600">Attendance %</p>
                          <p className="text-xl font-bold">
                            {((attendanceData.find(a => a.name === selectedStudent.name).present / 
                              attendanceData.find(a => a.name === selectedStudent.name).total) * 100).toFixed(2)}%
                          </p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded">
                          <p className="text-sm text-purple-600">Punctuality</p>
                          <p className="text-xl font-bold">
                            {attendanceData.find(a => a.name === selectedStudent.name).late} late arrivals
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <CSVLink
              data={attendanceData.map(item => ({
                ...item,
                attendance: `${((item.present / item.total) * 100).toFixed(2)}%`,
                status: ((item.present / item.total) * 100 >= 75 ? 'Good' : 
                        ((item.present / item.total) * 100 >= 50 ? 'Warning' : 'Critical'))
              }))}
              headers={[
                { label: "Student Name", key: "name" },
                { label: "Present", key: "present" },
                { label: "Total Classes", key: "total" },
                { label: "Late Arrivals", key: "late" },
                { label: "Excused Absences", key: "excused" },
                { label: "Attendance (%)", key: "attendance" },
                { label: "Status", key: "status" },
              ]}
              filename={`attendance_report_${courses.find(c => c.id === selectedCourse)?.name || 'course'}_${
                batches.find(b => b.id === selectedBatch)?.name || 'batch'
              }.csv`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Report
            </CSVLink>

            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No students found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {selectedBatch ? "This batch currently has no students." : "Please select a course and batch to view attendance data."}
          </p>
        </div>
      )}
    </div>
    </div>
  );
};

export default AttendanceReport;