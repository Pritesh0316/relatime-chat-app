const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.get("/:id", async (req, res) => {
    let currentUser;
    const otherUser = req.params.id;

    if(otherUser == "69da04fb9e6788d4c127f058"){
        currentUser = "69da05139e6788d4c127f05c";
    }else{
        currentUser = "69da04fb9e6788d4c127f058";
    }

    const messages = await Message.find({
        $or: [
            { senderId: currentUser, receiverId: otherUser },
            { senderId: otherUser, receiverId: currentUser }
        ]
    }).sort({ timestamp: 1 }); // ✅ FIX ORDER

    res.render("chat", {
        currentUser,
        otherUser,
        messages
    });
});

module.exports = router;