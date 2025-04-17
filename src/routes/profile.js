const express = require("express");
const profileRouter=express.Router();
const bcrypt = require("bcrypt");
const Authmiddleware=require("../middlewares/Auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/view",Authmiddleware, async (req, res) => {
 
 
  try{
const user=req.user;
if(!user){
  return res.status(401).send("Unauthorized");
}
res.send(user);
  }catch(err){
    res.status(400).send(err.message);
  }
});
profileRouter.patch("/edit",Authmiddleware, async (req, res) => {
  const validation=validateEditProfileData(req);
  if(!validation.status){
    console.log(validation.message);
    return res.status(400).send(validation.message);
  }
  try{
    const ACCEPTED_UPDATES=[
      "firstName",
      "lastName",
      "email",
      "info",
      "age",
    ];
    user=req.user;
    const updates=Object.keys(req.body);
    const isValid=updates.every((update)=>ACCEPTED_UPDATES.includes(update));
    if(!isValid){
      return res.status(400).send("Invalid updates");
    }
    updates.forEach((update)=>user[update]=req.body[update]);
    await user.save();
    console.log(user);
    res.json({
      msg:"Profile updated successfully",
      user:user
    });

  }catch(err){
    res.status(400).send(err.message);
  }
});
profileRouter.patch("/editPassword",Authmiddleware, async (req, res) => {
  try{
    const {oldPassword,newPassword}=req.body;
    user=req.user;
    const isValid=await user.validatePassword(oldPassword);
    if(!isValid){
      return res.status(400).send("Invalid password");
    }
    const passwordHash=await bcrypt.hash(newPassword,10);
    user.password=passwordHash;
    await user.save();
    res.send("Password updated successfully");

  }catch(err){
    res.status(400).send(err.message);
  }
});



module.exports={profileRouter};