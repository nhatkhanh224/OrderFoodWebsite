const Food = require("../models/Food");
class RestaurantController {
  index(req, res) {
    res.render("manager_restaurant/home", { layout: "layouts/admin" });
  }
  showFood(req, res) {
    Food.find({}, function (err, data) {
      res.render(
        "manager_restaurant/showFood",
        { layout: "layouts/admin", foods: data  },
      );
    });
  }
  createFood(req, res) {
    res.render("manager_restaurant/createFood", { layout: "layouts/admin" });
  }
  postCreateFood(req, res) {
    const food = new Food(req.body);
    food
      .save()
      .then(() => res.redirect(`/create-food`))
      .catch((error) => {
        console.log(error);
      });
  }
}
module.exports = new RestaurantController();
