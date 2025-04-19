const express = require("express");
const requestRouter = express.Router();
const Authmiddleware = require("../middlewares/Auth");
<<<<<<< HEAD
const ConnectionRequest = require("../models/connectionRequest");
requestRouter.post("/send/:status/:toUserId",Authmiddleware, async (req, res) => {  
  
  try{
  const { status, toUserId } = req.params;
  const fromUserId = req.user._id;
const validStatuses = ['interested', 'ignored', 'accepted', 'rejected'];
if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  // Check if the connection request already exists
  const existingRequest = await ConnectionRequest.findOne({
    fromUserId,
    toUserId,
  });
  if (existingRequest) {
    return res.status(400).json({ message: "Connection request already exists" });
  }
  // Check if the user is trying to send a request to themselves
  if (fromUserId.toString() === toUserId) {
    return res.status(400).json({ message: "You cannot send a request to yourself" });
  }
  // Check if the user is already connected to the recipient
  const existingConnection = await ConnectionRequest.findOne({
    $or: [
      { fromUserId, toUserId, status: "accepted" },
      { fromUserId: toUserId, toUserId: fromUserId, status: "accepted" },
    ],
  });
  if (existingConnection) {
    return res.status(400).json({ message: "You are already connected" });
  }
  // Check if the user has already sent a request to the recipient
  const sentRequest = await ConnectionRequest.findOne({
    fromUserId,
    toUserId,
    status: { $in: ["interested", "ignored"] },
  });
  if (sentRequest) {
    return res.status(400).json({ message: "You have already sent a request" });
  }
  // Check if the recipient has already sent a request to the user
  const receivedRequest = await ConnectionRequest.findOne({
    fromUserId: toUserId,
    toUserId: fromUserId,
    status: { $in: ["interested", "ignored"] },
  });
  if (receivedRequest) {
    return res.status(400).json({ message: "You have already received a request" });
  }
  // Create a new connection request
  // Check if the recipient is already connected to the user
  const existingConnectionRequest = await ConnectionRequest.findOne({
    fromUserId: toUserId,
    toUserId: fromUserId,
    status: "accepted",
  });
  if (existingConnectionRequest) {
    return res.status(400).json({ message: "You are already connected" });
  }
  // Create a new connection request
  const connectionRequest = await ConnectionRequest.create({  
    fromUserId,
    toUserId,
    status  });

  res.status(201).json({
    message: "Connection request sent successfully",
    connectionRequest,  });


    
=======

requestRouter.post("/sentconnectionrequest",Authmiddleware, async (req, res) => {  
  
  try{
  
     res.send("Connection request sent successfully");
>>>>>>> 5933b694ab4dd0238bf0ba547f341241068a13da
  }
catch(err){
    res.status(400).send(err.message);
  }
});
module.exports={requestRouter};