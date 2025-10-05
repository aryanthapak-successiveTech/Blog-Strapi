import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const documentId = searchParams.get("documentId");
  const uid = searchParams.get("uid");
  const status = searchParams.get("status");

  if (secret !== process.env.PREVIEW_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!documentId || !uid) {
    return NextResponse.json(
      { error: "Missing documentId or uid" },
      { status: 400 }
    );
  }

  draftMode().enable();

  return NextResponse.redirect(
    new URL(`/blogs/${documentId}?preview=true`, req.url)
  );
}
