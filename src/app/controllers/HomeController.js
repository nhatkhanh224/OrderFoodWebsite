const Category = require("../models/Category");
const Category_Restaurant = require("../models/Category_Restaurant");
const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
class HomeController {
  index(req, res) {
    Category.find({}).then((categories)=>{
      Restaurant.find({}).then((restaurant)=>{
        res.render("homepage",{
          categories:categories,
          restaurants:restaurant
        });
      })
      
    })
    
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
  loginUser(req,res) {
    res.render("login_user", { layout: "layouts/login_user" });
  }
  register(req,res) {
    res.render("register", { layout: "layouts/login_user" });
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
      res.redirect("/login-user");
    }
    next();
  }
  async postLoginUser(req, res, next) {
    console.log(req);
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (user) {
      res.cookie("userID", user.id, {
        maxAge: 60 * 60 * 1000,
      });
      res.redirect("/");
    } else {
      res.redirect("/login-user");
    }
    next();
  }
  logout(req, res, next){
    res.cookie('userID', {}, {maxAge: -1});
    res.redirect('/')
  };
  restaurant(req,res) {
    const restaurant_id = req.params.id;
    Restaurant.findById(restaurant_id).then((restaurant)=>{
      Category_Restaurant.find({restaurant_id:restaurant._id}).then((categories)=>{
        Food.find({restaurant_id:restaurant._id}).then((foods)=>{
          res.render("restaurant_detail",{
            restaurant:restaurant,
            categories:categories,
            foods:foods
          });
        })
      })
    })
  }
  listRestaurant(req,res) {
   if (req.params.id) {
    Category.find({}).then((categories)=>{
      Restaurant.find({category_id:req.params.id}).then((restaurants)=>{
       res.render("list_restaurant",{
         restaurants:restaurants,
         categories:categories
       });
      })
    })
   } else {
    Category.find({}).then((categories)=>{
      Restaurant.find({}).then((restaurants)=>{
       res.render("list_restaurant",{
         restaurants:restaurants,
         categories:categories
       });
      })
    })
   }
  }
  searchRestaurant(req,res) {
    Restaurant.find({name: {$regex: req.body.key, $options: 'i'}}).then((restaurant)=>{
      res.render("search_restaurant",{
        restaurant:restaurant,
      });
    });
  }
}
module.exports = new HomeController();
