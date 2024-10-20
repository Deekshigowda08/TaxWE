import mongoose from "mongoose";
import { list } from "../listing/listing.models";
import { NextResponse } from "next/server";
require("dotenv").config();
export async function POST(req){
	const {id} = await req.json();
    if (process.env) {
        await mongoose.connect(process.env.DB_URL)
        
        const trips = await list.find({ createdby:id})
	    return NextResponse.json({success:true,trips});
    }
    else{
        console.log("faild to connect");    
    }	
}
export async function DELETE(req){
	const {id} = await req.json();
    if (process.env) {
        await mongoose.connect(process.env.DB_URL)  
        const trips = await list.findOneAndDelete({ createdby:id})
	    return NextResponse.json({success:true,trips});
    }
    else{
        console.log("faild to connect");    
    }	
}