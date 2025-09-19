import {
  GenMethod,
  GenHeader,
  methodSupportsBody,
  normalizeHeaders,
  tryParseJson,
  headersToObject,
} from "../helpers";

export const genPython = (
  method: GenMethod,
  url: string,
  headers: GenHeader[],
  body: string
): string => {
  const m = method.toLowerCase();
  const hs = normalizeHeaders(headers);
  const hasBody = methodSupportsBody(method) && body.trim().length > 0;
  const json = tryParseJson(body);
  const headersObj = headersToObject(hs);
  const headersPy = JSON.stringify(headersObj, null, 2).replace(/"/g, `'`);

  const payloadLine = hasBody
    ? json
      ? `payload = ${JSON.stringify(json, null, 2)}`
      : `payload = ${JSON.stringify(body)}`
    : "";

  return `import requests

url = "${url.trim()}"
headers = ${headersPy}
${payloadLine ? payloadLine + "\n" : ""}response = requests.${m}(url${payloadLine ? ", json=payload" : ""}, headers=headers)
print("Status:", response.status_code)
print("Response:", response.text)`;
};
