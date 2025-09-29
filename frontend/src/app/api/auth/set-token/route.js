import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BASE_URL } from "@/utils/Constants";

export async function POST(req) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const userInfoResponse=await fetch(`${BASE_URL}/api/auth/github/callback?access_token=${token}`)
  const userInfo=await userInfoResponse.json();
  const cookieStore=await cookies();
  cookieStore.set("token",userInfo.jwt);

  return NextResponse.json({ ok: true ,token:userInfo.jwt});
}
