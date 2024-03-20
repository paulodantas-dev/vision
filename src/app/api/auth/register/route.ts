import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const hashedPassword = await hash(body.password, 10);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }

  return NextResponse.json({ message: "success" });
}
