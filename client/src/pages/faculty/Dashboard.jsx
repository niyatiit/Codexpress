import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Award, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => { 
    const [averageLectures, setAverageLectures] = useState(5);
    const [weeklyLectures, setWeeklyLectures] = useState([10, 12, 8, 15, 9, 14, 11]);
    const [subjectDistribution, setSubjectDistribution] = useState({
        labels: ["Java", "Python", "Frontend", "Backend"],
        datasets: [{
            data: [30, 25, 20, 25],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
            borderWidth: 0
        }]
    });
    const [todayLectures, setTodayLectures] = useState([
        { subject: "Java", time: "10:00 AM", room: "Room 101" },
        { subject: "Python", time: "12:00 PM", room: "Room 203" },
        { subject: "React Fundamentals", time: "2:30 PM", room: "Lab 3" }
    ]);
    const [topPerformingStudents, setTopPerformingStudents] = useState([
        { id: 1, name: "Aryan Singh", grade: "A+", performance: "95%", avatar: "AS" },
        { id: 2, name: "Neha Sharma", grade: "A", performance: "90%", avatar: "NS" },
        { id: 3, name: "Raj Patel", grade: "A", performance: "88%", avatar: "RP" }
    ]);
    
    // Chart options for consistent styling
    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        tension: 0.3,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: true,
                    color: "rgba(0,0,0,0.05)"
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 15,
                    padding: 15
                }
            }
        }
    };
    
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xlg text-gray-800">Faculty Dashboard</h2>
                <div className="text-sm text-gray-500">Last updated: Today, 9:30 AM</div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6 flex py-36 px-20 items-center">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                        <BookOpen size={24} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Average Lectures</p>
                        <p className="text-2xl font-bold text-gray-800">{averageLectures}<span className="text-sm font-normal text-gray-500 ml-1">/ week</span></p>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 flex py-36 px-20 items-center">
                    <div className="rounded-full bg-green-100 p-3 mr-4">
                        <Users size={24} className="text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Total Students</p>
                        <p className="text-2xl font-bold text-gray-800">128</p>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 flex py-36 px-20 items-center">
                    <div className="rounded-full bg-purple-100 p-3 mr-4">
                        <Clock size={24} className="text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Hours Taught</p>
                        <p className="text-2xl font-bold text-gray-800">24<span className="text-sm font-normal text-gray-500 ml-1">this week</span></p>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 flex py-36 px-20 items-center">
                    <div className="rounded-full bg-amber-100 p-3 mr-4">
                        <TrendingUp size={24} className="text-amber-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Avg. Performance</p>
                        <p className="text-2xl font-bold text-gray-800">84%</p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Weekly Lectures Chart */}
                <div className="bg-white rounded-lg shadow p-6 lg:col-span-2 p-36">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-700">Weekly Lectures</h3>
                        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">This Week</div>
                    </div>
                    <div className="h-64">
                        <Line
                            data={{
                                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                                datasets: [{
                                    label: "Lectures",
                                    data: weeklyLectures,
                                    borderColor: "#3b82f6",
                                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                                    fill: true
                                }]
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Lectures */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center">
                            <Clock size={18} className="text-gray-500 mr-2" />
                            <h3 className="font-semibold text-gray-700">Today's Lectures</h3>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {todayLectures.map((lecture, index) => (
                            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-800">{lecture.subject}</p>
                                        <p className="text-sm text-gray-500">{lecture.room}</p>
                                    </div>
                                    <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                                        {lecture.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                        <Link to="/schedule" className="text-blue-600 text-sm hover:underline font-medium">View Full Schedule</Link>
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
                                            <Link to={`/student/${student.id}`} className="font-medium text-gray-800 hover:text-blue-600">{student.name}</Link>
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
                        <Link to="/students" className="text-blue-600 text-sm hover:underline font-medium">View All Students</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;