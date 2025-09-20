import { describe, it, expect } from "vitest";
import { routing } from "./routing";

describe("routing", () => {
  it("should have correct locales", () => {
    expect(routing.locales).toEqual(["en", "ru"]);
  });

  it("should have correct default locale", () => {
    expect(routing.defaultLocale).toBe("en");
  });

  it("should be defined with correct structure", () => {
    expect(routing).toHaveProperty("locales");
    expect(routing).toHaveProperty("defaultLocale");
    expect(Array.isArray(routing.locales)).toBe(true);
  });
});
