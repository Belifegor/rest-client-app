import { describe, it, expect } from "vitest";
import { genGo } from "./go";

describe("genGo", () => {
  it("GET без body: payload=nil, без encoding/json, NewRequest(..., nil), заголовки нормализуются", () => {
    const out = genGo(
      "GET",
      "   https://api.example.dev/items   ",
      [
        { key: "  Content-Type: ", value: " application/json " },
        { key: "X-Auth", value: " t " },
        { key: "   ", value: "ignored" },
      ],
      ""
    );

    expect(out).toContain('url := "https://api.example.dev/items"');

    expect(out).toContain("payload := bytes.NewBuffer(nil)");

    expect(out).toContain('http.NewRequest("GET", url, nil)');

    expect(out).not.toContain('"encoding/json"');

    expect(out).toContain('req.Header.Set("Content-Type", "application/json")');
    expect(out).toContain('req.Header.Set("X-Auth", "t")');

    expect(out).toContain('"bytes"');
    expect(out).toContain('"fmt"');
    expect(out).toContain('"io"');
    expect(out).toContain('"net/http"');
  });

  it("POST с JSON body: генерирует Marshal, bytes.NewBuffer(payloadBytes), добавляет encoding/json", () => {
    const out = genGo("POST", "https://api.example.dev/create", [], `{"a":1,"b":"x"}`);

    expect(out).toContain('"encoding/json"');

    expect(out).toContain("payloadBytes, _ := json.Marshal({");
    expect(out).toContain('  "a": 1,');
    expect(out).toContain('  "b": "x"');
    expect(out).toContain("payload := bytes.NewBuffer(payloadBytes)");

    expect(out).toContain('http.NewRequest("POST", url, payload)');
  });

  it("POST с сырым body: bytes.NewBufferString(...), без encoding/json", () => {
    const body = "raw <> `body`";
    const out = genGo("POST", "https://api.example.dev/send", [], body);

    expect(out).not.toContain('"encoding/json"');

    expect(out).toContain(`payload := bytes.NewBufferString(${JSON.stringify(body)})`);

    expect(out).toContain('http.NewRequest("POST", url, payload)');
  });
});
