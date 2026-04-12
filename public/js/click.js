const input = document.getElementById("messageInput");

input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});
