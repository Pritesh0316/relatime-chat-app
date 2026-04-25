# 💬 Realtime Chat Application

A full-stack realtime chat application that enables users to communicate instantly with a secure authentication system and a clean, responsive interface.

---

## 🚀 Features

- 🔐 User Authentication (Signup & Login)
- 💬 Real-time messaging
- 🗑️ Delete chat for both users with confirmation
- 🔄 Auto-refresh after important actions
- 📱 Responsive UI (mobile-friendly)
- ⚠️ Form validation and alert handling

---

## 🛠️ Tech Stack

| Layer       | Technology Used |
|------------|----------------|
| Frontend   | HTML, CSS, Bootstrap, EJS |
| Backend    | Node.js, Express.js |
| Database   | MongoDB (Mongoose) |
| Deployment | Render |

---

## 📂 Project Structure

```
realtime-chat-app/
│
├── config/
│   # Configuration files (DB, environment setup)
│
├── controllers/
│   # Handles request logic (chat, auth, etc.)
│
├── middleware/
│   # Custom middleware (auth, validation, etc.)
│
├── models/
│   # Mongoose schemas (User, Chat, etc.)
│
├── public/
│   # Static assets (CSS, JS)
│
├── routes/
│   # Express route definitions
│
├── sockets/
│   # Socket.io logic (real-time features)
│
├── utils/
│   # Utility/helper functions
│
├── validation/
│   # Input validation schemas
│
├── views/
│   # EJS templates (UI pages)
│
├── .gitignore
│   # Ignored files for Git
│
├── app.js
│   # Main app configuration
│
├── server.js
│   # Server entry point
│
├── package.json
│   # Project metadata & dependencies
│
├── package-lock.json
│   # Dependency lock file
│
└── README.md
    # Project documentation
```

---

## ⚙️ Application Overview

This application allows users to:
- Create an account and securely log in
- Start and manage conversations in real time
- Delete chats for both participants with confirmation
- Experience smooth interaction with auto-refresh behavior after key actions

---

## 🌐 Deployment

The application is deployed on **Render** with continuous deployment enabled.

---

## 🔮 Future Enhancements

- Typing indicator
- Online Status

---

## 📌 Note

This project is built for learning and demonstration purposes, focusing on full-stack development and real-time interaction features.

---

⭐ If you find this project useful, consider giving it a star!
