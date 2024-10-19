import mongoose from "mongoose";
import { driver } from "./driver.models";
import { NextResponse } from "next/server";
require("dotenv").config();
var CryptoJS = require("crypto-js");

export async function POST(req){
	const {username,email,password,usertype,phonenumber,vehiclenumber} = await req.json();
    if (process.env) {
        console.log("done");
        await mongoose.connect(process.env.DB_URL)
        const tosave=await new driver({username,email,phonenumber,password:CryptoJS.AES.encrypt(password, '@deekshigowda').toString(),usertype,vehiclenumber});
	    const result=await tosave.save();
	    return NextResponse.json({result,success:true});
    }
    else{
        console.log("faild to connect");
        
    }
	
	
}