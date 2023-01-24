const express=require('express');
const router=express.Router();
const {createRestaurant,getRestaurant,getRestaurants,getRestaurantRatings}=require('../controllers/restaurant');

router.route('/').post(createRestaurant).get(getRestaurants);
router.route('/:id').get(getRestaurant);
router.route('/restaurant/:id').get(getRestaurantRatings);

module.exports=router;