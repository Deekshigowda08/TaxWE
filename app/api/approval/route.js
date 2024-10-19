import mongoose from "mongoose";
import { list } from "../listing/listing.models";
import { NextResponse } from "next/server";
require("dotenv").config();
export async function POST(req){
	const {id,userid} = await req.json();
    if (process.env) {
        await mongoose.connect(process.env.DB_URL)
        await list.findOneAndUpdate(
            { 
                createdby:userid, 
                'clients.client': new mongoose.Types.ObjectId(id)
            },
            { 
                $set: { 
                    'clients.$.approved': true
                } 
            },
            { new: true }
        )
        .then(updatedDocument => {
            if (updatedDocument) {
                const approvedSeats = updatedDocument.clients.reduce((total, client) => {
                    return client.approved ? total + client.seats : total;
                }, 0);
                return list.findOneAndUpdate(
                    { createdby: userid }, 
                    {
                        $set: {
                            seats: updatedDocument.avaliblity - approvedSeats, 
                            avaliblity: updatedDocument.avaliblity - approvedSeats 
                        }
                    },
                    { new: true } 
                );
            } else {
                console.log('No document found or no update made.');
            }
        })
        .then(finalDocument => {
            if (finalDocument) {
                console.log('Final updated document:', finalDocument);
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