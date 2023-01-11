const Auth=require('../models/AuthModel');
const createError=require('../middlewares/createError');

const register=async(req,res,next)=>{
   try{
      const user=new Auth({...req.body});
      await user.save();
      res.status(200).json({success:true,user});
   }
   catch(err){
      next(createError(400,'Both email and password are required'));
   }
}

const login=async(req,res)=>{

}

module.exports={
   register,
   login
}