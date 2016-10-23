// imports
const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// load config file
const config = require("../config");
// get models
const User = require("./models/user");;
const Song = require("./models/song");
const Event = require("./models/event");
// create app
const app = express();
// config mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
// config app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// create helpers
const CryptoHelper = require("./logic/helpers/crypto.helper")(config.pwSecret)
// create services
if (config.isDebug) {
  var SetupService = require("./logic/services/setup.service")(User, Event, Song);
}
const AuthService = require("./logic/services/auth.service")(User, config.secret, CryptoHelper);
const UserService = require("./logic/services/user.service")(User);
const EventService = require("./logic/services/event.service")(Event, Song);
const SongService = require("./logic/services/song.service")(Song);
// create routes
if (config.isDebug) {
  var setupTestDataRoute = require("./routes/setup/index")(express, SetupService);
}
const baseRoute = require("./routes/index")(express);
const baseApiV1Route = require("./routes/api/v1/index")(express);
const authApiV1Route = require("./routes/api/v1/auth/index")(express, AuthService);
const usersApiV1Route = require("./routes/api/v1/users/index")(express, UserService);
const eventApiV1Route = require("./routes/api/v1/events/index")(express, EventService, SongService);
const songsApiV1Route = require("./routes/api/v1/songs/index")(express, SongService);
// define routes and add routes
if (config.isDebug) {
  app.use("/setup", setupTestDataRoute);
}
app.use("/", baseRoute);
app.use("/api/v1", baseApiV1Route);
app.use("/api/v1/auth", authApiV1Route);
app.use("/api/v1/users", AuthService.checkAuthState, usersApiV1Route);
app.use("/api/v1/events", AuthService.checkAuthState, eventApiV1Route);
app.use("/api/v1/songs", AuthService.checkAuthState, songsApiV1Route);
// start the server
const server = http.createServer(app).listen(config.port, () => {
  console.log(`Server is running under PORT: ${config.port}`);
});