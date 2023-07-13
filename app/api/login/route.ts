import { NextRequest, NextResponse } from "next/server";
import Auth from "@/model/auth.model";
import bcrypt from "bcrypt";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(req: NextRequest) {
  let req_json = await req.json();
  try {
    connect();
    const auth = Auth;
    const user = await auth.findOne({ userEmail: req_json.userEmail });
    if (user) {
      const validatePassword = await bcrypt.compare(
        req_json.password,
        user.password!
      );
      if (validatePassword) {
        const { userEmail, userName, role } = user;
        return NextResponse.json(
          {
            authData: {
              userEmail,
              userName,
              role,
            },
            success: true,
            message: "Login successful",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            authData: {},
            success: false,
            message: "",
          },
          { status: 401, statusText: "Invalid password" }
        );
      }
    } else {
      return NextResponse.json(
        {
          authData: {},
          success: false,
          message: "",
        },
        { status: 404, statusText: "User not found" }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "",
      },
      { status: 500, statusText: "Internal server error" }
    );
  }
}
