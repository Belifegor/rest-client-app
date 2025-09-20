import { describe, it, expect, vi, beforeEach } from "vitest";
import * as firebaseAdmin from "@/db/firebase-admin";
import * as headers from "next/headers";
import { POST, DELETE } from "./route";

vi.mock("@/db/firebase-admin", () => ({
  adminAuth: {
    verifyIdToken: vi.fn(),
  },
}));

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

describe("session API", () => {
  const mockCookiesSet = vi.fn();
  const mockCookiesDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (headers.cookies as unknown as () => Promise<{
      set: typeof mockCookiesSet;
      delete: typeof mockCookiesDelete;
    }>) = async () => ({
      set: mockCookiesSet,
      delete: mockCookiesDelete,
    });
  });

  it("POST: sets cookie when token is valid", async () => {
    const token = "valid-token";
    (
      firebaseAdmin.adminAuth.verifyIdToken as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValue({
      exp: Math.floor(Date.now() / 1000) + 3600,
    });

    const req = { json: async () => ({ token }) } as unknown as Request;
    const res = await POST(req);

    expect(mockCookiesSet).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });

  it("POST: returns 401 if token invalid", async () => {
    const token = "invalid-token";

    (
      firebaseAdmin.adminAuth.verifyIdToken as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValue(new Error("invalid"));

    const req = { json: async () => ({ token }) } as unknown as Request;
    const res = await POST(req);

    expect(res.status).toBe(401);
  });

  it("DELETE: deletes cookie", async () => {
    const res = await DELETE();
    expect(mockCookiesDelete).toHaveBeenCalledWith({ name: "token", path: "/" });
    expect(res.status).toBe(200);
  });
});
