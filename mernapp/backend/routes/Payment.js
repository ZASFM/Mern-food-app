const express=require('express');
const router=express.Router();
const checkout=require('../controllers/payment');

router.route('/').post(checkout);

module.exports=router;