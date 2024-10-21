import mongoose from "mongoose";
import { list } from "../listing/listing.models";
import { NextResponse } from "next/server";
import { driver } from "../driver/driver.models";
const nodemailer = require('nodemailer');
require("dotenv").config();

export async function POST(req) {
    const { id } = await req.json(); // Make sure `userid` is included in the request body
    const transporter = nodemailer.createTransport({
        secure: true,
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    if (process.env.DB_URL) {
        await mongoose.connect(process.env.DB_URL);

        // Find the list document containing the specified client ID
        const storing = await list.findOne({
            'clients._id': new mongoose.Types.ObjectId(id)
        });

        if (!storing) {
            console.log('No document found for storing.');
            return NextResponse.json({ success: false, message: 'Document not found' });
        }

        // Find the specific client in the list
        const clientInList = storing.clients.find(client =>
            client._id.equals(new mongoose.Types.ObjectId(id))
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
                { _id:storing._id},
                {
                    $set: {
                        seats: updatedSeats,
                        availability: updatedSeats
                    }
                },
                { new: true }
            );
        }
        await list.findOneAndUpdate(
            { 
                _id:storing._id,
                'clients._id': new mongoose.Types.ObjectId(id)
            },
            {
                $pull: {
                    clients: { _id: new mongoose.Types.ObjectId(id) }
                }
            },
            { new: true }
        );

        console.log('Updated seats and availability:', updatedSeats);
        const drivers = await driver.findOne({_id:storing.createdby });
        if (drivers) {
            await transporter.sendMail({
                to: drivers.email,
                subject: "Cancellation Notice",
                html: `One traveler has been cancelled. Seats: ${clientSeats}.`
            });
        } else {
            console.log('Driver not found for email notification.');
        }

        return NextResponse.json({ success: true });
    } else {
        console.log("Failed to connect: DB_URL is not set.");
        return NextResponse.json({ success: false, message: 'Database connection URL is missing' });
    }
}
