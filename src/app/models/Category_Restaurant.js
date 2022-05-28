const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategoryRestaurant = new Schema({
  name: { type: String },
  categoryId: { type: String },
  restaurant_id: { type: String },
  description: { type: String },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CategoryRestaurant", CategoryRestaurant);
