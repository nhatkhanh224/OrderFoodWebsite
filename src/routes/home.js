const express = require('express')
const router=express.Router();
const homeController = require('../app/controllers/HomeController');
const restaurantController = require('../app/controllers/RestaurantController');
router.get('/',homeController.index);
router.get('/submit-restaurant',homeController.submitRestaurant);
router.post('/post-restaurant',homeController.postSubmitRestaurant);
router.get('/restaurant',restaurantController.index);
router.get('/show-food',restaurantController.showFood);
router.get('/create-food',restaurantController.createFood);
router.post('/post-create-food',restaurantController.postCreateFood);
module.exports = router;