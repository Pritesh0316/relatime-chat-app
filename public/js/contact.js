const socket = io();

socket.on("connect", () => {
    console.log("✅ Connected to server:", socket.id);
    console.log("Connected:", socket.id);

    // 🔥 THIS WAS MISSING
    socket.emit("join", currentUserId);
});

// ✅ initial online users
socket.on("online_users", (users) => {
    console.log("Online users:", users);

    users.forEach(userId => {
        const dot = document.getElementById(`dot-${userId}`);
        if (dot) {
            dot.classList.remove("d-none");
        }
    });
});

// ✅ someone comes online
socket.on("user_online", (userId) => {
    console.log(userId, "came online");

    const dot = document.getElementById(`dot-${userId}`);
    if (dot) {
        dot.classList.remove("d-none");
    }
});

// ✅ someone goes offline
socket.on("user_offline", (userId) => {
    console.log(userId, "went offline");

    const dot = document.getElementById(`dot-${userId}`);
    if (dot) {
        dot.classList.add("d-none");
    }
});