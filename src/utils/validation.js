const validator= require('validator');
const validate = (req)=>{
    const {email,password,firstname,lastname}=req.body;
    if(!firstname || !lastname){
        return {status:false,message:"First name and last name are required"};
    }if(!validator.isEmail(email)){
        return {status:false,message:"Email is not valid"};
    }
     return { status: true, message: "Valid input" };

}
module.exports={validate};