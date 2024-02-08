import { connectMongoDb } from "@/lib/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Import bcrypt

export async function POST(req) {
    try {
        await connectMongoDb(); // Connect to the database
        
        const { email, password } = await req.json();
        if (!email || !password) { // Check if email and password are provided
            return NextResponse.json({ success: false, message: 'Please provide email and password' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) { // Check if user exists
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the new password

        await User.updateOne({ email }, { $set: { password: hashedPassword } }); // Update user's password

        return NextResponse.json({ success: true, message: 'Password changed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
