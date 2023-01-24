const express=require('express');
const router=express.Router();
const {createRestaurant,getRestaurant,getRestaurants}=require('../controllers/restaurant');

router.route('/').post(createRestaurant).get(getRestaurants);
router.route('/:id').get(getRestaurant);

module.exports=router;