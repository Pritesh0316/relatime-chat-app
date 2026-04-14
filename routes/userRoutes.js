const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const wrapAsync = require("../utils/wrapAsync");
const {registerSchema, loginSchema} = require("../validation/authValidation");
const validate = require("../middlware/validate");

// Pages
router.get("/signup", (req, res) => {
  res.render("signup.ejs", {error: null});
});

router.get("/login", (req, res) => {
  res.render("login.ejs", {error: null});
});

// Actions (wrapped)
router.post("/signup", validate(registerSchema), wrapAsync(userController.signup));
router.post("/login", validate(loginSchema), wrapAsync(userController.login));
router.get("/logout", wrapAsync(userController.logout));

module.exports = router;