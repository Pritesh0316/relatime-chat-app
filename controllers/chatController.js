const Message = require("../models/Message");
const User = require("../models/User");

module.exports.chats = async (req, res) => {
    const currentUser = req.user._id;
    const otherUser = req.params.id;
    const user = await User.findById(req.params.id);

    const messages = await Message.find({
        $or: [
            { senderId: currentUser, receiverId: otherUser },
            { senderId: otherUser, receiverId: currentUser }
        ]
    }).sort({ timestamp: 1 }); // ✅ FIX ORDER

    res.render("chat", {
        currentUser,
        otherUser,
        messages,
        user
    });

};