const mongoose=require('mongoose');

const FoodCategorySchema=mongoose.Schema({
   categoryName:{
      type:String,
      required:[true,'Category is required']
   },
},{
   collection:'foodCategory'
})


module.exports=mongoose.model('FoodCategorySchema',FoodCategorySchema);