const mongoose = require("mongoose");
const Schema = mongoose.Schema;


module.exports = mongoose.model("Event", new Schema({
  deejayId: String,
  title: String,
  location: String,
  organizer: String,
  eventDate: Number,
  songs: [String],
  created: { type: Number, default: Date.now() }
}));