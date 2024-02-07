"use server";
import User from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
var jwt = require("jsonwebtoken");
import { connectMongoDb } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    // Find the user by email
    await connectMongoDb();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { sucess: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    // console.log('User password from database:', user.password);
    // console.log('User provided password:', password);
    // console.log('Password match:', passwordMatch);

    if (passwordMatch) {
      var token = jwt.sign(
        { email: user.email, name: user.name },
        process.env.JWT_SECRET,
        {
          expiresIn: 30,
        }
      );
      return NextResponse.json({ sucess: true, token }, { status: 200 });
    } else {
      return NextResponse.json(
        { sucess: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { sucess: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
