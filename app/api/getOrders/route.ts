import { NextRequest, NextResponse } from "next/server";
import Auth from "@/model/auth.model";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(req: NextRequest) {
  const req_json = await req.json();
  try {
    connect();
    const auth = Auth;
    const user = await auth.findOne({ userEmail: req_json.userEmail });
    if (user) {
      return NextResponse.json(
        {
          success: true,
          message: "",
          orders: user.orders,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "",
          orders: [],
        },
        {
          status: 404,
          statusText:
            "User not found or something went wrong, please try after some time",
        }
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
