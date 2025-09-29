import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const documentId = searchParams.get("documentId");
  const type = searchParams.get("type");

  if (!documentId) {
    return NextResponse.json({ error: "Missing documentId" }, { status: 400 });
  }

  draftMode().enable();

  return NextResponse.redirect(
    new URL(`/${type || "blogs"}/${documentId}?preview=true`, req.url)
  );
}
