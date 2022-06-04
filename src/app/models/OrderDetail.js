const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderDetail = new Schema({
  order_id :{ type: String },
  food:{ type: Array },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("OrderDetail", OrderDetail);
