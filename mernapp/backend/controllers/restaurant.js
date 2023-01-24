const createError=require('../middlewares/createError');
const Restaurant=require('../models/RestaurantModel');
const Auth=require('../models/AuthModel');

const createRestaurant=async(req,res,next)=>{
   try{
      const restaurant=new Restaurant({...req.body});
      await restaurant.save();
      try{
         await Auth.findOneAndUpdate(
            {email:restaurant.email},
            {
               $push:{restaurantId:restaurant._id},
               $set:{isAdmin:true}
            },
            {new:true}
         )
      }
      catch(err){
         return next(createError());
      }
      res.status(200).json({success:true,restaurant});
   }
   catch(err){
      next(createError());
   }
}

const getRestaurant=async(req,res,next)=>{
   const {id}=req.params;
   try{
      const restaurant=await Restaurant.findById(id);
      res.status(200).json({success:true,restaurant});
   }
   catch(err){
      next(createError());
   }
}

const getRestaurants=async(req,res,next)=>{
   try{
      const restaurants=await Restaurant.findOne({email:req.body.email});
      res.status(200).json({success:true,restaurants})
   }
   catch(err){
      next(createError());
   }
}

module.exports={
   getRestaurant,
   getRestaurants,
   createRestaurant
}