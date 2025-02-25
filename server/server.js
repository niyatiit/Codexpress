require("dotenv").config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const Courses = require("./models/course.model")
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser());
const bcrypt = require("bcrypt")
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Update with your frontend URL

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes')
const courseRoutes = require('./routes/courseRoutes')
const facultyRoutes = require('./routes/facultyRoutes')
const batchRoutes = require('./routes/batchRoutes')
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
app.use("/batches",batchRoutes);

app.get('/', async (req, res) => {
    const saltRounds = 12;
    const plainPassword = "kavita123"; // Replace with the actual password
    const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);
    
    console.log(hashedPassword);
    res.send(`hello from server`)
})

app.get("/logout", (req, res) => {
    // Expire the cookie properly by setting maxAge to 0
    res.clearCookie("token", {
        httpOnly: true,  // Ensure cookie is HTTP-only
        secure: process.env.NODE_ENV === "production", // Secure only in production
        sameSite: "Strict", // Adjust as necessary
        path: "/"
    });
});


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})