const express=require('express');
const route=express.Router();
const {getCourses,getTeacher, getAnnouncements}=require('../controller/generalController')
route.get('/courses',getCourses)
route.get('/teachers',getTeacher)
route.get('/announcements',getAnnouncements)

module.exports=route