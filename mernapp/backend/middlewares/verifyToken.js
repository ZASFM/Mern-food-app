const jwt=require('jsonwebtoken');

const verifyToken=async(req,res,next)=>{
   const token=req.cookies.access_token
   console.log(token);
   next();
}

module.exports={
   verifyToken
}