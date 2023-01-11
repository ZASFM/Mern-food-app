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

module.exports={
   createCategory
}