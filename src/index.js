const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connectDb = require("./config/databases");
const app = express();
app.use(cookieParser());
const User = require("./models/user");
const { validate } = require("./utils/validation");
const Authmiddleware = require("./middlewares/Auth");
app.use(express.json());
app.post("/signup", async (req, res) => {
const { email, password, firstname, lastname } = req.body;
  const validation = validate(req);

  
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
app.post("/login", async (req, res) => {
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
app.get("/profile",Authmiddleware, async (req, res) => {
 
 
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
app.post("/sentconnectionrequest",Authmiddleware, async (req, res) => {  
  
  try{
  
     res.send("Connection request sent successfully");
  }
catch(err){
    res.status(400).send(err.message);
  }
});
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.findOne({ email: req.body.email });
//     res.send(users);

//   }
//   catch (err) {
//     res.status(400).send(err);
//   }
// });
// app.delete("/user", async (req, res) => {
//   try {
//     const id = req.body.id;
//     const user = await User.findByIdAndDelete(id);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     res.send("User deleted successfully");

//   } catch (err) {
//     res.send(err);
//   }
// });
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);

//   }
//   catch (err) {
//     res.status(400).send(err);
//   }
// });
// app.patch("/user", async (req, res) => {
//   const user = req.body;
//   const id = req.body.id;
//   try {
//     const ACCEPTED_UPDATES = [
//       "id", "age", "gender", "skills"
//     ];
//     const updates = Object.keys(user).every((update) => {
//       return ACCEPTED_UPDATES.includes(update);
//     });
//     if (!updates) {
// throw new Error("Invalid updates");
//     }
//     const updatedUser = await User.findByIdAndUpdate(id, user, {
//       new: true,
//       runValidators: true,
//     });
//     if (!updatedUser) {
//       return res.status(404).send("User not found");
//     }
//     res.send("User updated successfully");
//   } catch (err) {
//     res.send(err);
//   }
// });

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
