import mongoose from "mongoose"
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true,
        enum:["user"]
    },
    
},{timestamps:true})
export const user = mongoose.models.users||mongoose.model("users",userschema)