"use server";
import User from "@/models/users";
import { NextResponse } from "next/server";
// import { connectMongoDb } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    console.log(user);

    if (email == user.email && password == user.password) {
      return NextResponse.json(
        { sucess: true, message: "user login" },
        { status: 201 }
      );
    }
    // const hashPassword = await bcrypt.hash(password, 10)

    return NextResponse.json(
      { sucess: false, message: " login failed" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { sucess: false, message: "please provide info" },
      { status: 500 }
    );
  }
}
