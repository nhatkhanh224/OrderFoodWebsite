const Player = require("../models/Player");
class HomeController {
  index(req, res) {
    res.render("homepage");
  }
}
module.exports = new HomeController();
