const express = require("express");
const router = express.Router();
const {requireAuth}  = require("../middlware/authMiddleware");
const indexController = require("../controllers/indexController");
const wrapAsync = require("../utils/wrapAsync");

router.get("/", requireAuth , wrapAsync(indexController.index));

module.exports = router;