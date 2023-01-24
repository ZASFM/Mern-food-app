const express=require('express');
const {postRating,deleteRating,updateRating}=require('../controllers/rating');
const router=express.Router();

router.route('/:restaurantId').post(postRating);
router.route('/:id').put(updateRating);
router.route('/:id').delete(deleteRating);

module.exports=router;