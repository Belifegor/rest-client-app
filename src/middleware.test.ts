import { describe, it, expect, vi, beforeEach } from "vitest";
import { middleware } from "@/middleware";
import { ROUTES } from "@/constants/routes";
import { PROTECTED_PATHS } from "@/constants/protected-paths";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

vi.mock("next-intl/middleware", () => ({
  default: (routing: { locales?: string[] }) => {
    routing.locales = ["en", "ru"];
    return vi.fn(() => NextResponse.next());
  },
}));

vi.spyOn(NextResponse, "redirect").mockImplementation((url: string | URL) => {
  const redirectUrl = typeof url === "string" ? url : url.toString();
  return NextResponse.next({
    status: 307,
    headers: { location: redirectUrl },
  });
});

function createMockRequest(token?: string, pathname = "/dashboard"): NextRequest {
  const url = {
    href: `http://localhost${pathname}`,
    pathname,
    clone() {
      return { ...url };
    },
    toString() {
      return this.href;
    },
  };

  return {
    cookies: {
      get: (key: string) => (key === "token" && token ? { value: token } : undefined),
    },
    nextUrl: url,
  } as unknown as NextRequest;
}

describe("middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to home if path is protected and no token", () => {
    const req = createMockRequest(undefined, PROTECTED_PATHS[0]);
    const res = middleware(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain(ROUTES.HOME);
  });

  it("allows access if path is protected and token exists", () => {
    const req = createMockRequest("mock-token", PROTECTED_PATHS[0]);
    const res = middleware(req);

    expect(res).toBeInstanceOf(NextResponse);
  });

  it("calls intlMiddleware for unprotected path", () => {
    const req = createMockRequest("mock-token", "/public");
    const res = middleware(req);

    expect(res).toBeInstanceOf(NextResponse);
  });

  it("redirects correctly for localized paths", () => {
    const path = `/en${PROTECTED_PATHS[0]}`;
    const req = createMockRequest(undefined, path);
    const res = middleware(req);

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain(ROUTES.HOME);
  });
});
