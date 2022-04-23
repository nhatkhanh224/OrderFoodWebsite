const express = require('express')
const router=express.Router();
const homeController = require('../app/controllers/HomeController')
router.get('/',homeController.index);
router.get('/submit-restaurant',homeController.submitRestaurant);
router.post('/post-restaurant',homeController.postSubmitRestaurant);
module.exports = router;