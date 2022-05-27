const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
class HomeController {
  index(req, res) {
    res.render("homepage");
  }
  submitRestaurant(req, res) {
    res.render("submit_restaurant");
  }
  postSubmitRestaurant(req, res) {
    const restaurant = new Restaurant(req.body);
    restaurant
      .save()
      .then(() => res.redirect(`/`))
      .catch((error) => {
        console.log(error);
      });
  }
  login(req, res) {
    res.render("login", { layout: "layouts/login" });
  }
  async postLogin(req, res, next) {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
      role:"manager"
    });
    if (user) {
      res.cookie("userID", user.id, {
        maxAge: 60 * 60 * 1000,
      });
      res.redirect("/restaurant");
    } else {
      res.redirect("/login");
    }
    next();
  }
  logout(req, res, next){
    res.cookie('userID', {}, {maxAge: -1});
    res.redirect('/')
  };
}
module.exports = new HomeController();
