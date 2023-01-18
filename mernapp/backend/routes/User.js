const express=require('express');
const router=express.Router();
const {updateProfile,deleteProfile,addJWT,getProfile}=require('../controllers/user');

router.route('/profile/:jwt').get(getProfile).put(updateProfile).delete(deleteProfile);
router.route('/addJW/:email').put(addJWT);

module.exports=router;