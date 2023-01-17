const jwt=require('jsonwebtoken');

const verifyToken=async(req,res,next)=>{
   const token=req
   //console.log(token);
   next();
}

module.exports={
   verifyToken
}