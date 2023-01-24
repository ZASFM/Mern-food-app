const express=require('express');
const router=express.Router();
const {createItems,getItems}=require('../controllers/foodItems');
const {verifyToken}=require('../middlewares/verifyToken');

router.route('/').get(getItems);
router.route('/:restaurantId').post(createItems);

module.exports=router;