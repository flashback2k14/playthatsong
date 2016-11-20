const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model("User", new Schema({
  name: String,
  password: String,
  admin: { type: Boolean, default: false} ,
  deejay: { type: Boolean, default: false },
  created: { type: Number, default: Date.now() },
  availableVotes: { type: Number, default: 10 },
  firstVoting: { type: Number, default: null },
  resetVoting: { type: Number, default: null }
}));