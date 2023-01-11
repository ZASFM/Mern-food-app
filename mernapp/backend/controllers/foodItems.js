const foodItems=require('../models/Food_items');

const createItems=async(req,res)=>{
   try{
      const item=new foodItems({...req.body});
      await item.save();
      res.status(200).json({success:true,item});
   }
   catch(err){
      console.log(err);
   }
}

module.exports={
   createItems
}