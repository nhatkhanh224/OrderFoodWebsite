const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
class RestaurantController {
  index(req, res) {
    res.render("admin/home", { layout: "layouts/admin" });
  }
  showRestaurant(req, res) {
    Restaurant.find({}, function (err, data) {
      res.render("admin/showRestaurant", {
        layout: "layouts/admin",
        restaurants: data,
      });
    });
  }
  showDetailRestaurant(req, res, next) {
    const id = req.params.id;
    Restaurant.findById(id)
      .then((restaurants) => {
        res.render("admin/showDetailRestaurant", {
          layout: "layouts/admin",
          restaurant: restaurants,
        });
      })
      .catch(next);
  }
  approvalRestaurant(req, res, next) {
    const restaurant_id = req.params.id;
    Restaurant.findById(restaurant_id)
      .then((restaurant) => {
        const user = new User({
          username: restaurant.email,
          password: Math.floor(Math.random() * 999999) + 100000,
          role: "manager",
          restaurant_id: restaurant_id,
        });
        user
          .save()
          .then(() => res.redirect(`/show-restaurant`))
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(next);
  }
}
module.exports = new RestaurantController();
