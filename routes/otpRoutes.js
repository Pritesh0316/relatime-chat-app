const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");
const wrapAsync = require("../utils/wrapAsync");

router.post("/send", wrapAsync(otpController.otp));

module.exports = router;