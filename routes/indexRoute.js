const express = require("express");
const router = express.Router();
const {requireAuth}  = require("../middlware/authMiddleware");
const User = require("../models/User");
const Message = require("../models/Message");

router.get("/", requireAuth , async(req, res) => {
    const currentUser = req.user._id.toString();
    const users = await User.find(); 
    const lastMessageMap = {};

    for (let u of users) {
        if (u._id.toString() === currentUser) continue;

        const lastMsg = await Message.findOne({
        $or: [
            { senderId: currentUser, receiverId: u._id.toString() },
            { senderId: u._id.toString(), receiverId: currentUser }
        ]
        }).sort({ timestamp: -1 });

        // ✅ IMPORTANT: use string key
        lastMessageMap[u._id.toString()] = lastMsg;
    }

    res.render("contacts", {
        users,
        currentUser,        // string
        lastMessageMap
    });
});

module.exports = router;