const mongoose=require('mongoose');

const RatingSchema=mongoose.Schema({
/*    restaurantId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Restaurant'
   }, */
   rating:{
      type:Number,
      min:0,
      max:5,
      required:[true,'Rating is required']
   },
   message:{
      type:String,
      maxlength:100,
      required:[true,'Message is required']
   },
   date:{
      type:Date,
      default:Date.now,
   }
})

module.exports=mongoose.model('RatingSchema',RatingSchema);