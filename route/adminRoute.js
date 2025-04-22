const express=require('express');
const credentialValidator=require('../middleware/credential_syntax')
const route=express.Router();
const {login, signup, addCourse, deleteCourse, updateCourse, addTeacher, updateTeacher, deleteTeacher, addAnnouncement, deleteAnnouncement}=require('../controller/adminController')
route.post('/signup',credentialValidator,signup)
route.post('/login',credentialValidator,login)
route.post('/course',addCourse)
route.delete('/course/:id',deleteCourse)
route.put('/course/:id',updateCourse)

route.post('/teacher',addTeacher)
route.put('/teacher/:id',updateTeacher)
route.delete('/teacher/:id',deleteTeacher)

route.post('/announcement',addAnnouncement)
route.delete('/announcement/:id',deleteAnnouncement)

module.exports=route