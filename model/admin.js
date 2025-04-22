const mongoose=require("mongoose");

const adminSchema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"enter your email"]
    },
    password:{
        type:String,
        required:[true,"cannot leave the password field blank"]
    }
})
module.exports=mongoose.model("admin",adminSchema);