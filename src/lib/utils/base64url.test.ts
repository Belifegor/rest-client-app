import { describe, it, expect } from "vitest";
import { encodeBase64Url, decodeBase64Url } from "./base64";

describe("encodeBase64Url / decodeBase64Url", () => {
  it("корректно кодирует и декодирует простую строку", () => {
    const input = "hello";
    const encoded = encodeBase64Url(input);
    expect(encoded).toBe("aGVsbG8");
    const decoded = decodeBase64Url(encoded);
    expect(decoded).toBe(input);
  });

  it("работает со строками с пробелами и спецсимволами", () => {
    const input = "a b+c/d?=!";
    const encoded = encodeBase64Url(input);
    const decoded = decodeBase64Url(encoded);
    expect(decoded).toBe(input);
  });

  it("возвращает пустую строку при encode/decode пустого ввода", () => {
    expect(encodeBase64Url("")).toBe("");
    expect(decodeBase64Url("")).toBe("");
  });

  it("decode возвращает пустую строку при некорректном вводе", () => {
    expect(decodeBase64Url("***not-base64***")).toBe("");
  });

  it("сохраняет обратимость для юникода (emoji, кириллица)", () => {
    const input = "Привет 👋";
    const encoded = encodeBase64Url(input);
    const decoded = decodeBase64Url(encoded);
    expect(decoded).toBe(input);
  });
});
