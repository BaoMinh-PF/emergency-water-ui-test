import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
