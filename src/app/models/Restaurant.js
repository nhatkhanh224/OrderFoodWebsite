const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Restaurant = new Schema({
  name: { type: String },
  manager_name: { type: String },
  email: { type: String },
  user_id: { type: String },
  category_id: { type: String },
  number_phone: { type: String },
  address: { type: String },
  city: { type: String },
  description: { type: String },
  thumbnail: { type: String },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Restaurant", Restaurant);
