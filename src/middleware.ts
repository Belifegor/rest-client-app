import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { ROUTES } from "@/constants/routes";
import { PROTECTED_PATHS } from "@/constants/protected-paths";

const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  const segments = url.pathname.split("/").filter(Boolean);
  let normalizedPath = url.pathname;

  if (
    segments.length > 1 &&
    routing.locales.includes(segments[0] as (typeof routing.locales)[number])
  ) {
    normalizedPath = "/" + segments.slice(1).join("/");
  }

  const isProtected = PROTECTED_PATHS.some(
    (path) => normalizedPath === path || normalizedPath.startsWith(path + "/")
  );

  if (isProtected && !token) {
    url.pathname = ROUTES.HOME;
    return NextResponse.redirect(url);
  }

  const res = intlMiddleware(req);
  if (res) return res;

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
