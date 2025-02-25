const User=require("../models/user.model")
exports.getUser=async(req,res)=>{
    
    try{
        const user=await User.findOne({})
    }
    catch(err){

    }

}