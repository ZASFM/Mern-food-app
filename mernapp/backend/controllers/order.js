const Order=require('../models/OrderModel');
const createError=require('../middlewares/createError');

const postOrder=async(req,res,next)=>{
   let data=req.body.order_data;
   await data.splice(0,0,{Order_date:req.body.order_date});

   let eId=await Order.findOne({email:req.body.email});
   if(eId===null){
      try{
         await Order.create({
            email:req.body.email,
            order_data:data,
         })
         res.status(200).json({success:true});
      }
      catch(err){
         next(createError(400,'Could not create user order data'));
      }
   }else{
      try{
         await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}});
         res.status(200).json({success:true});
      }
      catch(err){
         next(createError(400,'Could not add to client order'))
      }
   }
}

const getMyOrder=async(req,res,next)=>{
   try{
      const myOrder=await Order.findOne({'email':req.body.email});
      res.status(200).json({success:true,orderData:myOrder});
   }
   catch(err){
      next(createError(400,'Could not get personal data'));
   }
}
module.exports={
   postOrder,
   getMyOrder
}