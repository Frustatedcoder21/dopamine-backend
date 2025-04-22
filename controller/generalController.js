const ErrorHandler=require('../config/ErrorHandler')
const coursemodel=require('../model/course')
const teachermodel=require('../model/teacher')
const announcementmodel=require('../model/Announcement')
const getTeacher=async(req,res,next)=>{
    try {
       const teachers=await teachermodel.find();
       res.json({
           success:true,
           teachers
       })
    } catch (error) {
       next(new ErrorHandler(error.message,500))
    }
}
const getCourses=async(req,res,next)=>{

    try {
        const courses=await coursemodel.find();
        res.json({success:true,courses})
    } catch (error) {
      next(  new ErrorHandler(error.message,500));
    }
}
const getAnnouncements=async(req,res,next)=>{

    try {
        const announcements=await announcementmodel.find();
        res.json({success:true,announcements})
    } catch (error) {
      next(  new ErrorHandler(error.message,500));
    }
}
module.exports={getCourses,getTeacher,getAnnouncements}