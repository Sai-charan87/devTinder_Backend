const jwt=require("jsonwebtoken");
const User=require("../models/user");
const cookieParser=require("cookie-parser");
async function Authmiddleware(req,res,next){
    const token=req.cookies.token;
    const valid=jwt.verify(token,"SECRET_KEY");
    if(!valid){
        return res.status(401).send("Unauthorized");
    }
    const user=await User.findById(valid._id);
    if(!user){
        return res.status(404).send("User not found");
    }
    console.log("auth");
    req.user=user;
    next();

}
module.exports=Authmiddleware;