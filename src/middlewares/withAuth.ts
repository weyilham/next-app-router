import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const onlyAdmin = ["/dashboard"];
const authPage = ["/auth/login", "/auth/register"];

export default function withAuth(
  middleware: NextMiddleware,
  requireUrl: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    // console.log(pathname);

    if (requireUrl.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", req.url);
        return NextResponse.redirect(url);
      }

      if (token) {
        if (authPage.includes(pathname)) {
          //   console.log(token);
          return NextResponse.redirect(new URL("/", req.url));
        }
        // console.log(token);

        if (token.role !== "admin" && onlyAdmin.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }
    return middleware(req, next);
  };
}
