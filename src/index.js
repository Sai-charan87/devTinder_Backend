const express = require("express");
const connectDb = require("./config/databases"); 
const app = express();
const User=require("./models/user");
app.use(express.json());
app.post("/signup",async (req,res)=>{
  
  const user=new User(req.body);
   try{
    await user.save();
    res.send("User created successfully");
   }
   catch(err){
    res.status(400).send(err);
   }
  
});
app.get("/users",async (req,res)=>{
  try{
    const users= await User.findOne({email:req.body.email});
      res.send(users);
    
  }
  catch(err){
    res.status(400).send(err);
  }
});
app.get("/feed",async (req,res)=>{
  try{
    const users= await User.find();
      res.send(users);
    
  }
  catch(err){
    res.status(400).send(err);
  }
});

connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });
