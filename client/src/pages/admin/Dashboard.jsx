import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Users, BookOpen, TrendingUp, CreditCard, Clock, Award } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculties: 0,
    totalCourses: 0,
    totalPayments: 0,
  });

  const [enrollmentTrends, setEnrollmentTrends] = useState([]);
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [topCourses, setTopCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          enrollmentRes,
          facultyRes,
          courseRes,
          paymentRes,
          recentEnrollmentsRes,
          topCoursesRes,
        ] = await Promise.all([
          axios.get("http://localhost:3000/admin/enrollments"),
          axios.get("http://localhost:3000/admin/faculties"),
          axios.get("http://localhost:3000/admin/courses"),
          axios.get("http://localhost:3000/admin/payments"),
          axios.get("http://localhost:3000/admin/recent-enrollments"), // Updated route
          axios.get("http://localhost:3000/admin/top-courses"), // Updated route
        ]);
  
        setStats({
          totalStudents: enrollmentRes.data.count || 0,
          totalFaculties: facultyRes.data.count || 0,
          totalCourses: courseRes.data.count || 0,
          totalPayments: paymentRes.data.total || 0,
        });
  
        setEnrollmentTrends(enrollmentRes.data.trends || []);
        setRecentEnrollments(recentEnrollmentsRes.data.enrollments || []);
        setTopCourses(topCoursesRes.data.courses || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
  
    fetchData();
  }, []);
  const lineChartData = {
    labels: enrollmentTrends.map((item) => item.date),
    datasets: [
      {
        label: "Daily Enrollments",
        data: enrollmentTrends.map((item) => item.count),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: topCourses.map((course) => course.name),
    datasets: [
      {
        label: "Enrollments",
        data: topCourses.map((course) => course.enrollments),
        backgroundColor: "#4bc0c0",
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tension: 0.3,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: true, color: "rgba(0,0,0,0.05)" },
      },
      x: { grid: { display: false } },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: true, color: "rgba(0,0,0,0.05)" },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        <div className="text-sm text-gray-500">Last updated: Just now</div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard icon={<Users size={24} className="text-blue-600" />} label="Students Enrolled" value={stats.totalStudents} />
        <StatCard icon={<BookOpen size={24} className="text-green-600" />} label="Total Faculties" value={stats.totalFaculties} />
        <StatCard icon={<TrendingUp size={24} className="text-purple-600" />} label="Total Courses" value={stats.totalCourses} />
        <StatCard icon={<CreditCard size={24} className="text-amber-600" />} label="Total Payments" value={`₹${stats.totalPayments}`} />
      </div>

      {/* Enrollment Trends Graph */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">Student Enrollment Trends</h3>
        <div className="h-64">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Recent Enrollments */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
          <Clock size={18} className="text-gray-500 mr-2" />
          Recent Enrollments
        </h3>
        <div className="divide-y divide-gray-100">
          {recentEnrollments.map((enrollment) => (
            <div key={enrollment._id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{enrollment.user_id?.username}</p>
                  <p className="text-sm text-gray-500">{enrollment.courses[0]?.course_id?.name}</p>
                </div>
                <div className="text-sm text-gray-500">{new Date(enrollment.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Courses */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
          <Award size={18} className="text-gray-500 mr-2" />
          Top Courses
        </h3>
        <div className="h-64">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center">
    <div className="rounded-full bg-gray-100 p-3 mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default Dashboard;