import mongoose from "mongoose";
import { list } from "../listing/listing.models";
import { NextResponse } from "next/server";
require("dotenv").config();

export async function POST(req) {
    const { id } = await req.json();

    if (process.env.DB_URL) {
        await mongoose.connect(process.env.DB_URL);

        try {
            const results = await list.find({
                clients: { $elemMatch: { client: id } }
            });

            if (results.length > 0) {
                const clientDetails = [];

                results.forEach(result => {
                    result.clients.forEach(values => {
                        if (values.client.equals(new mongoose.Types.ObjectId(id))) {
                            clientDetails.push(values);
                        }
                    });
                });
                return NextResponse.json({ success: true, clientDetails });
            } else {
                return NextResponse.json({ success: false, message: 'No matching results found.' });
            }
        } catch (err) {
            console.error('Error:', err);
            return NextResponse.json({ success: false, message: 'An error occurred.' });
        }
    } else {
        console.log("Failed to connect to the database.");
        return NextResponse.json({ success: false, message: 'Database connection failed.' });
    }
}
