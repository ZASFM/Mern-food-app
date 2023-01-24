const mongoose=require('mongoose');

const RestaurantSchema=mongoose.Schema({
   name:{
      type:String,
      required:[true,'Name is required'],
   },
   location:{
      type:String,
      required:[true,'Location is required'],
   },
   delivery:{
      type:String,
      enum:['Free','Not free'],
      required:[true,'Delivery is required'],
   },
   typeOfRestaurant:{
      type:String,
      enum:['Fast food','Oriental','European','American','Luxury','Veg','Vegan','Persian/Arabic','Grill'],
      required:[true,'Type is required']
   },
   email:{
      type:String,
      required:[true,'Email is required']
   },
   dishes:{
      type:[String],
   },
   ratings:{
      type:[
         {
            id:String,
            rating:Number
         }
      ]
   }
})

module.exports=mongoose.model('RestaurantSchema',RestaurantSchema);