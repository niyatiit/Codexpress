const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors=require("cors")
const Courses=require("./models/course.model")
app.use(express.json())
app.use(cors())
const connectDB=require('./config/db')
connectDB()

app.get('/', (req, res) => {
    res.send("hello from server")
})
app.get('/courses',async(req,res)=>{
    let allCourses=await Courses.find()
    res.json(allCourses)
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})