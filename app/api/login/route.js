import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { user } from "../user/user.models";
import { driver } from "../driver/driver.models";
const CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');



export async function POST(req){
	const payload = await req.json();
	await mongoose.connect(process.env.DB_URL)
	const useraccount=await user.findOne({"email":payload.email})
    const driveraccount=await driver.findOne({"email":payload.email})
    if(useraccount && payload.usertype=="user"){
	   var bytes  = CryptoJS.AES.decrypt(useraccount.password, '@teamwe_08');
	   var originalText = bytes.toString(CryptoJS.enc.Utf8);
	   
		if(payload.email== useraccount.email && payload.password==originalText){
			var token = jwt.sign({objectid:useraccount._id,email:useraccount.email,username:useraccount.username,password:useraccount.password,usertype:useraccount.usertype}, '@teamwe_08');
			return NextResponse.json({success:true,email:useraccount.email,username:useraccount.username,token:token});

		}
		else{
			return NextResponse.json({success:false,error:"Invaild password"});
		}

	}
    else if(driveraccount && payload.usertype=="driver"){
        var bytes  = CryptoJS.AES.decrypt(driveraccount.password, '@teamwe_08');
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log();
         if(payload.email== driveraccount.email && payload.password==originalText){
            var token = jwt.sign({objectid:driveraccount._id,email:driveraccount.email,username:driveraccount.username,password:driveraccount.password,usertype:driveraccount.usertype}, '@teamwe_08');
             return NextResponse.json({success:true,email:driveraccount.email,username:driveraccount.username,token:token});
 
         }
         else{
             return NextResponse.json({success:false,error:"Invaild password"});
         }
 
     }
     else{
         return NextResponse.json({success:false,error:"User not found"});
     }
}
