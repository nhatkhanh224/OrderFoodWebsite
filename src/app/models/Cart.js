const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cart = new Schema({
  food_id: { type: String },
  food_name: { type: String },
  food_image: { type: String },
  restaurant_id: { type: String },
  restaurant_name: { type: String },
  restaurant_thumbnail: { type: String },
  user_id: { type: String },
  quantity: { type: Number },
  price: { type: Number },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Cart", Cart);
