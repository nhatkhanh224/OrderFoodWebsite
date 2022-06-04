const Category = require("../models/Category");
const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const OrderDetail = require("../models/OrderDetail");

class CategoryController {
  showCategory(req, res) {
    Category.find({}).then((category) => {
      res.status(200).json(category);
    });
  }
  showRestaurant(req, res) {
    Restaurant.find({}).then((restaurant) => {
      res.status(200).json(restaurant);
    });
  }
  showRestaurantByCategory(req, res) {
    const categoryID = req.params.id;
    Restaurant.find({ category_id: categoryID }).then((restaurant) => {
      res.status(200).json(restaurant);
    });
  }
  showRestaurantDetail(req, res) {
    const restaurant_id = req.params.id;
    Food.find({ restaurant_id: restaurant_id }).then((food) => {
      res.status(200).json(food);
    });
  }
  async login(req, res) {
    try {
      const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
      });
      if (user) {
        res.send({
          success: true,
          message: "Login Success",
          user_id: user._id,
        });
      } else {
        res.send({ success: false, message: "Login Failed" });
      }
    } catch (e) {
      res.status(500).send("Server error: " + e.message);
    }
  }
  addToCart(req, res) {
    const user_id = req.body.userID;
    Restaurant.findById(req.body.restaurant_id).then((restaurant) => {
      Cart.find({ food_id: req.body.food_id, user_id: user_id })
        .then((cart) => {
          if (cart.length > 0) {
            Cart.findOneAndUpdate(
              { _id: cart[0].id },
              { $set: { quantity: cart[0].quantity + req.body.quantity } },
              { new: true },
              (err, doc) => {
                if (err) {
                  console.log("Something wrong when updating data!");
                }
                console.log(doc);
              }
            );
          } else {
            const cart = new Cart({
              food_id: req.body.food_id,
              food_name: req.body.food_name,
              food_image: req.body.food_image,
              restaurant_id: req.body.restaurant_id,
              restaurant_name: restaurant.name,
              restaurant_thumbnail: restaurant.thumbnail,
              user_id: user_id,
              quantity: req.body.quantity,
              price: req.body.price,
            });
            cart
              .save()
              .then(() => res.send({ success: true, message: "Add Success" }))
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // cart
      //   .save()
      //   .then(() => res.send({ success: true, message: "Add Success" }))
      //   .catch((error) => {
      //     console.log(error);
      //   });
    });
  }
  showCart(req, res) {
    const user_id = req.params.id;
    Cart.find({ user_id }).then((cart) => {
      const arr = [
        ...new Map(cart.map((item) => [item["restaurant_id"], item])).values(),
      ];
      res.status(200).json(arr);
    });
  }
  showAddress(req, res) {
    const user_id = req.params.id;
    User.findById(user_id).then((user) => {
      res.status(200).json(user.address);
    });
  }
  showFoodCart(req, res) {
    const restaurant_id = req.params.restaurantId;
    const user_id = req.params.userID;
    Cart.find({ restaurant_id, user_id }).then((cart) => {
      res.status(200).json(cart);
    });
  }
  getTotalCart(req, res) {
    const restaurant_id = req.params.id;
    Cart.find({ restaurant_id }).then((cart) => {
      const sum = cart.reduce((accumulator, object) => {
        return accumulator + object.quantity * object.price;
      }, 0);
      res.status(200).json(sum);
    });
  }
  async order(req, res) {
    const order = new Order({
      user_id: req.body.user_id,
      address: req.body.address,
      total: req.body.total,
      restaurant_id: req.body.restaurant_id,
      food: req.body.food,
    });
    const orderDetail = new OrderDetail({
      order_id: order._id,
      food: req.body.food,
    });
    const model1 = await order.save();
    const model2 = await orderDetail.save();
    Cart.deleteMany({ restaurant_id: req.body.restaurant_id })
      .then(() => res.send({ success: true, message: "Add Success" }))
      .catch((error) => {
        console.log(error);
      });

    // order
    //   .save()
    //   .then(() => res.send({ success: true, message: "Add Success" }))
    //   .catch((error) => {
    //     console.log(error);
    // });
  }
  updateCart(req, res) {
    Cart.find({ food_id: req.body.foodID, user_id: req.body.userID }).then((cart)=>{
      Cart.findOneAndUpdate(
        { _id: cart[0].id },
        { $set: { quantity: req.body.quantity } },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!");
          }
          console.log(doc);
        }
      );
    })
    // Cart.findOneAndUpdate(
    //   { _id: req.body.cartID },
    //   { $set: { quantity: req.body.quantity } },
    //   { new: true },
    //   (err, doc) => {
    //     if (err) {
    //       console.log("Something wrong when updating data!");
    //     }
    //     console.log("UPDATE",doc);
    //   }
    // );
  }
  deleteCart(req,res) {
    console.log(req.body.cart_id);
    Cart.deleteOne({ _id: req.body.cart_id})
      .then(() => res.send({ success: true, message: "Delete Success" }))
      .catch((error)=>{
        console.log(error);
      });
  }
}
module.exports = new CategoryController();
