import {
  GenMethod,
  GenHeader,
  methodSupportsBody,
  normalizeHeaders,
  tryParseJson,
} from "../helpers";

export const genGo = (
  method: GenMethod,
  url: string,
  headers: GenHeader[],
  body: string
): string => {
  const m = method.toUpperCase();
  const hs = normalizeHeaders(headers);
  const hasBody = methodSupportsBody(method) && body.trim().length > 0;
  const json = tryParseJson(body);

  const payload = hasBody
    ? json
      ? `payloadBytes, _ := json.Marshal(${JSON.stringify(json, null, 2)})
  payload := bytes.NewBuffer(payloadBytes)`
      : `payload := bytes.NewBufferString(${JSON.stringify(body)})`
    : "payload := bytes.NewBuffer(nil)";

  const setHdrs = hs.map((h) => `req.Header.Set("${h.key}", "${h.value}")`).join("\n  ");

  const imports = ["bytes", "fmt", "io", "net/http"];
  if (hasBody && json) imports.push("encoding/json");

  return `package main

import (
  ${imports.map((i) => `"${i}"`).join("\n  ")}
)

func main() {
  url := "${url.trim()}"
  ${payload}
  req, _ := http.NewRequest("${m}", url, ${hasBody ? "payload" : "nil"})
  ${setHdrs}
  client := &http.Client{}
  res, err := client.Do(req)
  if err != nil { panic(err) }
  defer res.Body.Close()
  body, _ := io.ReadAll(res.Body)
  fmt.Println("Status:", res.StatusCode)
  fmt.Println("Response:", string(body))
}`;
};
