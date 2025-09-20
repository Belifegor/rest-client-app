import {
  GenMethod,
  GenHeader,
  methodSupportsBody,
  normalizeHeaders,
  tryParseJson,
  escBackticks,
} from "../helpers";

export const genXhr = (
  method: GenMethod,
  url: string,
  headers: GenHeader[],
  body: string
): string => {
  const m = method.toUpperCase() as GenMethod;
  const hs = normalizeHeaders(headers);
  const hasBody = methodSupportsBody(m) && body.trim().length > 0;
  const json = tryParseJson(body);

  const setHdrs = hs.map((h) => `xhr.setRequestHeader("${h.key}", "${h.value}");`).join("\n  ");
  const send = hasBody
    ? json
      ? `const data = ${JSON.stringify(json, null, 2)};\n  xhr.send(JSON.stringify(data));`
      : `xhr.send(\`${escBackticks(body)}\`);`
    : "xhr.send();";

  return `const xhr = new XMLHttpRequest();
xhr.open("${m}", "${url.trim()}");
${setHdrs ? "  " + setHdrs + "\n" : ""}xhr.onload = function () {
  console.log("Status:", xhr.status);
  console.log("Response:", xhr.responseText);
};
xhr.onerror = function () { console.error("Network error"); };
${send}`;
};
