import { describe, it, expect, vi, Mock } from "vitest";

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({})),
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
}));

import { auth } from "@/db/firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

describe("Firebase initialization", () => {
  it("calls initializeApp with config", () => {
    expect(initializeApp).toHaveBeenCalledOnce();
    const config = (initializeApp as Mock).mock.calls[0][0];
    expect(config).toHaveProperty("apiKey");
    expect(config).toHaveProperty("authDomain");
    expect(config).toHaveProperty("projectId");
  });

  it("calls getAuth with the initialized app", () => {
    expect(getAuth).toHaveBeenCalledOnce();
  });

  it("exports auth correctly", () => {
    expect(auth).toBeDefined();
  });
});
