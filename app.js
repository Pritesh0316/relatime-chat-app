const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlware/authMiddleware");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

const userRoutes = require("./routes/userRoutes");

app.use("/", userRoutes);

// Test route
app.get("/chat", (req, res) => {
  res.render("index.ejs");
});


app.use((req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
});

app.use((err, req, res, next) => {
  let{statusCode=500, message="Something went wrong!"} = err;
  res.status(statusCode).render("error", {err});
});

module.exports = app;