const express=require('express');
const router=express.Router();
const {createItems,getItems}=require('../controllers/foodItems');
const {verifyToken}=require('../middlewares/verifyToken');

router.route('/').post(createItems).get(getItems);

module.exports=router;