const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const cookieParser = require("cookie-parser");
const {requireAuth}  = require("./middlware/authMiddleware");
require("dotenv").config();
const User = require("./models/User");
const ejsMate = require("ejs-mate");
const { checkUser } = require("./middlware/authMiddleware");
 
const app = express();
const server = http.createServer(app);
const io = new Server(server);

require("./sockets/socket")(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(checkUser);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));


const userRoutes = require("./routes/userRoutes");
const otpRoutes = require("./routes/otpRoutes");
const chatRoutes =require("./routes/chatRoutes");
const indexRoutes = require("./routes/indexRoute");

app.use("/index", indexRoutes);
app.use("/", userRoutes);
app.use("/otp", otpRoutes);
app.use("/chat", chatRoutes);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  let{statusCode=500, message="Something went wrong!"} = err;
  res.status(statusCode).render("error", {err});
});

module.exports = server;