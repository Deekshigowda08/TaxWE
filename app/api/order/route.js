import mongoose from "mongoose";
import { list } from "../listing/listing.models";
import { NextResponse } from "next/server";
require("dotenv").config();
export async function POST(req){
	const {id,userid,date,seats,pickuplocation} = await req.json();
    if (process.env) {
        console.log("done");
        await mongoose.connect(process.env.DB_URL)
        const result = await list.findByIdAndUpdate(
            id,
            { $push: { clients: { client: userid,date, seats, pickuplocation } } },
            { new: true }
          );
          
	    return NextResponse.json({result,success:true});
    }
    else{
        console.log("faild to connect");    
    }	
}