const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const userSchema = new mongoose.Schema(
    {
   firstName:{
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,

   },
    lastName:{
     type: String,
    },
    email:{
     type: String,
     required: true,
     unique: true,
        lowercase: true,
        trim: true,

    },
    password:{
     type: String,
     required: true,
    },
    age:{
        type:Number,
    },
    info:{
        type:String,
        default:"I am ful stack developer.",
        trim:true,
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
    skills:{
        type:[String],
      
    },
},{
    timestamps:true,
});
userSchema.methods.getJWT=async function(){
    const user=this;
    return jwt.sign({_id:user._id},"SECRET_KEY",{expiresIn:"7d"});

}
userSchema.methods.validatePassword=async function(password){

    const user=this;
    return bcrypt.compare(password, this.password);
      
}
module.exports = mongoose.model('User', userSchema);
