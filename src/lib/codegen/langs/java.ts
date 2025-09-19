import {
  GenMethod,
  GenHeader,
  methodSupportsBody,
  normalizeHeaders,
  tryParseJson,
} from "../helpers";

export const genJava = (
  method: GenMethod,
  url: string,
  headers: GenHeader[],
  body: string
): string => {
  const m = method.toUpperCase() as GenMethod;
  const hs = normalizeHeaders(headers);
  const hasBody = methodSupportsBody(m) && body.trim().length > 0;
  const json = tryParseJson(body);
  const ct = hs.find((h) => h.key.toLowerCase() === "content-type")?.value || "application/json";

  const headersBlock = hs.map((h) => `.addHeader("${h.key}", "${h.value}")`).join("\n      ");
  const media = `MediaType mediaType = MediaType.parse("${ct}");`;
  const bodyLine = hasBody
    ? `RequestBody body = RequestBody.create(${json ? `"${JSON.stringify(json).replace(/"/g, '\\"')}"` : `"${body.replace(/"/g, '\\"')}"`}, mediaType);`
    : "RequestBody body = RequestBody.create(new byte[0], null);";

  const call = hasBody
    ? m === "POST"
      ? "post(body)"
      : m === "PUT"
        ? "put(body)"
        : m === "PATCH"
          ? "patch(body)"
          : m === "DELETE"
            ? "delete(body)"
            : `method("${m}", body)`
    : m === "DELETE"
      ? "delete()"
      : "get()";

  return `// build.gradle: implementation("com.squareup.okhttp3:okhttp:4.12.0")
import okhttp3.*;

public class Example {
  public static void main(String[] args) throws Exception {
    OkHttpClient client = new OkHttpClient();

    ${media}
    ${bodyLine}

    Request request = new Request.Builder()
      .url("${url.trim()}")
      .${call}
      ${headersBlock ? headersBlock : ""}
      .build();

    try (Response response = client.newCall(request).execute()) {
      System.out.println("Status: " + response.code());
      System.out.println("Response: " + response.body().string());
    }
  }
}`;
};
