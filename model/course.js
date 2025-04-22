const mongoose=require('mongoose');

const courseSchema= mongoose.Schema({
   
    name:{
        type:String,
        required:[true,"cannot leave the field blank"]       
    },
      description:{
        type:String
    },
    courseFor:{
        type:String
    }
},{timestamps:true})
module.exports=mongoose.model("course",courseSchema);