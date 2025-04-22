const mongoose=require('mongoose');

const AnnouncementSchema=mongoose.Schema({
    text:{
        type:String,
        required:[true,"cannot leave the password field blank"]
    }
})
module.exports=mongoose.model("announcement",AnnouncementSchema);