const express=require('express');
const router=express.Router();
const {createItems}=require('../controllers/foodItems');

router.route('/').post(createItems);

module.exports=router;