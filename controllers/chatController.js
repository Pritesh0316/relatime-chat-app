const Message = require("../models/Message");

module.exports.chats = async (req, res) => {
    let currentUser = req.user._id;
    const otherUser = req.params.id;

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

};