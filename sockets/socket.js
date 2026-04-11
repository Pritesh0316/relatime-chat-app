const Message = require("../models/Message");

module.exports = (io) => {

    io.on("connection", (socket) => {

        socket.on("join", (userId) => {
            socket.join(userId);
        });

        socket.on("send_message", async (data) => {
            let { senderId, receiverId, message } = data;

            // ❌ prevent empty messages
            if (!message || message.trim() === "") return;

            message = message.trim();

            // ✅ save in DB
            const newMsg = new Message({
                senderId,
                receiverId,
                message
            });

            const savedMsg = await newMsg.save();

            // ✅ send to BOTH sender + receiver
            io.to(senderId).emit("receive_message", savedMsg);
            io.to(receiverId).emit("receive_message", savedMsg);
        });

    });

};