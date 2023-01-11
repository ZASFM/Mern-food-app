const foodCategory=require('../models/FoodCategory');

const createCategory=async(req,res)=>{
   try{
      const category=new foodCategory({...req.body});
      await category.save();
      res.status(200).json({success:true,category});
   }
   catch(err){
      console.log(err);
   }
}

module.exports={
   createCategory
}