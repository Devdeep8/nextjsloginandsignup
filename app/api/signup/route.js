"use server";
import User from "@/models/users";
import { connectMongoDb } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/jsonwebtoken"; 
import Cookies from 'cookies';



export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Ensure that password is not empty
    if (!password) {
      return NextResponse.json(
        { message: "Password cannot be empty" },
        { status: 400 }
      );
    }

    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await connectMongoDb();
    await User.create({ name, email, password: hashedPassword });


    return NextResponse.json(
      { sucess: true, message: "User signed up successfully" , token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { sucess: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
