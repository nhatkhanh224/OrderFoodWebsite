const express = require('express')
const router=express.Router();
const homeController = require('../app/controllers/HomeController');
const restaurantController = require('../app/controllers/RestaurantController');
const foodController = require('../app/controllers/FoodController');
const categoryController = require('../app/controllers/CategoryController');
router.get('/',homeController.index);
router.get('/submit-restaurant',homeController.submitRestaurant);
router.post('/post-restaurant',homeController.postSubmitRestaurant);
router.get('/restaurant',restaurantController.index);
router.get('/show-food',foodController.showFood);
router.get('/create-food',foodController.createFood);
router.post('/post-create-food',foodController.postCreateFood);
router.get('/edit-food-:id',foodController.editFood);
router.post('/post-update-food/:id',foodController.postUpdateFood);
router.post('/post-delete-food/:id',foodController.postDeleteFood);
router.post('/post-create-category',categoryController.postCreateCategory);
module.exports = router;