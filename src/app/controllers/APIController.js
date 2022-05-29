const Category = require("../models/Category");
const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");
class CategoryController {
  showCategory(req, res) {
    Category.find({}).then((category)=>{
      res.status(200).json(category);
    })
  }
  showRestaurant(req, res) {
    Restaurant.find({}).then((restaurant)=>{
      res.status(200).json(restaurant);
    })
  }
  showRestaurantByCategory(req,res) {
    const categoryID=req.params.id;
    Restaurant.find({category_id:categoryID}).then((restaurant)=>{
      res.status(200).json(restaurant);
    })
  }
  showRestaurantDetail(req,res) {
    const restaurant_id=req.params.id;
    Food.find({restaurant_id:restaurant_id}).then((food)=>{
      res.status(200).json(food);
    })
  }
}
module.exports = new CategoryController();
