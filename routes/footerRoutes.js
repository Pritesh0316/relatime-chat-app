const express = require("express");
const router = express.Router();
const {requireAuth}  = require("../middlware/authMiddleware");
const wrapAsync = require("../utils/wrapAsync");

router.get("/policy", (req, res) => {
    res.render("footer/policy");
});

router.get("/terms", (req, res) => {
    res.render("footer/terms");
});


module.exports = router;