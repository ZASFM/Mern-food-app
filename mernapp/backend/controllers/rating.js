const Rating=require('../models/RatingsModal');
const createError=require('../middlewares/createError');
const Restaurant=require('../models/RestaurantModel');

const postRating=async(req,res,next)=>{
   const {restaurantId:id}=req.params;
   try{
      const rating=new Rating({...req.body});
      await rating.save();
      try{
         await Restaurant.findByIdAndUpdate(id,{$push:{ratings:{
            id:rating._id,
            rating:rating.rating,
         }}},{new:true});
      }
      catch(err){
         next(createError())
      }
      res.status(200).json({success:true,rating});
   }
   catch(err){
      next(createError())
   }
}


const deleteRating=async(req,res,next)=>{
   const{id}=req.params;
   try{
      const rating=await Rating.findByIdAndDelete(id);
      res.status(200).json({success:true,rating});
   }
   catch(err){
      next(createError())
   }
}

const updateRating=async(req,res,next)=>{
   const{params:{id},body:{message:msg,rating:rt}}=req;
   try{
      const rating=await Rating.findByIdAndUpdate(id,{$set:{
         message:msg,
         rating:rt
      }},{new:true});
      res.status(200).json({success:true,rating});
   }
   catch(err){
      next(createError())
   }
}

module.exports={
   postRating,
   deleteRating,
   updateRating
}