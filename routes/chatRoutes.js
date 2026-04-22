const express = require("express");
const router = express.Router();
const {requireAuth}  = require("../middlware/authMiddleware");
const chatController = require("../controllers/chatController");
const wrapAsync = require("../utils/wrapAsync");

router.get("/:id",requireAuth ,wrapAsync(chatController.chats));
router.delete("/delete/:id",requireAuth, wrapAsync(chatController.delete));

module.exports = router;