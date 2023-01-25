const createError=require('../middlewares/createError');
const Restaurant=require('../models/RestaurantModel');
const Auth=require('../models/AuthModel');
const Rating=require('../models/RatingsModal');

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
      next(createError(404,'Could not create restaurant'));
   }
}

const getRestaurant=async(req,res,next)=>{
   const {id}=req.params;
   try{
      const restaurant=await Restaurant.findById(id);
      res.status(200).json({success:true,restaurant});
   }
   catch(err){
      next(createError(404,'Could not get restaurant'));
   }
}

const getRestaurants=async(req,res,next)=>{
   const {email:myEmail}=req.query;
   try{
      const restaurants=await Restaurant.find({email:myEmail});
      res.status(200).json({success:true,restaurants})
   }
   catch(err){
      next(createError(404,'Could not get restaurants'));
   }
}

const getRestaurantRatings=async(req,res,next)=>{
   const {id}=req.params;
   try{
      const restaurant=await Restaurant.findById(id);
      const ratingLists=await Promise.all(restaurant.ratings.map(rating=>{
         return Rating.findById(rating.id);
      }))
      res.status(200).json({success:true,ratingLists});
   }
   catch(err){
      next(createError(404,'Could not get restaurant ratings'));
   }
}

module.exports={
   getRestaurant,
   getRestaurants,
   createRestaurant,
   getRestaurantRatings
}