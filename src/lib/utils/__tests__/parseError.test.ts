import { describe, it, expect } from "vitest";
import { parseError } from "@/lib/utils/parseError";

describe("parseError", () => {
  it("returns the error message if input is an Error instance", () => {
    const error = new Error("Test error");
    expect(parseError(error)).toBe("Test error");
  });

  it("returns default message if input is not an Error", () => {
    expect(parseError("string error")).toBe("Something went wrong");
    expect(parseError(123)).toBe("Something went wrong");
    expect(parseError(null)).toBe("Something went wrong");
    expect(parseError(undefined)).toBe("Something went wrong");
    expect(parseError({ message: "fake" })).toBe("Something went wrong");
  });
});
