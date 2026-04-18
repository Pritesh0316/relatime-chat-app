const express = require("express");
const router = express.Router();
const {requireAuth}  = require("../middlware/authMiddleware");
const chatController = require("../controllers/chatController");
const wrapAsync = require("../utils/wrapAsync");

router.get("/:id",requireAuth ,wrapAsync(chatController.chats));

module.exports = router;