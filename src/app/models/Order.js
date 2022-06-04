const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = new Schema({
  user_id :{ type: String },
  restaurant_id :{ type: String },
  address :{ type: String },
  total:{ type: String },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Order", Order);
