// pages/api/users.js

import { NextResponse } from "next/server";
import { connectMongoDb } from "@/lib/mongodb";
import User from "@/models/users";

export async function GET() {
  try {
    await connectMongoDb();
    const users = await User.find({}, "name email");
    // console.log('Fetched users:', users); // Log users to the console
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}