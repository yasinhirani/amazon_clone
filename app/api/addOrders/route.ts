import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Auth from "@/model/auth.model";

export async function POST(req: NextRequest) {
  const req_json = await req.json();
  try {
    connect();
    const auth = Auth;
    const result = await auth.updateOne(
      { userEmail: req_json.userEmail },
      {
        $push: {
          orders: { $each: req_json.items },
        },
      }
    );
    if (result) {
      return NextResponse.json(
        {
          success: true,
          message: "",
        },
        { status: 200 }
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
