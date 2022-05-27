const Food = require("../models/Food");
const Category = require("../models/Category");
class FoodController {
  index(req, res) {
    res.render("manager_restaurant/home", { layout: "layouts/admin_restaurant" });
  }
  showFood(req, res) {
    Food.find({user_id:req.cookies.userID}, function (err, data) {
      res.render("manager_restaurant/showFood", {
        layout: "layouts/admin_restaurant",
        foods: data,
      });
    });
  }
  createFood(req, res) {
    Category.find({}, function (err, data) {
      res.render("manager_restaurant/createFood", {
        layout: "layouts/admin_restaurant",
        categories: data,
      });
    });
  }
  postCreateFood(req, res) {
    const user_id=req.cookies.userID;
    const food = new Food({
      name:req.body.name,
      price:req.body.price,
      image:req.body.image,
      description:req.body.description,
      category_id:req.body.categoryId,
      user_id:user_id
    });
    food
      .save()
      .then(() => res.redirect(`/show-food`))
      .catch((error) => {
        console.log(error);
      });
  }
  editFood(req, res,next) {
    const id = req.params.id;
    Food.findById(id)
      .then((foods) => {
        Category.find().then((categories) => {
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
