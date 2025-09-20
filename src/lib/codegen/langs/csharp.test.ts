import { describe, it, expect, vi, beforeEach, Mock } from "vitest";

// замокаем helpers ДО импорта тестируемой функции
vi.mock("../helpers", () => {
  return {
    methodSupportsBody: vi.fn<(m: string) => boolean>(),
    normalizeHeaders: vi.fn(<T>(hs: T) => hs),
    tryParseJson: vi.fn<(s: string) => unknown>(),
    headersToObject: vi.fn<(hs: Array<{ key: string; value: string }>) => Record<string, string>>(
      (hs) =>
        hs.reduce<Record<string, string>>((acc, h) => {
          if (h.key) acc[h.key] = h.value;
          return acc;
        }, {})
    ),
  };
});

// теперь можно импортировать тестируемую функцию и моки
import { genCSharp } from "./csharp";
import { methodSupportsBody, normalizeHeaders, tryParseJson, headersToObject } from "../helpers";

type GenMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD";
type GenHeader = { key: string; value: string };

beforeEach(() => {
  vi.clearAllMocks();
});

describe("genCSharp", () => {
  it("GET без тела: фильтрует Content-Type, не создаёт content, вызывает GetAsync", () => {
    (methodSupportsBody as unknown as Mock).mockReturnValue(false);
    (tryParseJson as unknown as Mock).mockReturnValue(null);

    const method: GenMethod = "GET";
    const url = "   https://api.test/items  ";
    const headers: GenHeader[] = [
      { key: "X-Auth", value: "t" },
      { key: "Content-Type", value: "text/plain" }, // должен быть отфильтрован в DefaultRequestHeaders
    ];
    const body = "";

    const code = genCSharp(method, url, headers, body);

    // URL обрезан
    expect(code).toContain('var url = "https://api.test/items";');

    // Content-Type не должен добавляться в DefaultRequestHeaders
    expect(code).toContain('client.DefaultRequestHeaders.Add("X-Auth", "t");');
    expect(code).not.toContain('client.DefaultRequestHeaders.Add("Content-Type"');

    // content = null для GET
    expect(code).toContain("HttpContent? content = null;");

    // отправка GetAsync
    expect(code).toContain("await client.GetAsync(url)");

    // базовые using/Console выводы присутствуют
    expect(code).toContain("using System.Net.Http;");
    expect(code).toContain('Console.WriteLine("Status: " + (int)response.StatusCode);');
  });

  it("POST с JSON телом без Content-Type: создаёт json StringContent с application/json и PostAsync", () => {
    (methodSupportsBody as unknown as Mock).mockReturnValue(true);
    (tryParseJson as unknown as Mock).mockReturnValue({ ok: true });

    const method: GenMethod = "POST";
    const url = "https://api.test/create";
    const headers: GenHeader[] = [{ key: "X-Req", value: "1" }]; // нет Content-Type
    const body = `{"ok":true}`;

    const code = genCSharp(method, url, headers, body);

    // json ветка: есть var json = "..."; + StringContent(..., "application/json")
    expect(code).toContain("var json = ");
    expect(code).toContain(
      'var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");'
    );

    // заголовок X-Req добавлен, Content-Type не добавляется отдельно
    expect(code).toContain('client.DefaultRequestHeaders.Add("X-Req", "1");');
    expect(code).not.toContain('client.DefaultRequestHeaders.Add("Content-Type"');

    // PostAsync(url, content!)
    expect(code).toContain("await client.PostAsync(url, content!)");
  });

  it("POST с текстовым телом и явным Content-Type: StringContent(body, ..., этот Content-Type), Content-Type не дублируется в headers", () => {
    (methodSupportsBody as unknown as Mock).mockReturnValue(true);
    (tryParseJson as unknown as Mock).mockReturnValue(null); // тело не JSON => текстовая ветка

    const method: GenMethod = "POST";
    const url = "https://api.test/send";
    const headers: GenHeader[] = [{ key: "Content-Type", value: "text/plain; charset=utf-8" }];
    const body = "hello";

    const code = genCSharp(method, url, headers, body);

    // должен использоваться defaultCt = взятый из headersObj Content-Type
    expect(code).toContain(
      'var content = new StringContent("hello", System.Text.Encoding.UTF8, "text/plain; charset=utf-8");'
    );

    // Content-Type не добавляется в DefaultRequestHeaders
    expect(code).not.toContain('client.DefaultRequestHeaders.Add("Content-Type"');

    // PostAsync(url, content!)
    expect(code).toContain("await client.PostAsync(url, content!)");
  });

  it("DELETE без тела: DeleteAsync(url); DELETE с телом: SendAsync(HttpMethod.Delete ...)", () => {
    // кейс без тела
    (methodSupportsBody as unknown as Mock).mockReturnValue(true);
    (tryParseJson as unknown as Mock).mockReturnValue(null);

    const method: GenMethod = "DELETE";
    let code = genCSharp(method, "https://api.test/x", [], "");
    expect(code).toContain("HttpContent? content = null;");
    expect(code).toContain("await client.DeleteAsync(url)");

    // кейс с телом
    code = genCSharp(method, "https://api.test/x", [], "payload");
    expect(code).toContain(
      "await client.SendAsync(new HttpRequestMessage(HttpMethod.Delete, url) { Content = content })"
    );
  });

  it("PATCH с телом: SendAsync(HttpMethod.Patch, url) + Content", () => {
    (methodSupportsBody as unknown as Mock).mockReturnValue(true);
    (tryParseJson as unknown as Mock).mockReturnValue(null);

    const method: GenMethod = "PATCH";
    const code = genCSharp(method, "https://api.test/p", [], "x");

    expect(code).toContain(
      "await client.SendAsync(new HttpRequestMessage(HttpMethod.Patch, url) { Content = content })"
    );
  });

  it("normalizeHeaders и headersToObject вызываются с исходными заголовками", () => {
    (methodSupportsBody as unknown as Mock).mockReturnValue(false);
    (tryParseJson as unknown as Mock).mockReturnValue(null);

    const headers: GenHeader[] = [
      { key: "A", value: "1" },
      { key: "B", value: "2" },
    ];

    genCSharp("GET", "https://api", headers, "");

    expect(normalizeHeaders).toHaveBeenCalledWith(headers);
    // headersToObject вызывается с результатом normalizeHeaders
    const passedToNormalize = (normalizeHeaders as unknown as Mock).mock.calls[0][0];
    const passedToHeadersObj = (headersToObject as unknown as Mock).mock.calls[0][0];
    expect(passedToHeadersObj).toBe(passedToNormalize);
  });
});
