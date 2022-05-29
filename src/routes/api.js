const express = require('express')
const router=express.Router();
const apiController = require('../app/controllers/APIController');
router.get('/show-category',apiController.showCategory);
router.get('/show-restaurant',apiController.showRestaurant);
router.get('/show-restaurant/:id',apiController.showRestaurantByCategory);
module.exports = router;