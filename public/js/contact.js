const socket = io();

socket.on("connect", () => {
    socket.emit("join", currentUserId);
});

socket.on("online_users", (users) => {
    users.forEach(userId => {
        const dot = document.getElementById(`dot-${userId}`);
        if (dot) {
            dot.classList.remove("d-none");
        }
    });
});

socket.on("user_online", (userId) => {

    const dot = document.getElementById(`dot-${userId}`);
    if (dot) {
        dot.classList.remove("d-none");
    }
});

socket.on("user_offline", (userId) => {

    const dot = document.getElementById(`dot-${userId}`);
    if (dot) {
        dot.classList.add("d-none");
    }
});
