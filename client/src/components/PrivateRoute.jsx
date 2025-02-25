import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, fallbackPath }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Ensure user data is retrieved


  if (!user) {
    console.log("No user found. Redirecting to login.");
    return <Navigate to={fallbackPath} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log("Unauthorized role. Redirecting to fallback path.");
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
