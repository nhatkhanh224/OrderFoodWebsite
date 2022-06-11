const express = require('express')
const router=express.Router();
const homeController = require('../app/controllers/HomeController');
const restaurantController = require('../app/controllers/RestaurantController');
const foodController = require('../app/controllers/FoodController');
const categoryRestaurantController = require('../app/controllers/CategoryRestaurantController');
const categoryController = require('../app/controllers/CategoryController');
const adminController = require('../app/controllers/AdminController');
const authMiddleware = require("../app/middleware/AuthMiddleware");

router.get('/',homeController.index);
router.get('/list-restaurant',homeController.listRestaurant);
router.get('/list-restaurant-:id',homeController.listRestaurant);
router.get('/restaurant-detail-:id',homeController.restaurant);
router.get('/login',homeController.login);
router.post('/login',homeController.postLogin);
router.get('/login-user',homeController.loginUser);
router.post('/login-user',homeController.postLoginUser);
router.get('/register',homeController.register);
router.get('/logout',homeController.logout);
router.get('/submit-restaurant',homeController.submitRestaurant);
router.post('/post-restaurant',homeController.postSubmitRestaurant);
router.post('/search',homeController.searchRestaurant);
// Restaurant
router.get('/restaurant',authMiddleware.requireAuth, restaurantController.index);
//Food
router.get('/show-food',foodController.showFood);
router.get('/create-food',foodController.createFood);
router.post('/post-create-food',foodController.postCreateFood);
router.get('/edit-food-:id',foodController.editFood);
router.post('/post-update-food/:id',foodController.postUpdateFood);
router.post('/post-delete-food/:id',foodController.postDeleteFood);
// Category
router.get('/show-category-restaurant',categoryRestaurantController.showCategory);
router.get('/create-category-restaurant',categoryRestaurantController.createCategory);
router.post('/post-create-category-restaurant',categoryRestaurantController.postCreateCategory);
router.get('/edit-category-restaurant-:id',categoryRestaurantController.editCategory);
router.post('/post-update-category-restaurant/:id',categoryRestaurantController.postUpdateCategory);
router.post('/post-delete-category-restaurant/:id',categoryRestaurantController.postDeleteCategory);

router.post('/post-create-category',categoryController.postCreateCategory);
router.get('/information',restaurantController.information);
router.post('/save-information',restaurantController.saveInformation);
router.get('/order',restaurantController.showOrder);
router.get('/admin',adminController.index);
router.get('/show-restaurant',adminController.showRestaurant);
router.get('/show-detail-restaurant-:id',adminController.showDetailRestaurant);
router.post('/approval-restaurant/:id',adminController.approvalRestaurant);
module.exports = router;