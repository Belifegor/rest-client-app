import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("объединяет простые классы", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("игнорирует falsy значения", () => {
    expect(cn("foo", null, undefined, false, "bar")).toBe("foo bar");
  });

  it("поддерживает условные классы через объект", () => {
    expect(cn("foo", { active: true, hidden: false })).toBe("foo active");
  });

  it("мерджит tailwind-конфликты (оставляет последнее)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("работает со смешанными типами (строки, массивы, объекты)", () => {
    const result = cn("foo", ["bar", { baz: true }], { qux: false }, "zap");
    expect(result).toContain("foo");
    expect(result).toContain("bar");
    expect(result).toContain("baz");
    expect(result).toContain("zap");
  });
});
