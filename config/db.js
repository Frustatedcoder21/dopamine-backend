const mongoose=require("mongoose");
const ErrorHandler = require("./ErrorHandler");

const dbConnect=async()=>{
    try{
         await mongoose.connect(`${process.env.MONGODB_URI}coaching`);
         console.log('connected to database');
         
    }catch(e){
      throw new ErrorHandler('cannot connect to database ',500);
    }
    
}
module.exports=dbConnect