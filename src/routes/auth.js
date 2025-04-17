
const express=require("express");
const authRouter=express.Router();
const bcrypt = require("bcrypt");


const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");



authRouter.post("/signup", async (req, res) => {
const { email, password, firstname, lastname } = req.body;
  const validation = validateSignupData(req);

  
  try {
    if (!validation.status) {
      console.log(validation.message);
      return res.status(400).send(validation.message);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: passwordHash,
    });
    console.log(user);
    
    await user.save();
    res.send("User created successfully");
  }
  catch (err) {
    res.status(400).send(err.message);
  }

});
authRouter.post("/login", async (req, res) => {
  try{
    const { email, password } = req.body;
    const user=await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    const isValidPassword = await user.validatePassword(password);
   
    if (!isValidPassword) {
      return res.status(400).send("Invalid email or password");
    }
    if (isValidPassword) {
     const token=await user.getJWT();
      
    res.cookie("token",token, { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.send("Login successful");
    }
   }catch(err){
    res.status(400).send(err.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.send("Logout successful");
}
);

module.exports={
    authRouter,
}