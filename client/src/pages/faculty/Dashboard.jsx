import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Link } from "react-router-dom";

const Dashboard = () => { 
    const [averageLectures, setAverageLectures] = useState(5);
    const [weeklyLectures, setWeeklyLectures] = useState([10, 12, 8, 15, 9, 14, 11]);
    const [subjectDistribution, setSubjectDistribution] = useState({
        labels: ["Java", "Python", "Frontend", "Backend"],
        datasets: [{
            data: [30, 25, 20, 25],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"]
        }]
    });
    const [todayLectures, setTodayLectures] = useState([
        { subject: "Java", time: "10:00 AM" },
        { subject: "Python", time: "12:00 PM" }
    ]);
    const [topPerformingStudents, setTopPerformingStudents] = useState([
        { id: 1, name: "Aryan Singh", grade: "A+", performance: "95%" },
        { id: 2, name: "Neha Sharma", grade: "A", performance: "90%" }
    ]);
    
    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4">Faculty Dashboard</h2>
            
            <div className="row">
                {/* Average Lectures */}
                <div className="col-md-4">
                    <div className="card shadow-sm p-3 mb-4">
                        <h5 className="text-muted">Average Lectures Per Week</h5>
                        <h3 className="text-primary">{averageLectures}</h3>
                    </div>
                </div>
                
                {/* Weekly Lectures Chart */}
                <div className="col-md-8">
                    <div className="card shadow-sm p-3 mb-4">
                        <h5 className="text-muted">Weekly Lectures</h5>
                        <Line
                            data={{
                                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                                datasets: [{
                                    label: "Lectures",
                                    data: weeklyLectures,
                                    borderColor: "#007bff",
                                    backgroundColor: "rgba(0, 123, 255, 0.2)"
                                }]
                            }}
                        />
                    </div>
                </div>
            </div>
            
            <div className="row">
                {/* Subject Distribution Pie Chart */}
                <div className="col-md-6">
                    <div className="card shadow-sm p-3 mb-4">
                        <h5 className="text-muted">Subject Distribution</h5>
                        <Pie data={subjectDistribution} />
                    </div>
                </div>
                
                {/* Today's Lectures */}
                <div className="col-md-6">
                    <div className="card shadow-sm p-3 mb-4">
                        <h5 className="text-muted">Today's Lectures</h5>
                        <ul className="list-group">
                            {todayLectures.map((lecture, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between">
                                    {lecture.subject} <span className="text-muted">{lecture.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="row">
                {/* Top Performing Students */}
                <div className="col-md-12">
                    <div className="card shadow-sm p-3 mb-4">
                        <h5 className="text-muted">Top Performing Students</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Grade</th>
                                    <th>Performance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topPerformingStudents.map((student) => (
                                    <tr key={student.id}>
                                        <td>
                                            <Link to={`/student/${student.id}`}>{student.name}</Link>
                                        </td>
                                        <td>{student.grade}</td>
                                        <td>{student.performance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;