const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");
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
  showOrder(req, res, next) {
    User.findById(req.cookies.userID).then((user) => {
      Order.find({ restaurant_id: user.restaurant_id })
        .then((order) => {
          res.render("manager_restaurant/order", {
            layout: "layouts/admin_restaurant",
            orders: order,
          });
        })
        .catch(next);
    });
  }
  showOrderDetail(req, res, next) {
    const order_id = req.params.id;
    console.log(order_id);
    OrderDetail.find({ order_id: order_id })
      .then((order) => {
        console.log(order[0].food);
        res.render("manager_restaurant/orderDetail", {
          layout: "layouts/admin_restaurant",
          orders: order,
          order_detail:order[0].food
        });
      })
      .catch(next);
  }
}
module.exports = new RestaurantController();
