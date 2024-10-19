import mongoose from "mongoose"
const driverschema=new mongoose.Schema({
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
        enum:["driver"]
    },
    vehiclenumber:{
        type:String,
        required:true,
    }
    
},{timestamps:true})
export const driver = mongoose.models.drivers||mongoose.model("drivers",driverschema)