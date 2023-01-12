const foodCategory=require('../models/FoodCategory');
const createError=require('../middlewares/createError');

const createCategory=async(req,res,next)=>{
   try{
      const category=new foodCategory({...req.body});
      await category.save();
      res.status(200).json({success:true,category});
   }
   catch(err){
      next(createError(400,'Category was not created'));
   }
}

const getCategories=async(req,res,next)=>{
   try{
      const categories=await foodCategory.find();
      res.status(200).json({success:true,categories});
   }
   catch(err){
      next(createError(400,'Could not fetch categories'));
   }
}

module.exports={
   createCategory,
   getCategories,
}