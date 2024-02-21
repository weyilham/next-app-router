import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const res = request.nextUrl.searchParams.get("tags");
  const token = request.nextUrl.searchParams.get("token");
  if (res !== "product") {
    return NextResponse.json(
      { status: 401, message: "Missing Tags Prams" },
      {
        status: 401,
      }
    );
  }

  if (token !== process.env.NEXT_REVALIDATE_TOKEN) {
    return NextResponse.json(
      { status: 400, message: "Invalid Token" },
      {
        status: 400,
      }
    );
  }

  revalidateTag(res);
  return NextResponse.json({ revalidate: true, now: Date.now() });
}
