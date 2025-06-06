const express = require("express");
const connectDb = require("./config/databases");
const app = express();
const cookieParser = require("cookie-parser");

const Authmiddleware=require("./middlewares/Auth");
const {authRouter} = require("./routes/auth");
const {profileRouter} = require("./routes/profile");
const {requestRouter} = require("./routes/request");
app.use(cookieParser());
app.use(express.json());
app.use("/",authRouter);
app.use("/profile",profileRouter);
<<<<<<< HEAD
app.use("/request",requestRouter);
=======
app.use("/",requestRouter);
>>>>>>> 5933b694ab4dd0238bf0ba547f341241068a13da

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
