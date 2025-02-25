const User = require("../models/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { promisify } = require("util"); // Import promisify

// Convert jwt.verify into a promise-based function
const verifyToken = promisify(jwt.verify);

module.exports.userVerification = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }

    // Verify the token
    const decoded = await verifyToken(token, process.env.TOKEN_KEY);

    // Fetch user and populate role details
    const user = await User.findById(decoded.id).populate("role");

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    if (!user.is_active) {
      return res.status(403).json({ status: false, message: "User is inactive" });
    }

    // Attach user details to the request object
    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role.name, // Get the role name
      role_description: user.role.description,
      is_verified: user.is_verified,
      last_login: user.last_login,
    };

    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ status: false, message: "Invalid or expired token" });
    }

    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

module.exports.roleAuthorization = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ status: false, message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};
