import { describe, it, expect } from "vitest";
import { genXhr } from "./xhr";

describe("genXhr", () => {
  it("GET: тримит URL, нормализует заголовки и шлёт без body", () => {
    const out = genXhr(
      "GET",
      "   https://api.example.dev/items   ",
      [
        { key: "  Content-Type: ", value: " application/json " },
        { key: "X-Auth", value: " t " },
        { key: "   ", value: "ignored" },
      ],
      ""
    );

    expect(out).toContain('xhr.open("GET", "https://api.example.dev/items");');
    expect(out).toContain('xhr.setRequestHeader("Content-Type", "application/json");');
    expect(out).toContain('xhr.setRequestHeader("X-Auth", "t");');
    expect(out).toContain("xhr.send();");
    expect(out).not.toContain("JSON.stringify(");
    expect(out).not.toContain("const data =");
  });

  it("POST с JSON body: создаёт const data и шлёт JSON.stringify(data)", () => {
    const body = '{"a":1,"b":"x"}';
    const out = genXhr("POST", "https://api.example.dev/create", [], body);

    expect(out).toContain('xhr.open("POST", "https://api.example.dev/create");');
    expect(out).toContain(
      `const data = {
  "a": 1,
  "b": "x"
};`
    );
    expect(out).toContain("xhr.send(JSON.stringify(data));");
  });

  it("POST с сырым body: использует template literal и экранирует бэктики", () => {
    const body = "x`y`z";
    const out = genXhr("POST", "https://api.example.dev/send", [], body);

    expect(out).toContain('xhr.open("POST", "https://api.example.dev/send");');
    expect(out).toContain("xhr.send(`x\\`y\\`z`);");
  });
});
