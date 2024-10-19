import mongoose from "mongoose";
import { list } from "../listing/listing.models";
import { NextResponse } from "next/server";
require("dotenv").config();
export async function POST(req){
	const {id} = await req.json();
    if (process.env) {
        await mongoose.connect(process.env.DB_URL)
        await list.findOne({ 
            clients: { $elemMatch: { client: id } } 
        })
        .then(result => {
            if (result) {
                
                result.clients.forEach(values => {
                    if (values.client.equals(new mongoose.Types.ObjectId(id))) {
                        console.log('Client details:', values); 
                    }
                });
            }
        })
        .catch(err => {
            console.error('Error:', err);
        });
	    return NextResponse.json({success:true});
    }
    else{
        console.log("faild to connect");    
    }	
}