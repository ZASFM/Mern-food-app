const Auth=require('../models/AuthModel');

const register=async(req,res)=>{
   try{
      const user=new Auth({...req.body});
      await user.save();
      res.status(200).json({success:true,user});
   }
   catch(err){
      console.log(err);
   }
}

const login=async(req,res)=>{

}

module.exports={
   register,
   login
}