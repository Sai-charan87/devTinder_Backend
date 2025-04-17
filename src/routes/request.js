const express = require("express");
const requestRouter = express.Router();
const Authmiddleware = require("../middlewares/Auth");

requestRouter.post("/sentconnectionrequest",Authmiddleware, async (req, res) => {  
  
  try{
  
     res.send("Connection request sent successfully");
  }
catch(err){
    res.status(400).send(err.message);
  }
});
module.exports={requestRouter};