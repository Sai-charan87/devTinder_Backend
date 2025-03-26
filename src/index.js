const express = require("express");
const connectDb = require("./config/databases"); 
const app = express();
const User=require("./models/user");
app.post("/signup",async (req,res)=>{
  
  const user=new User({
    firstName:"Sai",
    lastName:"Charan",
    email:"dsaicharan001@gmail.com",
    password:"Sai#123"
   });
   await user.save();
})
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
