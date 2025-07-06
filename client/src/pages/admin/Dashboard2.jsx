import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Award, Users, TrendingUp } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [overview, setOverview] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalCourses: 0,
    totalRevenue: 0,
  });
  const [weeklyData, setWeeklyData] = useState({
    labels: [],
    data: [],
  });
  const [subjectDistribution, setSubjectDistribution] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
        borderWidth: 0,
      },
    ],
  });
  const [todayActivities, setTodayActivities] = useState([]);
  const [topPerformingStudents, setTopPerformingStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          overviewResponse,
          weeklyDataResponse,
          subjectDistributionResponse,
          todayActivitiesResponse,
          topPerformingStudentsResponse,
        ] = await Promise.all([
          axios.get("/api/admin/overview"),
          axios.get("/api/admin/weekly-data"),
          axios.get("/api/admin/subject-distribution"),
          axios.get("/api/admin/today-activities"),
          axios.get("/api/admin/top-performing-students"),
        ]);

        setOverview(overviewResponse.data);
        setWeeklyData(weeklyDataResponse.data);
        setSubjectDistribution({
          labels: subjectDistributionResponse.data.labels,
          datasets: [
            {
              data: subjectDistributionResponse.data.data,
              backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
              borderWidth: 0,
            },
          ],
        });
        setTodayActivities(todayActivitiesResponse.data);
        setTopPerformingStudents(topPerformingStudentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Chart options for consistent styling
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tension: 0.3,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0,0,0,0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 15,
          padding: 15,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xlg text-gray-800">Admin Dashboard</h2>
        <div className="text-sm text-gray-500">Last updated: Today, 9:30 AM</div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6 flex py-36 px-20 items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Users size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Students</p>
            <p className="text-2xl font-bold text-gray-800">{overview.totalStudents}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex py-36 px-20 items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Users size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Faculty</p>
            <p className="text-2xl font-bold text-gray-800">{overview.totalFaculty}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex py-36 px-20 items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <BookOpen size={24} className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Courses</p>
            <p className="text-2xl font-bold text-gray-800">{overview.totalCourses}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex py-36 px-20 items-center">
          <div className="rounded-full bg-amber-100 p-3 mr-4">
            <TrendingUp size={24} className="text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-800">${overview.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Weekly Data Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2 p-36">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Weekly Activity</h3>
            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">This Week</div>
          </div>
          <div className="h-64">
            <Line
              data={{
                labels: weeklyData.labels,
                datasets: [
                  {
                    label: "Activity",
                    data: weeklyData.data,
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    fill: true,
                  },
                ],
              }}
              options={lineChartOptions}
            />
          </div>
        </div>

        {/* Subject Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-700 mb-4">Subject Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <Pie data={subjectDistribution} options={pieChartOptions} />
          </div>
        </div>
      </div>

      {/* Today's Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <Clock size={18} className="text-gray-500 mr-2" />
              <h3 className="font-semibold text-gray-700">Today's Activities</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {todayActivities.map((activity, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800">{activity.subject}</p>
                    <p className="text-sm text-gray-500">{activity.room}</p>
                  </div>
                  <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <Link to="/schedule" className="text-blue-600 text-sm hover:underline font-medium">
              View Full Schedule
            </Link>
          </div>
        </div>

        {/* Top Performing Students */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <Award size={18} className="text-gray-500 mr-2" />
              <h3 className="font-semibold text-gray-700">Top Performing Students</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {topPerformingStudents.map((student) => (
              <div key={student.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 text-blue-800 h-10 w-10 rounded-full flex items-center justify-center font-medium mr-3">
                      {student.avatar}
                    </div>
                    <div>
                      <Link to={`/student/${student.id}`} className="font-medium text-gray-800 hover:text-blue-600">
                        {student.name}
                      </Link>
                      <p className="text-sm text-gray-500">Student ID: {student.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Grade</p>
                      <p className="font-medium">{student.grade}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Performance</p>
                      <p className="font-medium text-green-600">{student.performance}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <Link to="/students" className="text-blue-600 text-sm hover:underline font-medium">
              View All Students
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;