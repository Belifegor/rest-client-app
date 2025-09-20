import { describe, it, expect } from "vitest";
import { parseError } from "./parseError";

describe("parseError", () => {
  it("возвращает message, если err является экземпляром Error", () => {
    const err = new Error("boom");
    expect(parseError(err)).toBe("boom");
  });

  it("возвращает message у кастомного класса ошибки", () => {
    class CustomError extends Error {
      constructor() {
        super("custom error happened");
      }
    }
    const err = new CustomError();
    expect(parseError(err)).toBe("custom error happened");
  });

  it("возвращает fallback для строки", () => {
    expect(parseError("fail")).toBe("Something went wrong");
  });

  it("возвращает fallback для числа", () => {
    expect(parseError(123)).toBe("Something went wrong");
  });

  it("возвращает fallback для null/undefined", () => {
    expect(parseError(null)).toBe("Something went wrong");
    expect(parseError(undefined)).toBe("Something went wrong");
  });

  it("возвращает fallback для объекта", () => {
    expect(parseError({ msg: "x" })).toBe("Something went wrong");
  });
});
