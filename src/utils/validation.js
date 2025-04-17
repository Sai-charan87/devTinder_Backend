const validator= require('validator');
const validateSignupData = (req)=>{
    const {email,password,firstname,lastname}=req.body;
    if(!firstname || !lastname){
        return {status:false,message:"First name and last name are required"};
    }if(!validator.isEmail(email)){
        return {status:false,message:"Email is not valid"};
    }
     return { status: true, message: "Valid input" };

}
const validateEditProfileData = (req)=>{
    const {email,firstname,lastname,age,info}=req.body;
    if(!firstname || !lastname){
        return {status:false,message:"First name and last name are required"};
    }   
    if(!validator.isEmail(email)){
        return {status:false,message:"Email is not valid"};
    }
    if(age && !validator.isNumeric(age)){
        return {status:false,message:"Age is not valid"};
    }
    if(info && !validator.isLength(info,{min:0,max:100})){
        return {status:false,message:"Info is not valid"};
    }
    return { status: true, message: "Valid input" };
};
module.exports={validateSignupData,validateEditProfileData};