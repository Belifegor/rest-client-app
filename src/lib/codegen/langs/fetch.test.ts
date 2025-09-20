import { describe, it, expect } from "vitest";
import { genFetch } from "./fetch";

describe("genFetch", () => {
  it("GET: тримит URL, нормализует заголовки, не добавляет body", () => {
    const out = genFetch(
      "GET",
      "   https://api.test/path   ",
      [
        { key: "  Content-Type: ", value: " application/json " },
        { key: "X-Auth", value: " t " },
        { key: "   ", value: "ignored" },
      ],
      `{"will":"be ignored for GET"}`
    );

    expect(out).toContain('await fetch("https://api.test/path", {');
    expect(out).toContain('method: "GET",');

    expect(out).toContain(
      `headers: {
  "Content-Type": "application/json",
  "X-Auth": "t"
}`
    );

    expect(out).not.toContain("body:");
  });

  it("POST с JSON body: добавляет body: JSON.stringify({...}) c pretty-форматированием", () => {
    const out = genFetch("POST", "https://api.test", [], `{"a":1,"b":"x"}`);

    expect(out).toContain('method: "POST",');
    expect(out).toContain(
      `body: JSON.stringify({
  "a": 1,
  "b": "x"
})`
    );
  });

  it("POST с сырым body: использует template literal и экранирует бэктики", () => {
    const body = "x`y`z";
    const out = genFetch("POST", "https://api.test", [], body);

    expect(out).toContain("body: `x\\`y\\`z`");
  });
});
