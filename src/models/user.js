const mongoose = require('mongoose');
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
    gender:{
        type:String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },
},{
    timestamps:true,
});
module.exports = mongoose.model('User', userSchema);
