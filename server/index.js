const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("../config");
const User = require("./models/user");
const Event = require("./models/event");
const Song = require("./models/song");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const AuthService = require("./logic/auth.service")(User, config.secret, config.pwSecret);
const UserService = require("./logic/user.service")(User);
const EventService = require("./logic/event.service")(Event);
const SongService = require("./logic/song.service")(Song);

const baseRoute = require("./routes/index")(express);
const baseApiV1Route = require("./routes/api/v1/index")(express);
const authApiV1Route = require("./routes/api/v1/auth/index")(express, AuthService);
const usersApiV1Route = require("./routes/api/v1/users/index")(express, UserService);
const eventApiV1Route = require("./routes/api/v1/events/index")(express, EventService, SongService);
const songsApiV1Route = require("./routes/api/v1/songs/index")(express, SongService);

app.use("/", baseRoute);
app.use("/api/v1", baseApiV1Route);
app.use("/api/v1/auth", authApiV1Route);
app.use("/api/v1/users", AuthService.checkAuthState, usersApiV1Route);
app.use("/api/v1/events", AuthService.checkAuthState, eventApiV1Route);
app.use("/api/v1/songs", AuthService.checkAuthState, songsApiV1Route);

const server = http.createServer(app).listen(config.port, () => {
  console.log(`Server is running under PORT: ${config.port}`);
});