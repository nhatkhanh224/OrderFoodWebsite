const CategoryRestaurant = require("../models/Category_Restaurant");
const Category = require("../models/Category");
const User = require("../models/User");
class CategoryRestaurantController {
  showCategory(req, res,next) {
    User.findById(req.cookies.userID)
      .then((user) => {
        CategoryRestaurant.find({ restaurant_id: user.restaurant_id }, function (err, data) {
          res.render("manager_restaurant/showCategory", {
            layout: "layouts/admin_restaurant",
            categories: data,
          });
        });
      })
      .catch(next);
  }
  createCategory(req, res) {
    Category.find({}, function (err, data) {
      res.render("manager_restaurant/createCategory", {
        layout: "layouts/admin_restaurant",
        categories: data,
      });
    });
  }
  postCreateCategory(req, res, next) {
    User.findById(req.cookies.userID)
      .then((user) => {
        const category = new CategoryRestaurant({
          name: req.body.name,
          description: req.body.description,
          categoryId: req.body.categoryId,
          restaurant_id: user.restaurant_id,
        });
        category
          .save()
          .then(() => res.redirect(`/show-category-restaurant`))
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(next);
  }
  editCategory(req, res, next) {
    const id = req.params.id;
    CategoryRestaurant.findById(id)
      .then((categoryRestaurant) => {
        Category.find().then((categories) => {
          res.render("manager_restaurant/editCategory", {
            layout: "layouts/admin_restaurant",
            categoryRestaurant: categoryRestaurant,
            categories: categories,
          });
        });
      })
      .catch(next);
  }
  postUpdateCategory(req, res, next) {
    User.findById(req.cookies.userID)
      .then((user) => {
        console.log(user);
        CategoryRestaurant.updateOne({ _id: req.params.id }, {
          name: req.body.name,
          description : req.body.description,
          categoryId:req.body.categoryId,
          restaurantId:user.restaurant_id
        })
        .then(() => res.redirect(`/show-category-restaurant`))
      })
      .catch(next);
  }
  postDeleteCategory(req, res, next) {
    CategoryRestaurant.deleteOne({ _id: req.params.id })
    .then(() => res.redirect("back"))
    .catch(next);
  }
}
module.exports = new CategoryRestaurantController();
