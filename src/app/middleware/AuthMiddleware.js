const User = require("../models/User");
module.exports.requireAuth = function (req, res, next) {
  if (!req.cookies.userID) {
    res.redirect("/login");
    return;
  }
  var user = User.findById(req.cookies.userID).then((user) => {
    if (user.role == "manager") {
      res.redirect("/restaurant");
      return;
    }
    
  });
  if (!user && user.role !== "manager") {
    res.redirect("/login");
    return;
  } 
  

  next();
};
