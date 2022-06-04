const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Order = require("../models/Order");
class RestaurantController {
  index(req, res) {
    res.render("manager_restaurant/home", {
      layout: "layouts/admin_restaurant",
    });
  }
  information(req, res, next) {
    User.findById(req.cookies.userID).then((user) => {
      Restaurant.findById(user.restaurant_id)
        .then((restaurant) => {
          res.render("manager_restaurant/information", {
            layout: "layouts/admin_restaurant",
            restaurant: restaurant,
          });
        })
        .catch(next);
    });
  }
  saveInformation(req, res, next) {
    User.findById(req.cookies.userID).then((user) => {
      Restaurant.updateOne({ _id: user.restaurant_id }, req.body)
        .then(() => res.redirect(`/information`))
        .catch(next);
    });
  }
  showOrder(req,res,next) {
    User.findById(req.cookies.userID).then((user) => {
      console.log(user);
      Order.find({restaurant_id:user.restaurant_id})
        .then((order) => {
          res.render("manager_restaurant/order", {
            layout: "layouts/admin_restaurant",
            orders: order,
          });
        })
        .catch(next);
    });
  }
}
module.exports = new RestaurantController();
