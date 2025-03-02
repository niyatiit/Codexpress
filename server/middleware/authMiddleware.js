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


module.exports.protect = async (req, res, next) => {
  let token;

  // Check for token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request object
      req.user = await User.findById(decoded.id).select("-password -resetPasswordToken -resetPasswordExpires -deletedAt");

      next();
    } catch (error) {
      res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};


module.exports.authenticate = (req, res, next) => {
  const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded; // Attach the decoded user payload to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports.isStudentEnrolled = async (req, res, next) => {
  const userId = req.user.id; // Assuming the user ID is available in the request

  try {
    // Check if the user is enrolled in at least one course
    const enrollment = await Enrollment.findOne({ user_id: userId });

    if (!enrollment || enrollment.courses.length === 0) {
      return res.status(403).json({ error: "You are not enrolled in any course." });
    }

    // If enrolled, proceed to the next middleware or route
    next();
  } catch (error) {
    console.error("🚨 Error checking enrollment:", error);
    res.status(500).json({ error: "Failed to check enrollment status." });
  }
};