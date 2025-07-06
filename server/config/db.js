// const mongoose=require('mongoose')
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,
            {serverSelectionTimeoutMS: 15000, // Increase timeout to 15 seconds
            socketTimeoutMS: 45000, // Keep sockets alive for 45s
             });
        console.log(`Database Connected`);
    }
    catch(err){
        console.log(`Error Connecting Database ${err}`);

    }
}
module.exports=connectDB