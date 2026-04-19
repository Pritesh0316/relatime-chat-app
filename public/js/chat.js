document.addEventListener("DOMContentLoaded", () => {

const socket = io();

let isTyping = false;
let typingTimeout;

socket.on("connect", () => {
    socket.emit("join", currentUser);
});

// auto scroll function
function scrollToBottom() {
    const chatBox = document.getElementById("chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.sendMessage = function () {
    const input = document.getElementById("messageInput");
    let message = input.value;

    if (!message || message.trim() === "") return;

    socket.emit("send_message", {
        senderId: currentUser,
        receiverId: otherUser,
        message: message
    });

    input.value = "";
}

socket.on("receive_message", (data) => {

    if (
        (data.senderId.toString() === currentUser && data.receiverId.toString() === otherUser) ||
        (data.senderId.toString() === otherUser && data.receiverId.toString() === currentUser)
    ) {
        const chatBox = document.getElementById("chat-box");

        const msgDiv = document.createElement("div");

        msgDiv.classList.add("msg");
        msgDiv.classList.add(
            data.senderId.toString() === currentUser ? "me" : "other"
        );

        msgDiv.innerText = data.message;

        chatBox.appendChild(msgDiv);

        scrollToBottom();
    }
});

const input = document.getElementById("messageInput");

socket.on("online_users", (users) => {
    const dot = document.getElementById("status-text");
    if (!dot) return;

    if (users.includes(otherUser)) {
        dot.classList.remove("d-none");
    } else {
        dot.classList.add("d-none");
    }
});

socket.on("user_online", (userId) => {
    if (userId === otherUser) {
        document.getElementById("status-text")?.classList.remove("d-none");
    }
});

socket.on("user_offline", (userId) => {
    if (userId === otherUser) {
        document.getElementById("status-text")?.classList.add("d-none");
    }
});

input.addEventListener("input", () => {

    socket.emit("typing", {
        senderId: currentUser,
        receiverId: otherUser
    });

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
        socket.emit("stop_typing", {
            senderId: currentUser,
            receiverId: otherUser
        });
    }, 1000);
});


socket.on("typing", (userId) => {
    if (userId === otherUser) {
        isTyping = true;

        const status = document.getElementById("status-text");
        if (status) {
            status.classList.remove("d-none");
            status.innerText = "typing...";
        }
    }
});

socket.on("stop_typing", (userId) => {
    if (userId === otherUser) {
        isTyping = false;

        const status = document.getElementById("status-text");
        if (status) {
            status.innerText = "Online";
        }
    }
});

window.onload = scrollToBottom;

});