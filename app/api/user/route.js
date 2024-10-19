import mongoose from "mongoose";
import { user } from "./user.models";
import { NextResponse } from "next/server";
require("dotenv").config();
var CryptoJS = require("crypto-js");


export async function POST(req){
	const {username,email,password,usertype,phonenumber} = await req.json();
    if (process.env) {
        console.log("done");
        await mongoose.connect(process.env.DB_URL)
        const toconnect=await new user({username,email,phonenumber,password:CryptoJS.AES.encrypt(password, '@teamwe_08').toString(),usertype});
	    const result=await toconnect.save();
        return NextResponse.json({result,success:true});
    }
    else{
        console.log("faild to connect");
        return NextResponse.json({success:false});
        
    }
	
	
}
export async function GET(){
    return NextResponse.json({"hey":"deekshith"})
}
