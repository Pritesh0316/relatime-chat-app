const Message = require("../models/Message");

module.exports = (io) => {

    let onlineUsers = new Map();

    io.on("connection", (socket) => {

         console.log("✅ User connected:", socket.id);

        socket.on("join", (userId) => {
            socket.join(userId);

            onlineUsers.set(userId, socket.id);

            socket.broadcast.emit("user_online", userId);

            socket.emit("online_users", Array.from(onlineUsers.keys()));
        });

        socket.on("check_online", (otherUserId) => {
            if (onlineUsers.has(otherUserId)) {
                socket.emit("user_online", otherUserId);
            }
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

        socket.on("disconnect", () => {
            for (let [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);

                    socket.broadcast.emit("user_offline", userId);
                    break;
                }
            }
        });

    });

};