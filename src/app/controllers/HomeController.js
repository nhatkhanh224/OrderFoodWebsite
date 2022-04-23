const Restaurant = require("../models/Restaurant");
class HomeController {
  index(req, res) {
    res.render("homepage");
  }
  submitRestaurant(req,res) {
    res.render("submit_restaurant");
  }
  postSubmitRestaurant(req,res) {
    const restaurant = new Restaurant(req.body);
    restaurant
      .save()
      .then(() => res.redirect(`/`))
      .catch((error) => {console.log(error);});
  }
}
module.exports = new HomeController();
