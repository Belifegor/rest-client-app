import {
  GenMethod,
  GenHeader,
  methodSupportsBody,
  normalizeHeaders,
  tryParseJson,
  headersToObject,
} from "../helpers";

export const genCSharp = (
  method: GenMethod,
  url: string,
  headers: GenHeader[],
  body: string
): string => {
  const m = method.toUpperCase();
  const hs = normalizeHeaders(headers);
  const hasBody = methodSupportsBody(method) && body.trim().length > 0;
  const json = tryParseJson(body);
  const headersObj = headersToObject(hs);

  const defaultCt = headersObj["Content-Type"] || (json ? "application/json" : "text/plain");
  const headersSet = Object.entries(headersObj)
    .filter(([k]) => k.toLowerCase() !== "content-type")
    .map(([k, v]) => `client.DefaultRequestHeaders.Add("${k}", "${v}");`)
    .join("\n");

  const payload = hasBody
    ? json
      ? `var json = ${JSON.stringify(JSON.stringify(json), null, 2)};\nvar content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");`
      : `var content = new StringContent(${JSON.stringify(body)}, System.Text.Encoding.UTF8, "${defaultCt}");`
    : "HttpContent? content = null;";

  const send =
    m === "GET"
      ? "await client.GetAsync(url)"
      : m === "POST"
        ? "await client.PostAsync(url, content!)"
        : m === "PUT"
          ? "await client.PutAsync(url, content!)"
          : m === "PATCH"
            ? "await client.SendAsync(new HttpRequestMessage(HttpMethod.Patch, url) { Content = content })"
            : m === "DELETE"
              ? hasBody
                ? "await client.SendAsync(new HttpRequestMessage(HttpMethod.Delete, url) { Content = content })"
                : "await client.DeleteAsync(url)"
              : `await client.SendAsync(new HttpRequestMessage(new HttpMethod("${m}"), url) { Content = content })`;

  return `using System;
using System.Net.Http;
using System.Threading.Tasks;

var url = "${url.trim()}";
using var client = new HttpClient();
${headersSet ? headersSet : ""}

${payload}

var response = ${send};
var text = await response.Content.ReadAsStringAsync();
Console.WriteLine("Status: " + (int)response.StatusCode);
Console.WriteLine("Response: " + text);`;
};
