const mongoose = require("mongoose");
const Schema = mongoose.Schema;


module.exports = mongoose.model("Event", new Schema({
  deejayId: String,
  title: String,
  location: String,
  organizer: String,
  eventDate: Date,
  songs: [String],
  created: { type: Date, default: Date.now() }
}));