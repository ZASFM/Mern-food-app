const foodItems=require('../models/Food_items');
const createError=require('../middlewares/createError');
const Restaurant=require('../models/RestaurantModel');

const createItems=async(req,res,next)=>{
   const {restaurantId:id}=req.params;
   try{
      const item=new foodItems({...req.body});
      await item.save();
      try{
         await Restaurant.findByIdAndUpdate(id,{$push:{dishes:item._id}},{new:true});
      }
      catch(err){
         return next(createError(400,'Both email and password are required'));
      }
      res.status(200).json({success:true,item});
   }
   catch(err){
      next(createError(400,'Both email and password are required'));
   }
}

const getItems=async(req,res,next)=>{
   try{
      const items=await foodItems.find();
      res.status(200).json({success:true,items});
   }
   catch(err){
      next(createError(400,'Could not get food items'));
   }
}

module.exports={
   createItems,
   getItems
}