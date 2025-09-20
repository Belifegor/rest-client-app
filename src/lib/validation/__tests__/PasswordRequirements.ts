import { describe, it, expect } from "vitest";
import { passwordRequirements } from "@/lib/validation/password-requirements";

describe("passwordRequirements", () => {
  it("validates minimum 8 characters", () => {
    const rule = passwordRequirements.find((r) => r.label === "password-requirements.characters")!;
    expect(rule.test("1234567")).toBe(false);
    expect(rule.test("12345678")).toBe(true);
  });

  it("validates at least one letter", () => {
    const rule = passwordRequirements.find((r) => r.label === "password-requirements.letter")!;
    expect(rule.test("12345678")).toBe(false);
    expect(rule.test("abcd1234")).toBe(true);
    expect(rule.test("ABCD1234")).toBe(true);
  });

  it("validates at least one digit", () => {
    const rule = passwordRequirements.find((r) => r.label === "password-requirements.digit")!;
    expect(rule.test("abcdefgh")).toBe(false);
    expect(rule.test("abc12345")).toBe(true);
  });

  it("validates at least one special character", () => {
    const rule = passwordRequirements.find((r) => r.label === "password-requirements.special")!;
    expect(rule.test("abcdef123")).toBe(false);
    expect(rule.test("abc123!@#")).toBe(true);
  });

  it("passes all rules for a strong password", () => {
    const password = "Abc123!@#";
    const results: boolean[] = passwordRequirements.map((r) => r.test(password));
    expect(results.every(Boolean)).toBe(true);
  });

  it("fails at least one rule for a weak password", () => {
    const password = "a";
    const results: boolean[] = passwordRequirements.map((r) => r.test(password));
    expect(results.some((res) => res === false)).toBe(true);
  });
});
