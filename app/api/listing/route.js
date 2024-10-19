import mongoose from "mongoose";
import { list } from "./listing.models";
import { NextResponse } from "next/server";
require("dotenv").config();
export async function POST(req){
	const {createdby,form,to,state,seats,avaliblity,cost,vehicle,vechiclenumber} = await req.json();
    if (process.env) {
        console.log("done");
        await mongoose.connect(process.env.DB_URL)
        const tosave=await new list({createdby,form,to,state,seats,avaliblity,cost,vehicle,vechiclenumber});
	    const result=await tosave.save();
	    return NextResponse.json({result,success:true});
    }
    else{
        console.log("faild to connect");
        
    }
	
	
}