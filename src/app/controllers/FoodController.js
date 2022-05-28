const Food = require("../models/Food");
const CategoryRestaurant = require("../models/Category_Restaurant");
const User = require("../models/User");
class FoodController {
  index(req, res) {
    res.render("manager_restaurant/home", {
      layout: "layouts/admin_restaurant",
    });
  }
  showFood(req, res) {
    User.findById(req.cookies.userID).then((user)=>{
      Food.find({ restaurant_id: user.restaurant_id }, function (err, data) {
        res.render("manager_restaurant/showFood", {
          layout: "layouts/admin_restaurant",
          foods: data,
        });
      });
    })
  }
  createFood(req, res) {
    User.findById(req.cookies.userID).then((user) => {
      CategoryRestaurant.find(
        { restaurant_id: user.restaurant_id },
        function (err, data) {
          res.render("manager_restaurant/createFood", {
            layout: "layouts/admin_restaurant",
            categories: data,
          });
        }
      );
    });
  }
  postCreateFood(req, res) {
    User.findById(req.cookies.userID).then((user)=>{
      const food = new Food({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        categoryRestaurantId: req.body.categoryRestaurantId,
        restaurant_id: user.restaurant_id,
      });
      console.log(food);
      food
        .save()
        .then(() => res.redirect(`/show-food`))
        .catch((error) => {
          console.log(error);
        });
    })
  }
  editFood(req, res, next) {
    const id = req.params.id;
    Food.findById(id)
      .then((foods) => {
        CategoryRestaurant.find().then((categories) => {
          res.render("manager_restaurant/editFood", {
            layout: "layouts/admin_restaurant",
            foods: foods,
            categories: categories,
          });
        });
      })
      .catch(next);
  }
  postUpdateFood(req, res, next) {
    Food.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect(`/show-food`))
      .catch(next);
  }
  postDeleteFood(req, res, next) {
    Food.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}
module.exports = new FoodController();
