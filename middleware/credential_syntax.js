const zod=require('zod');
const ErrorHandler = require('../config/ErrorHandler');

const credentialSchema=zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})
const credentialValidator=(req,res,next)=>{
    const {email,password}=req.body
    const valid= credentialSchema.safeParse({email,password});
    // console.log(valid.error.errors);
    
    if(valid.success){        
       return  next();
       console.log("hello");
       
    }else{
        next(new ErrorHandler(valid.error.errors[0].message))
    }
}
module.exports=credentialValidator