const Auth=require('../models/AuthModel');
const createError=require('../middlewares/createError');
const {validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const bcryptjs=require('bcryptjs');

const register=async(req,res,next)=>{
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try{
      const user=new Auth({...req.body});
      await user.save();
      res.status(200).json({success:true,user});
   }
   catch(err){
      next(createError(400,'Could not create the user'));
   }
}

const login=async(req,res,next)=>{
   const {email,password}=req.body;
   try{
      if(!email||!password){
         return next(createError(400,'Both email and password are required'));
      }
      const user=await Auth.findOne({email});
      if(!user){
         return next(createError(400,'Not such a user'));
      }
      const passwordConfirmation=await bcryptjs.compare(password,user.password);
      if(!passwordConfirmation){
         return next(createError(400,'Password is incorrect'));
      }
      const token=jwt.sign({userId:user._id,userEmail:email},process.env.JWT_SECRET);
      res.cookie('access_token',token,{
         httpOnly:true
      }).status(200).json({
         success:true,
         user,
         token
      })
   }
   catch(err){
      next(createError(400,'Could not perform user search'));
   }
}

module.exports={
   register,
   login
}