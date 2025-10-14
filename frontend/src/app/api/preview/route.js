import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const documentId = searchParams.get("documentId");
  const uid = searchParams.get("uid");
  const status=searchParams.get("status");

  if (secret !== process.env.PREVIEW_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!documentId || !uid) {
    return NextResponse.json(
      { error: "Missing documentId or uid" },
      { status: 400 }
    );
  }

  const draftModeObj = await draftMode();
  draftModeObj.enable();

  const pageUrl = (() => {
    switch (uid) {
      case "api::homepage.homepage":
        return "/";
      case "api::about-page.about-page":
        return "/about";
      case "api::blog.blog":
        return `/blogs/${documentId}`;
      default:
        return "/";
    }
  })();

  return NextResponse.redirect(new URL(`${pageUrl}?preview=true&status=${status.toUpperCase()}`, req.url));
}
