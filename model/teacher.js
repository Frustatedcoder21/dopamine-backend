const mongoose=require('mongoose');

const teacherSchema=mongoose.Schema({
  image:{
    type:String,
    required:true
  },
  fullname:{
    type:String,
    required:true
  }

})
module.exports=mongoose.model("teacher",teacherSchema);