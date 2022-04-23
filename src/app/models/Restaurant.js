const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Restaurant = new Schema({
  name: { type: String },
  email: { type: String },
  restaurant_name: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Restaurant", Restaurant);
