const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  artist: String,
  title: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  created: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Event", new Schema({
  title: String,
  location: String,
  organizer: String,
  eventDate: Date,
  songs: [ songSchema ],
  created: { type: Date, default: Date.now() }
}));