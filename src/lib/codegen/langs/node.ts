import {
  GenMethod,
  GenHeader,
  methodSupportsBody,
  normalizeHeaders,
  tryParseJson,
  headersToObject,
  escBackticks,
} from "../helpers";

export const genNode = (
  method: GenMethod,
  url: string,
  headers: GenHeader[],
  body: string
): string => {
  const m = method.toUpperCase() as GenMethod;
  const hs = normalizeHeaders(headers);
  const hasBody = methodSupportsBody(m) && body.trim().length > 0;
  const json = tryParseJson(body);
  const headersObj = headersToObject(hs);

  const payloadVar = hasBody
    ? json
      ? `const data = JSON.stringify(${JSON.stringify(json, null, 2)});`
      : `const data = \`${escBackticks(body)}\`;`
    : "const data = null;";

  return `const url = new URL("${url.trim()}");
const isHttps = url.protocol === "https:";
const lib = isHttps ? require("https") : require("http");

const options = { method: "${m}", headers: ${JSON.stringify(headersObj, null, 2)} };

${payloadVar}

const req = lib.request(url, options, (res) => {
  let chunks = [];
  res.on("data", (d) => chunks.push(d));
  res.on("end", () => {
    const body = Buffer.concat(chunks).toString("utf-8");
    console.log("Status:", res.statusCode);
    console.log("Response:", body);
  });
});

req.on("error", console.error);
if (data) req.write(data);
req.end();`;
};
