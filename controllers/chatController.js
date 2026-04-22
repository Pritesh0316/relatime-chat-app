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
    }).sort({ timestamp: 1 });

    res.render("pages/chat", {
        currentUser,
        otherUser,
        messages,
        user        
    });

};

module.exports.delete = async (req, res) => {
    const currentUser = req.user._id;
    const otherUser = req.params.id;

    await Message.deleteMany({
        $or: [
            { senderId: currentUser, receiverId: otherUser },
            { senderId: otherUser, receiverId: currentUser }
        ]
    });

    res.json({ success: true, message: "Chat deleted successfully" });
};