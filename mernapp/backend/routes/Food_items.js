const express=require('express');
const router=express.Router();
const {createItems,getItems}=require('../controllers/foodItems');

router.route('/').post(createItems).get(getItems);

module.exports=router;