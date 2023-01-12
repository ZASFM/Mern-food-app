const express=require('express');
const router=express.Router();
const {register,login}=require('../controllers/auth');
const {body}=require('express-validator');

router.route('/login').post(login);
router.route('/register').post(register,[   
   body('email').isEmail(),
   body('password','Incorrect password').isLength({ min: 5 }),
   body('name').isLength({ min: 5 })
]);

module.exports=router;