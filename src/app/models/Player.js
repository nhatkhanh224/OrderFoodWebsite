const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Player = new Schema({
  name: { type: String },
  OVR: { type: Number },
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Player", Player);
