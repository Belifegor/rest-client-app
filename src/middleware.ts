import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { ROUTES } from "@/constants/routes";
import { PROTECTED_PATHS } from "@/constants/protected-paths";

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const res = intlMiddleware(req);
  if (res) return res;

  const token = req.cookies.get("token");
  const url = req.nextUrl.clone();

  const isProtected: boolean = PROTECTED_PATHS.some(
    (path): boolean => url.pathname === path || url.pathname.startsWith(path + "/")
  );

  if (isProtected && !token) {
    url.pathname = ROUTES.HOME;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/history/:path*",
    "/client/:path*",
    "/variables/:path*",
  ],
};
