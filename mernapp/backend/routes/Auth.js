const express=require('express');
const router=express.Router();
const {register,login}=require('../controllers/auth');
const {verifyToken}=require('../middlewares/verifyToken');

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/token').get(verifyToken);

module.exports=router;