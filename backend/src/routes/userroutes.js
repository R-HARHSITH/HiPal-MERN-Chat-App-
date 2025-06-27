import express, { Router } from "express";
import { protectRoute } from "../middlewares/authmiddleware.js";
import { getMyFriends, getAll } from "../controllers/usercontroller.js";
import {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
} from "../controllers/usercontroller.js";

const router = express.Router();

router.use(protectRoute);
router.get("/", getAll);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-requests", getFriendRequests);

export default router;
