const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const adminmodel=require('../model/admin')
const ErrorHandler=require('../config/ErrorHandler');
const coursemodel=require('../model/course')
const teachermodel=require('../model/teacher');
const announcementmodel=require('../model/Announcement')
const signup=async(req,res,next)=>{
    const {email,password}=req.body;
    // console.log(email);
    
    try {
        const existingAdmin=await adminmodel.findOne({email});
    
        if(existingAdmin){
         next(new ErrorHandler("admin already exist",409));
        }else{
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(password,salt,async function(err,result){
                const admin= await adminmodel.create({
                    email,password:result
                })
                })
            })
            res.json({
                success:true,
                message:"user created successfully"
            })
        }
    } catch (error) {
        next(new ErrorHandler(error.message,500))
    }
   
}
const login=async(req,res,next)=>{
    const {email,password}=req.body;
    // console.log(req.body);

    
   try {
    
    
    const admin=await adminmodel.findOne({email});
    if(!admin){
     next(new ErrorHandler("wrong credentials",400));
    }else{
       bcrypt.compare(password,admin.password,function(err,result){
        if(result){
            const token=jwt.sign({email},'secret');
           res.json({
            success:true,
            message:"Signed in successfully",
            token
           })
        }else{
            res.status(400).json({
                success:false,
                message:"unable to login",

            })
        }
       })
    }
   } catch (error) {
    next(new ErrorHandler(error.message,500))
   }
}
const addCourse=async(req,res,next)=>{
    const {token}=req.headers
    if(!token){
  next(new ErrorHandler("login again as admin",400));
    }
    const {image,name,price,startdate,description}=req.body;
    const decode=jwt.verify(token,'secret');
    
    const email=decode.email;
    try {
        const admin=await adminmodel.findOne({email});
        if(!admin){
        next(new ErrorHandler("login as admin",400));
        }else{
            const course=await coursemodel.create({
             image,name,price,startdate,description
            })
            res.json({
                success:true,
                message:"course created successfully",
                course
    
            })
        }
    } catch (error) {
        new ErrorHandler("something went wrong",500);
    }
   
}
const deleteCourse=async(req,res,next)=>{
    const {token}=req.headers
    if(!token){
  next(new ErrorHandler("login again as admin",400));
    }
    const {id}=req.params;
    console.log(id);
    
    const decode=jwt.verify(token,'secret');
    
    const email=decode.email;
    try {
        const admin=await adminmodel.findOne({email});
        if(!admin){
        next(new ErrorHandler("login as admin",400));
        }else{
           const course=await coursemodel.findOneAndDelete({_id:id});
           res.json({
            success:true,
            message:"course deleted successfully"
           })
        }
    } catch (error) {
        new ErrorHandler("something went wrong",500);
    }
}
const updateCourse=async(req,res,next)=>{
    const {token}=req.headers

    if(!token){
  next(new ErrorHandler("login again as admin",400));
    }
    const {id}=req.params;
    // console.log(id);
    const {image,name,price,startdate,description,enddate,courseFor}=req.body
    
    const decode=jwt.verify(token,'secret');
    
    const email=decode.email;
    try {
        const admin=await adminmodel.findOne({email});
        
        if(!admin){
        next(new ErrorHandler("login as admin",400));
        }else{
            
           const course=await coursemodel.findOne({_id:id});
           console.log(typeof course.name,typeof name);
           
           if(course.name===name && course.price === price && course.startdate===startdate && course.enddate===enddate && course.courseFor===courseFor){
             return next(new ErrorHandler("same entry as before",400))
           }else{
            const updatedCourse=await coursemodel.findOneAndUpdate({_id:id},{
                image,name,price,startdate,enddate,courseFor
             });
             res.json({
              success:true,
              message:"course updated successfully"
             })
           }
          
        }
    } catch (error) {
        new ErrorHandler("something went wrong",500);
    }
}

const addTeacher=async(req,res,next)=>{
const {image,fullname}=req.body;

const {token}=req.headers;
if(!token){
    next(new ErrorHandler("login as admin",400));
}else{
    console.log(token);
    
   try {
    const decode=jwt.verify(token,'secret');
    const admin=await adminmodel.findOne({email:decode.email})
    if(!admin){
        next(new ErrorHandler("login as admin",400));

    }else{
     const teacher=await teachermodel.create({
        image,fullname
     }) 
     res.json({
        success:true,
        message:"teacher created successfully"
     })  
     
    }
   } catch (error) {
    next( new ErrorHandler(error.message,500))
   }
}
}
const updateTeacher=async(req,res,next)=>{
    const {token}=req.headers;
    const {id}=req.params
    const {firstname,middlename,lastname,qualification,subject}=req.body;

    if(!token){
        next(new ErrorHandler("login as admin",400));
    }else{
       try {
        const decode=jwt.verify(token,'secret');
        const admin=await adminmodel.findOne({email:decode.email})
        if(!admin){
            next(new ErrorHandler("login as admin",400));
    
        }else{
            const teacher=teachermodel.findOne({_id:id})
            if(!teacher){
                next(new ErrorHandler("teacher not found",400));
            }else{
             await teachermodel.findOneAndUpdate({
                firstname,middlename,lastname,qualification,subject
             })
             res.json({
                success:true,
                message:"teacher details updated successfully"
             })
            }
        }
       } catch (error) {
        next( new ErrorHandler(error.message,500))
       }
    }
    }
const deleteTeacher=async(req,res,next)=>{
    const {token}=req.headers;
    const {id}=req.params
    if(!token){
        next(new ErrorHandler("login as admin",400));
    }else{
       try {
        const decode=jwt.verify(token,'secret');
        const admin=await adminmodel.findOne({email:decode.email})
        if(!admin){
            next(new ErrorHandler("login as admin",400));
    
        }else{
            const teacher=teachermodel.findOne({_id:id})
            if(!teacher){
                next(new ErrorHandler("teacher not found",400));
            }else{
             await teachermodel.findOneAndDelete({_id:id})
             res.json({
                success:true,
                message:"teacher removed successfully"
             })
            }
        }
       } catch (error) {
        next( new ErrorHandler(error.message,500))
       }
    }
    }
    const addAnnouncement=async(req,res,next)=>{
        const {text}=req.body;
        
        const {token}=req.headers;
        if(!token){
            next(new ErrorHandler("login as admin",400));
        }else{
            console.log(token);
            
           try {
            const decode=jwt.verify(token,'secret');
            const admin=await adminmodel.findOne({email:decode.email})
            if(!admin){
                next(new ErrorHandler("login as admin",400));
        
            }else{
             const announcement=await announcementmodel.create({
                text
             }) 
             res.json({
                success:true,
                message:"post created successfully"
             })  
             
            }
           } catch (error) {
            next( new ErrorHandler(error.message,500))
           }
        }
        }
        
            const deleteAnnouncement=async(req,res,next)=>{
                const {token}=req.headers;
                const {id}=req.params
                if(!token){
                    next(new ErrorHandler("login as admin",400));
                }else{
                   try {
                    const decode=jwt.verify(token,'secret');
                    const admin=await adminmodel.findOne({email:decode.email})
                    if(!admin){
                        next(new ErrorHandler("login as admin",400));
                
                    }else{
                        const announcement=announcementmodel.findOne({_id:id})
                        if(!announcement){
                            next(new ErrorHandler("post not found",400));
                        }else{
                         await announcement.findOneAndDelete({_id:id})
                         res.json({
                            success:true,
                            message:"post removed successfully"
                         })
                        }
                    }
                   } catch (error) {
                    next( new ErrorHandler(error.message,500))
                   }
                }
                }

module.exports={login,signup,addCourse,deleteCourse,updateCourse,addTeacher,deleteTeacher,updateTeacher,addAnnouncement,deleteAnnouncement};