const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Food = new Schema({
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  description: { type: String },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Food", Food);