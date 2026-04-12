const socket = io();

// join room
socket.on("connect", () => {
    socket.emit("join", currentUser);
});

// auto scroll function
function scrollToBottom() {
    const chatBox = document.getElementById("chat-box");
    chatBox.scrollTop = chatBox.scrollHeight;
}

// send message
function sendMessage() {
    const input = document.getElementById("messageInput");
    let message = input.value;

    // ❌ prevent empty
    if (!message || message.trim() === "") return;

    socket.emit("send_message", {
        senderId: currentUser,
        receiverId: otherUser,
        message: message
    });

    input.value = "";
}

// receive message
socket.on("receive_message", (data) => {

    // ❗ Only show messages of current chat
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

// scroll on load
window.onload = scrollToBottom;