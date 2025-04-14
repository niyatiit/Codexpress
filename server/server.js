require("dotenv").config();
const express = require('express')
const app = express()
const path = require("path");
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const Courses = require("./models/course.model")
const States = require("./models/state.model")
const Cities = require("./models/city.model")
const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost';

app.use(express.json())
app.use(cookieParser());
const bcrypt = require("bcrypt")
const cors = require("cors");// Enable CORS for all routes
const axios=require('axios')
axios.defaults.withCredentials = true;
// app.use(cors({
//     origin: "http://localhost:5173", // Replace with your frontend URL
//     credentials: true, // Allow cookies
//   }));
const corsOptions = {
    origin: [
      'http://localhost:5173',  // Frontend URL for local dev
      'http://192.168.137.21:5173'  // Mobile's IP address for testing
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true,  // Allow cookies or credentials
  };
  
  // Enable CORS for all routes and handle pre-flight requests
  app.use(cors(corsOptions));
  
  // This will ensure that pre-flight requests are handled
  app.options('*', cors(corsOptions));  // Handle pre-flight requests
  

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes')
const courseRoutes = require('./routes/courseRoutes')
const facultyRoutes = require('./routes/facultyRoutes')
const batchRoutes = require('./routes/batchRoutes')
const userRoutes = require('./routes/userRoutes')
const profileRoutes = require('./routes/profileRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const enrollmentRoutes=require('./routes/enrollmentRoutes')
const assignmentRoutes=require('./routes/assignmentRoutes')
const noticeRoutes=require("./routes/noticeRoutes")
const adminRoutes=require("./routes/adminRoutes")
const attendanceRoutes=require("./routes/attendanceRoutes") 
const resourceRoutes=require("./routes/resourceRoutes")
const notificationRoutes=require("./routes/notificationRoutes")
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/assignment-submissions', express.static(path.join(__dirname, 'uploads/assignment-submissions')));


const connectDB = require('./config/db')
try {
    connectDB()
}
catch (err) {
    console.log("Error Connecting DATABASE!..", err);

}

app.use("/auth", authRoutes); // Authentication routes
app.use('/student', studentRoutes)
app.use("/courses", courseRoutes);
app.use("/faculty", facultyRoutes);
app.use("/batches", batchRoutes);
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);
app.use("/payment", paymentRoutes);
app.use('/enrollments', enrollmentRoutes);
app.use('/assignments', assignmentRoutes);
// app.use('/notices', noticeRoutes);
app.use('/notifications',notificationRoutes)
app.use("/admin", adminRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/resources",resourceRoutes)
    
app.get('/', async (req, res) => {
    // const saltRounds = 12;
    // const plainPassword = "$2b$12$bum7zP2kb.BLHirqTLEgZ.XuQfdh3nixXWE4lAjwzJiZIMrA0Dajm";
    // const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

    // console.log(hashedPassword);
    res.send(`hello from server`)
})

app.get('/states/:id', async (req, res) => {
    try {
        const state = await States.findOne({ _id: req.params.id }); // Fetch state by ID
        if (!state) {
            return res.status(404).json({ success: false, message: "State not found" });
        }
        res.status(200).json({ success: true, data: state }); // Send the state as a response
    } catch (error) {
        console.error("Error fetching state:", error);
        res.status(500).json({ success: false, message: "Failed to fetch state" }); // Handle errors
    }
});
app.get('/cities/:id', async (req, res) => {
    try {
        const city = await Cities.findById({ _id: req.params.id });
        if (!city) {
            return res.status(404).json({ success: false, message: "City not found" });
        }
        res.status(200).json({ success: true, data: city });
    } catch (error) {
        console.error("Error fetching city:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


// app.get("/logout", (req, res) => {
//     // Expire the cookie properly by setting maxAge to 0
//     res.clearCookie("token", {
//         httpOnly: true,  // Ensure cookie is HTTP-only
//         secure: process.env.NODE_ENV === "production", // Secure only in production
//         sameSite: "Strict", // Adjust as necessary
//         path: "/"
//     });
// });


app.listen(3000, host, () => {
    console.log(`Server running on ${host}`);
  });