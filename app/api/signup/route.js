'use server'
import User from "@/models/users";
import { connectMongoDb } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req){
    try {
        const {name, email, password} = await req.json();
        const hashPassword = await bcrypt.hash(password, 10)

        await connectMongoDb();
        await User.create({name ,email, password: hashPassword});

        return NextResponse.json({message: 'user signin'}, {status:201});
    } catch (error) {
        return NextResponse.json({  message : error } , {status: 500})
    }
}