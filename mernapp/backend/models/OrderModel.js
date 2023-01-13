const mongoose=require('mongoose');

const OrderSchema=mongoose.Schema({
   email:{
      type:String,
      required:true,
      unique:true,
   },
   order_data:{
      type:Array,
      required:true
   }
})

module.exports=mongoose.model('OrderSchema',OrderSchema);