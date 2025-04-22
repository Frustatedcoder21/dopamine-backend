const mongoose=require('mongoose');

const studentSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"cannot leave the password field blank"]
       },
       middlename:{
       type:String
       },
       lastname:{
           type:String,
           required:[true,"cannot leave the password field blank"]
       },
       currentqualification:{
           type:String,
           required:[true,"cannot leave the password field blank"],
           enum:["VIII","IX","X","XI","XII"]
       },
       subject:{
           type:String,
           // required:true
       },
})