const express = require('express')
const app = express()
const cors=require("cors")
app.use(express.json())
app.use(cors())
const connectDB=require('./config/db')
connectDB()
app.get('/', (req, res) => {
    console.log("hello from server")
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
})