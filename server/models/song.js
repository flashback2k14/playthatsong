const mongoose = require("mongoose");
const Schema = mongoose.Schema;


module.exports = mongoose.model("Song", new Schema({
  artist: String,
  title: String,
  eventId: { type: String, default: "-1" },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  created: { type: Date, default: Date.now() }
}));