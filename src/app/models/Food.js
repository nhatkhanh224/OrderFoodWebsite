const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Food = new Schema({
  name: { type: String },
  categoryRestaurantId: { type: String },
  price: { type: Number },
  image: { type: String },
  description: { type: String },
  restaurant_id: { type: String },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Food", Food);
