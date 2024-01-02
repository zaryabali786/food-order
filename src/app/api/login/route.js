import { User } from "@/models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
    const body = await req.json();
    const email = body?.email;
    const password = body?.password;
console.log(body.email,password,"body ha yeh")
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    const user = await User.findOne({ email });
    const passwordOk = user && bcrypt.compareSync(password, user.password);
    console.log(passwordOk, "check ha",);
    if (passwordOk) {
        return   NextResponse.json({data:true})
      
    }

    return   NextResponse.json({status: "unauthenticated",user:user})
  
  }