const socket = io();

// join room
socket.emit("join", currentUser);

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
        (data.senderId === currentUser && data.receiverId === otherUser) ||
        (data.senderId === otherUser && data.receiverId === currentUser)
    ) {
        const chatBox = document.getElementById("chat-box");

        const msgDiv = document.createElement("div");

        msgDiv.classList.add("msg");
        msgDiv.classList.add(
            data.senderId === currentUser ? "me" : "other"
        );

        msgDiv.innerText = data.message;

        chatBox.appendChild(msgDiv);

        scrollToBottom();
    }
});

// scroll on load
window.onload = scrollToBottom;