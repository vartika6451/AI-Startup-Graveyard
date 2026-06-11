import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("sg_session");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Auth Logout Route Error:", error);
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
