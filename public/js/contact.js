const socket = io();

socket.on("connect", () => {
   // 🔥 THIS WAS MISSING
    socket.emit("join", currentUserId);
});

// ✅ initial online users
socket.on("online_users", (users) => {
    users.forEach(userId => {
        const dot = document.getElementById(`dot-${userId}`);
        if (dot) {
            dot.classList.remove("d-none");
        }
    });
});

// ✅ someone comes online
socket.on("user_online", (userId) => {

    const dot = document.getElementById(`dot-${userId}`);
    if (dot) {
        dot.classList.remove("d-none");
    }
});

// ✅ someone goes offline
socket.on("user_offline", (userId) => {

    const dot = document.getElementById(`dot-${userId}`);
    if (dot) {
        dot.classList.add("d-none");
    }
});
