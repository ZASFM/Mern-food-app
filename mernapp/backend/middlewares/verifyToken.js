const jwt=require('jsonwebtoken');

const verifyToken=async(req,res,next)=>{
   const token=localStorage.getItem('token');
   console.log(token);
   next();
}

module.exports={
   verifyToken
}