const User = require("../models/User");
const Message = require("../models/Message");

module.exports.index =async(req, res) => {
    res.set("Cache-Control", "no-store");
    
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

        lastMessageMap[u._id.toString()] = lastMsg;
    }

    res.render("pages/contacts", {
        users,
        currentUser,  
        lastMessageMap
    });
};