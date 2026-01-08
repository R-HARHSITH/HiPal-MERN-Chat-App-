
# 🚀 HiPal! — Real-time Messaging Platform

A full-stack chat application with realtime messaging, authentication, user profiles, and media uploads. This repository is organized as a monorepo with a Node/Express backend and a Vite + React frontend.

---

## 📚 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quickstart](#-quickstart)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Key Files & Endpoints](#-key-files--endpoints)
- [Development Tips](#-development-tips)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Overview
Chat App V2 supports user authentication, avatar uploads, friend requests, and Socket.IO-powered realtime 1:1 messaging. The app persists chat history with MongoDB and stores user media in Cloudinary.

## ✅ Features
- 🔐 JWT-based authentication
- 💬 Realtime messaging with Socket.IO
- 👤 User profiles with avatar uploads (Cloudinary)
- 🤝 Online presence detection and contact list
- 🗄️ Persistent message storage (MongoDB)

## 🛠️ Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose, Socket.IO
- Frontend: React, Vite, Tailwind CSS
- Storage & services: Cloudinary (images)

## ⚡ Quickstart
1) Install dependencies

```bash
# from repo root
cd backend
npm install

cd ../frontend
npm install
```

2) Run development servers (two terminals)

```bash
# Terminal 1 — backend
cd backend
npm run dev

# Terminal 2 — frontend
cd frontend
npm run dev
```

3) Open the frontend URL shown by Vite (commonly `http://localhost:5173`).

---

## 🔐 Environment variables
Create a `.env` file in the `backend/` folder. Example variables the server expects (check `backend/src/config` for exact usage):

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used for signing JWTs
- `PORT` — backend port (e.g., `5000`)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary credentials


Frontend: use Vite env vars prefixed with `VITE_` if needed (e.g., `VITE_API_URL`).

Tip: Add a `backend/.env.example` file with placeholder keys to make setup easier.

---

## 📁 Project Structure (high-level)
- `backend/`
	- `src/` — server source
		- `server.js` — server entry (Socket.IO setup, middlewares, route mounting)
		- `config/` — DB, cloudinary, email, socket utilities
		- `controllers/` — route handlers (auth, users, messages)
		- `models/` — Mongoose schemas
		- `routes/` — Express routes
- `frontend/`
	- `src/` — React source
		- `main.jsx` — app entry
		- `components/` — UI pieces (Sidebar, ChatContainer, MessageInput)
		- `pages/` — Login, Signup, Home, Profile

---

## 📌 Key Files & Endpoints
- Backend server entry: [backend/src/server.js](backend/src/server.js)
- Frontend entry: [frontend/src/main.jsx](frontend/src/main.jsx)
- Auth routes: `backend/src/routes/authroutes.js`
- Message routes: `backend/src/routes/messageroutes.js`

Common API routes (examples — check the actual files for exact paths & request shapes):
- `POST /api/auth/signup` — create user
- `POST /api/auth/login` — authenticate and return JWT
- `GET /api/users/me` — get current user (auth required)
- `POST /api/messages` — send/save message

---

## 🧪 Development Tips
- Use a local MongoDB or Atlas connection for persistence.
- Confirm Cloudinary credentials before testing avatar uploads.
- If Socket.IO events seem missing, verify both frontend and backend are connecting to the same host/port and the client emits expected events.

## 🤝 Contributing
- Fork the repo and open a PR with a clear description of changes.
- Run the app locally and include steps/screenshots for UI changes.

---


