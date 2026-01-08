# Chat App V2

A full-stack real-time chat application (monorepo) with a Node/Express backend and a Vite + React frontend. Includes authentication, user profiles, direct messaging, and Socket.IO real-time messaging.

**Quick Links**
- **Backend server:** [backend/server.js](backend/server.js)
- **Frontend entry:** [frontend/src/main.jsx](frontend/src/main.jsx)

**Features**
- **Authentication:** JWT-based auth and protected routes.
- **Real-time messaging:** Socket.IO for live chat delivery.
- **User profiles:** Upload avatars (Cloudinary integration).
- **Friend requests & messaging:** Create friend requests, persistent message history.

**Tech Stack**
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO
- **Frontend:** React, Vite, Tailwind CSS
- **Third-party:** Cloudinary (images), an email provider for notifications

**Prerequisites**
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (Atlas or local)
- Cloudinary account (if using image upload)

**Environment variables**
Create a `.env` in `backend/` (check `backend/config` for usage). Common variables:
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing tokens
- `PORT` — server port (e.g. `5000`)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — for image uploads
- `EMAIL_USER`, `EMAIL_PASS` — for outgoing emails (optional)

Frontend may also use Vite environment variables (prefix `VITE_`) if needed.

**Setup & Run**
1. Install dependencies for backend and frontend:

```bash
cd backend
npm install

cd ../frontend
npm install
```

2. Start backend and frontend (development):

```bash
# In one terminal (backend)
cd backend
npm run dev   # or `npm start` depending on scripts

# In another terminal (frontend)
cd frontend
npm run dev
```

3. Open the frontend dev URL shown by Vite (usually `http://localhost:5173`).

**Project Structure (high-level)**
- `backend/` — server code, routes, controllers, models, config
- `frontend/` — React app powered by Vite, components, pages, store

**Notable files**
- `backend/controllers` — auth, user, message controllers
- `backend/models` — Mongoose models
- `frontend/src/components` — UI components like `ChatContainer`, `Sidebar`, `MessageInput`

**Testing & Linting**
- Check `package.json` in each package for available scripts (`test`, `lint`, etc.).

**Contributing**
- Fork and open a PR with a clear description. Run the app locally and include screenshots or steps to reproduce for UI changes.

**License**
- Add your preferred license here (e.g., MIT). This repo currently has no license file.

**Contact**
- For questions about this project, contact the maintainer or check repository issues.
