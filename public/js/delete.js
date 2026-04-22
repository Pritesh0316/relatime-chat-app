function deleteChat(userId) {
    const confirmDelete = confirm("Are you sure you want to delete this chat? This action cannot be undone.");

    if (!confirmDelete) return;

    fetch(`/chat/delete/${userId}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Chat deleted successfully");
            window.location.reload(); // or redirect
        }
    })
    .catch(err => console.log(err));
}