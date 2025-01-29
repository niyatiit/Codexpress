import React from "react";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const App = () => {
  return (
    <Router>
      <div className="app-container flex">
        <main className="content w-full p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<AdminDashboard />} /> {/* Use wildcard for sub-routes */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
