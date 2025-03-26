const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:1729@cluster0.yucqr.mongodb.net/");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit on connection error
  }
};


module.exports = connectDb;