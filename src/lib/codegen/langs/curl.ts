import {
  GenMethod,
  GenHeader,
  methodSupportsBody,
  normalizeHeaders,
  tryParseJson,
  escShellSingle,
} from "../helpers";

export const genCurl = (
  method: GenMethod,
  url: string,
  headers: GenHeader[],
  body: string
): string => {
  const m = method.toUpperCase() as GenMethod;
  const hs = normalizeHeaders(headers);
  const hasBody = methodSupportsBody(m) && body.trim().length > 0;
  const bodyJson = tryParseJson(body);

  const lines = [`curl -X ${m} "${url.trim()}"`];
  hs.forEach((h) => lines.push(`  -H "${h.key}: ${h.value}"`));
  if (hasBody) {
    const payload = bodyJson ? JSON.stringify(bodyJson) : body;
    lines.push(`  --data-raw '${escShellSingle(payload)}'`);
  }
  return lines.join(" \\\n");
};
