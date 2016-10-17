const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * ToDo: add EventID
 */
module.exports = mongoose.model("Song", new Schema({
  artist: String,
  title: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  eventId: { type: Number, default: -1 },
  created: { type: Date, default: Date.now() }
}));