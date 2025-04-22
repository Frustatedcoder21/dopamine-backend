const express=require("express");
const app=express();
const cors=require('cors')
const dotenv=require('dotenv');
const adminRoutes=require('./route/adminRoute')
const generalRoutes=require('./route/generalRoute')
const dbConnect=require('./config/db')
dotenv.config({path:'./config/.env'})
dbConnect();
const PORT=process.env.PORT||3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/admin',adminRoutes)
app.use('/',generalRoutes)
app.listen(PORT,()=>{
    console.log(`listening on port : ${PORT}`);
    
})
app.use((err,req,res,next)=>{
   res.status(err.statuscode||500).json({
    success:false,
    message:err.message||"internal server error"
   })
})