const express=require('express');
const router=express.Router();
const {postOrder,getMyOrder}=require('../controllers/order');

router.route('/').post(postOrder)
router.route('/getMyOrder').post(getMyOrder);

module.exports=router;