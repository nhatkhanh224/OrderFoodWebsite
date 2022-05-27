const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
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
}
module.exports = new RestaurantController();
