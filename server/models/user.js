const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model("User", new Schema({
  name: String,
  password: String,
  admin: { type: Boolean, default: false} ,
  deejay: { type: Boolean, default: false },
  created: { type: Date, default: Date.now() }
}));