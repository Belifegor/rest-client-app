import {
  GenMethod,
  GenHeader,
  methodSupportsBody,
  normalizeHeaders,
  tryParseJson,
  headersToObject,
  escBackticks,
} from "../helpers";

export const genFetch = (
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

  const bodyPart = hasBody
    ? json
      ? `,\n  body: JSON.stringify(${JSON.stringify(json, null, 2)})`
      : `,\n  body: \`${escBackticks(body)}\``
    : "";

  return `await fetch("${url.trim()}", {
  method: "${m}",
  headers: ${JSON.stringify(headersObj, null, 2)}${bodyPart}
});`;
};
