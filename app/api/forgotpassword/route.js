import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { user } from "../user/user.models";
import { driver } from "../driver/driver.models";
const CryptoJS = require("crypto-js");
const nodemailer= require('nodemailer');

export async function POST(req){
    const transporter = nodemailer.createTransport(
        {
            secure:true,
            host:"smtp.gmail.com",
            port:465,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        }
    )
	const payload = await req.json();
	await mongoose.connect(process.env.DB_URL)
	const useraccount=await user.findOne({"email":payload.email})
    const driveraccount=await driver.findOne({"email":payload.email})
    if(useraccount ){
	   var bytes  = CryptoJS.AES.decrypt(useraccount.password, '@teamwe_08');
	   var originalText = bytes.toString(CryptoJS.enc.Utf8);
		if(payload.email== useraccount.email){
			transporter.sendMail(
                {to:useraccount.email,
                subject:"Sending password",
                html:originalText}
            )
			return NextResponse.json({success:true,email:useraccount.email});

		}
		else{
			return NextResponse.json({success:false,error:"Invaild password"});
		}

	}
    else if(driveraccount){
        var bytes  = CryptoJS.AES.decrypt(driveraccount.password, '@teamwe_08');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        
        console.log();
         if(payload.email== driveraccount.email){
            transporter.sendMail(
                {to:driveraccount.email,
                subject:"Sending password",
                html:originalText}
            )
             return NextResponse.json({success:true,email:driveraccount.email});
 
         }
         else{
             return NextResponse.json({success:false,error:"Invaild password"});
         }
 
     }
     else{
         return NextResponse.json({success:false,error:"User not found"});
     }
}
