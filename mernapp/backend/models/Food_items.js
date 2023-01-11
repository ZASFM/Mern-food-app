const mongoose=require('mongoose');

const Food_items_Schema=mongoose.Schema({
   categoryName:{
      type:String,
      required:[true,'Category is required']
   },
   name:{
      type:String,
      required:[true,'Name is required'],
      unique:true,
   },
   img:{
      type:String,
      required:[true,'Img is required']
   },
   option:{
      type:[],
      required:[true,'Option is required']
   },
   description:{
      type:String,
      required:[true,'Description is required']
   },
},{
   collection:'food_items'
})

module.exports=mongoose.model('Food_items_Schema',Food_items_Schema);