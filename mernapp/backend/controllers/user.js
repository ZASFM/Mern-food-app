const Auth=require('../models/AuthModel');
const createError=require('../middlewares/createError');

const addJWT=async(req,res,next)=>{
   const {params:{email:emailAddress},body:{jwtToken}}=req;
   try{
      await Auth.findOneAndUpdate({email:emailAddress},{$push:{jwt:jwtToken}},{new:true});
      res.status(200).json({success:true})
   }
   catch(err){
      next(createError(400,'Could not find user'))
   }
}
const updateProfile=async(req,res,next)=>{
   const {jwt}=req.params;
   try{
      const user= await Auth.findOneAndUpdate({jwt},{$set:req.body},{new:true});
      res.status(200).json({success:true,user}); 
   }
   catch(err){
      next(createError(400,'Could not update profile'))
   }
}
const getProfile=async(req,res,next)=>{
   const {jwt}=req.params;
   try{
      const user=await Auth.findOne({jwt});
      res.status(200).json({success:true,user});
   }
   catch(err){
      next(createError(400,'Could not get profile'))
   }
}
const deleteProfile=async(req,res,next)=>{
   const {jwt}=req.params;
   try{
      const user=await Auth.findOneAndDelete({jwt});
      res.status(200).json({success:true,user});
   }
   catch(err){
      next(createError(400,'Could not delete profile'))
   }
}

module.exports={
   updateProfile,
   addJWT,
   getProfile,
   deleteProfile
}