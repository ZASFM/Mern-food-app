const express=require('express');
const router=express.Router();
const {postOrder}=require('../controllers/order');

router.route('/').post(postOrder);

module.exports=router;