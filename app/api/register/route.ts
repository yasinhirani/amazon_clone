import { NextRequest, NextResponse } from "next/server";
import Auth from "@/model/auth.model";
import bcrypt from "bcrypt";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(req: NextRequest) {
  let req_json = await req.json();
  try {
    connect();
    const hashPassword = await bcrypt
      .hash(req_json.password, 10)
      .then((hash) => hash);
    const auth = new Auth({
      userEmail: req_json.userEmail,
      userName: req_json.userName,
      password: hashPassword,
      role: "user",
      orders: [],
    });
    try {
      const user = await Auth.findOne({ userEmail: req_json.userEmail });
      if (user) {
        return NextResponse.json(
          {
            success: false,
            message: "",
          },
          {
            status: 409,
            statusText: "Email address already exist",
          }
        );
      } else {
        await auth.save();
        return NextResponse.json(
          {
            success: true,
            message: "Register successful, Please login to continue",
          },
          { status: 201 }
        );
      }
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: "",
        },
        {
          status: 503,
          statusText: error.message,
        }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "",
      },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
