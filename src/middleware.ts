import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "@/constants/routes";
import { PROTECTED_PATHS } from "@/constants/protected-paths";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const url = req.nextUrl.clone();

  const isProtected = PROTECTED_PATHS.some(
    (path): boolean => url.pathname === path || url.pathname.startsWith(path + "/")
  );

  if (isProtected && !token) {
    url.pathname = ROUTES.HOME;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/history/:path*", "/client/:path*", "/variables/:path*"],
};
