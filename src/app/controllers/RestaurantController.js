const Restaurant = require("../models/Restaurant");
class RestaurantController {
  index(req, res) {
    res.render("manager_restaurant/home",{layout:'layouts/admin'});
  }
}
module.exports = new RestaurantController();
