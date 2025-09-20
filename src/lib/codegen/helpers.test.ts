import { describe, it, expect } from "vitest";
import {
  methodSupportsBody,
  normalizeHeaders,
  tryParseJson,
  escShellSingle,
  escBackticks,
  headersToObject,
  type GenHeader,
} from "./helpers";

describe("helpers", () => {
  describe("methodSupportsBody", () => {
    it("возвращает true для методов с телом", () => {
      expect(methodSupportsBody("POST")).toBe(true);
      expect(methodSupportsBody("PUT")).toBe(true);
      expect(methodSupportsBody("PATCH")).toBe(true);
      expect(methodSupportsBody("DELETE")).toBe(true);
    });

    it("возвращает false для методов без тела", () => {
      expect(methodSupportsBody("GET")).toBe(false);
    });
  });

  describe("normalizeHeaders", () => {
    it("триммит key/value, убирает двоеточие на конце ключа и фильтрует пустые ключи", () => {
      const input: GenHeader[] = [
        { key: "  Content-Type:  ", value: "  application/json  " },
        { key: "X-Auth:", value: " t " },
        { key: "   ", value: "x" },
        { key: "", value: "y" },
      ];
      const out = normalizeHeaders(input);
      expect(out).toEqual([
        { key: "Content-Type", value: "application/json" },
        { key: "X-Auth", value: "t" },
      ]);
    });

    it("сохраняет непустые ключи без изменений, если правок не нужно", () => {
      const input: GenHeader[] = [{ key: "Accept", value: "text/plain" }];
      expect(normalizeHeaders(input)).toEqual([{ key: "Accept", value: "text/plain" }]);
    });
  });

  describe("tryParseJson", () => {
    it("возвращает null для пустых/пробельных строк и для строк не с '{' или '['", () => {
      expect(tryParseJson("")).toBeNull();
      expect(tryParseJson("   ")).toBeNull();
      expect(tryParseJson("hello")).toBeNull();
      expect(tryParseJson("123")).toBeNull();
      expect(tryParseJson("true")).toBeNull();
    });

    it("парсит валидный JSON-объект и массив", () => {
      const obj = tryParseJson(`{"a":1,"b":"x"}`) as { a: number; b: string };
      expect(obj).toEqual({ a: 1, b: "x" });

      const arr = tryParseJson(`[1, 2, 3]`) as number[];
      expect(arr).toEqual([1, 2, 3]);
    });

    it("возвращает null при невалидном JSON", () => {
      expect(tryParseJson(`{invalid`)).toBeNull();
      expect(tryParseJson(`[1, 2,`)).toBeNull();
    });
  });

  describe("escShellSingle", () => {
    it("экранирует одинарные кавычки для POSIX shell", () => {
      expect(escShellSingle("simple")).toBe("simple");
      expect(escShellSingle("it's fine")).toBe("it'\"'\"'s fine");
      expect(escShellSingle("'start' and 'end'")).toBe("'\"'\"'start'\"'\"' and '\"'\"'end'\"'\"'");
    });
  });

  describe("escBackticks", () => {
    it("экранирует обратные кавычки", () => {
      expect(escBackticks("no ticks")).toBe("no ticks");
      expect(escBackticks("`code` block")).toBe("\\`code\\` block");
      expect(escBackticks("a`b`c`")).toBe("a\\`b\\`c\\`");
    });
  });

  describe("headersToObject", () => {
    it("преобразует массив заголовков в объект", () => {
      const hs: GenHeader[] = [
        { key: "A", value: "1" },
        { key: "B", value: "2" },
      ];
      expect(headersToObject(hs)).toEqual({ A: "1", B: "2" });
    });

    it("последнее значение с одинаковым ключом побеждает", () => {
      const hs: GenHeader[] = [
        { key: "X", value: "1" },
        { key: "X", value: "2" },
        { key: "X", value: "3" },
      ];
      expect(headersToObject(hs)).toEqual({ X: "3" });
    });
  });
});
