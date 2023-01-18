const jwt=require('jsonwebtoken');

const verifyToken=async(req,res,next)=>{
   const token=req.cookies.access_token
   console.log('Token: ',token);
   next();
}

module.exports={
   verifyToken
}