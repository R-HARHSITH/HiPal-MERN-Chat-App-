import express from "express";
import authRoutes from "./routes/authroutes.js";
import messageRoutes from "./routes/messageroutes.js";
import userroutes from "./routes/userroutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { app, server } from "./config/socket.js";

import path from "path";

// const app=express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hipal-mern-chat-app.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

dotenv.config();

const __dirname = path.resolve();
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userroutes);

const PORT = process.env.PORT;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
