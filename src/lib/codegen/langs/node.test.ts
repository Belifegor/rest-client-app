import { describe, it, expect } from "vitest";
import { genNode } from "./node";

describe("genNode", () => {
  it("GET: тримит URL, нормализует заголовки, data=null", () => {
    const out = genNode(
      "GET",
      "   https://api.example.dev/items   ",
      [
        { key: "  Content-Type: ", value: " application/json " },
        { key: "X-Auth", value: " t " },
        { key: "   ", value: "ignored" },
      ],
      ""
    );

    expect(out).toContain('const url = new URL("https://api.example.dev/items");');
    expect(out).toContain('const options = { method: "GET", headers: {');
    expect(out).toContain('"Content-Type": "application/json"');
    expect(out).toContain('"X-Auth": "t"');
    expect(out).toContain("const data = null;");
    expect(out).not.toContain("JSON.stringify(");
    expect(out).not.toContain("`");
  });

  it("POST с JSON body: data = JSON.stringify(pretty JSON)", () => {
    const out = genNode("POST", "https://api.example.dev/create", [], `{"a":1,"b":"x"}`);

    expect(out).toContain('const options = { method: "POST", headers: {');
    expect(out).toContain(
      `const data = JSON.stringify({
  "a": 1,
  "b": "x"
});`
    );
    expect(out).toContain("if (data) req.write(data);");
  });

  it("POST с сырым body: использует template literal и экранирует бэктики", () => {
    const body = "x`y`z";
    const out = genNode("POST", "https://api.example.dev/send", [], body);

    expect(out).toContain('const options = { method: "POST", headers: {');
    expect(out).toContain("const data = `x\\`y\\`z`;");
  });
});
