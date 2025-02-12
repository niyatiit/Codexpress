const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect('mongodb://localhost:27017/codexpress');
        console.log(`Database Connected`);
    }
    catch(err){
        console.log(`Error Connecting Database ${err}`);

    }
}
module.exports=connectDB