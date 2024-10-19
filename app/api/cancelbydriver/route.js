import mongoose from "mongoose";
import { list } from "../listing/listing.models";
import { user } from "../user/user.models";
import { NextResponse } from "next/server";
const nodemailer = require('nodemailer');
require("dotenv").config();

export async function POST(req) {
    const { id, userid } = await req.json();
    const transporter = nodemailer.createTransport({
        secure: true,
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user:process.env.USER,
            pass:process.env.PASS
        }
    });

    if (process.env.DB_URL) {
        await mongoose.connect(process.env.DB_URL);

        const storing = await list.findOne({ 
            createdby: userid, 
            'clients.client': new mongoose.Types.ObjectId(id)
        });

        if (!storing) {
            console.log('No document found for storing.');
            return NextResponse.json({ success: false, message: 'Document not found' });
        }
        const clientInList = storing.clients.find(client => 
            client.client.equals(new mongoose.Types.ObjectId(id))
        );

        if (!clientInList) {
            console.log('Client not found in the document.');
            return NextResponse.json({ success: false, message: 'Client not found' });
        }
        const clientSeats = clientInList.seats || 0; 
        let updatedSeats = storing.seats || 0; 

        if (clientInList.approved) {
            updatedSeats += clientSeats; 
            await list.findOneAndUpdate(
                { createdby: userid }, 
                {
                    $set: {
                        seats: updatedSeats, 
                        avaliblity: updatedSeats 
                    }
                },
                { new: true } 
            );
        }
        await list.findOneAndUpdate(
            { 
                createdby: userid, 
                'clients.client': new mongoose.Types.ObjectId(id)
            },
            { 
                $pull: { 
                    clients: { client: new mongoose.Types.ObjectId(id) } 
                } 
            },
            { new: true }
        );

        console.log('Updated seats and availability:', updatedSeats);
        
        const client = await user.findOne({ _id: id });
        if (client) {
            await transporter.sendMail({
                to: client.email,
                subject: "Cancellation Notice",
                html: "Sorry, your travel has been cancelled."
            });
        } else {
            console.log('Client not found for email notification.');
        }

        return NextResponse.json({ success: true });
    } else {
        console.log("Failed to connect: DB_URL is not set.");
        return NextResponse.json({ success: false, message: 'Database connection URL is missing' });
    }
}
