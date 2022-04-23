const express = require('express')
const router=express.Router();
const restaurantController = require('../app/controllers/RestaurantController')
router.get('/',restaurantController.index);
module.exports = router;