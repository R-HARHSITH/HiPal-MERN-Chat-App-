import User from "../models/usermodel.js";
import Message from "../models/messagemodel.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";
import { getReceiverSocketId, io } from "../config/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatID } = req.params;
    const myId = req.user._id;
    //  console.log("myId type:", typeof myId);
    //  console.log("userToChatID type:", typeof userToChatID);
    if (!mongoose.Types.ObjectId.isValid(userToChatID)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    // const targetUserId =typeof userToChatID === "string" ? new mongoose.Types.ObjectId(userToChatID) : userToChatID;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatID },
        { receiverId: myId, senderId: userToChatID },
      ],
    });
    console.log(messages);
    //        console.log("myId:", myId);
    // console.log("targetUserId:", targetUserId);

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // uploading base64 encoding of image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    // realtime functionality here
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
