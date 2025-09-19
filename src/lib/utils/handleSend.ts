export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type HeaderKV = { key: string; value: string };
export type ParamKV = { key: string; value: string };

type AuthInput =
  | { type: "none" }
  | { type: "bearer"; token: string }
  | { type: "basic"; username: string; password: string };

type Args = {
  method: HttpMethod;
  url: string;
  headers: HeaderKV[];
  body: string;

  params?: ParamKV[];
  auth?: AuthInput;

  setRespStatus: (s: string | null) => void;
  setRespHeaders: (h: Array<[string, string]>) => void;
  setRespBody: (b: string) => void;
  setIsLoading: (v: boolean) => void;
  setErrorMsg: (m: string | null) => void;
};

export async function handleSend({
  method,
  url,
  headers,
  body,

  params = [],
  auth = { type: "none" },

  setRespStatus,
  setRespHeaders,
  setRespBody,
  setIsLoading,
  setErrorMsg,
}: Args) {
  if (!url.trim()) return;

  setErrorMsg(null);
  setRespStatus(null);
  setRespHeaders([]);
  setRespBody("");

  const rawUrl = url.trim();
  if (!/^https?:\/\//i.test(rawUrl)) {
    setErrorMsg("URL must start with http:// or https://");
    return;
  }

  let finalUrl = rawUrl;
  try {
    const u = new URL(finalUrl);
    const qs = new URLSearchParams(u.search);
    params.filter((p) => p.key.trim().length > 0).forEach((p) => qs.set(p.key.trim(), p.value));
    u.search = qs.toString();
    finalUrl = u.toString();
  } catch {
    setErrorMsg("Invalid URL");
    return;
  }

  setIsLoading(true);

  const controller = new AbortController();

  try {
    const headersObj = Object.fromEntries(
      headers.filter((h) => h.key.trim()).map((h) => [h.key.trim(), h.value])
    ) as Record<string, string>;

    const looksLikeJson = body.trim().startsWith("{") || body.trim().startsWith("[");
    const hasCT = Object.keys(headersObj).some((k) => k.toLowerCase() === "content-type");
    if (!hasCT && looksLikeJson) {
      headersObj["Content-Type"] = "application/json";
    }

    const hasAuthHeader = Object.keys(headersObj).some((k) => k.toLowerCase() === "authorization");

    if (!hasAuthHeader) {
      if (auth.type === "bearer" && auth.token.trim()) {
        headersObj.Authorization = `Bearer ${auth.token.trim()}`;
      } else if (auth.type === "basic" && (auth.username || auth.password)) {
        const raw = `${auth.username ?? ""}:${auth.password ?? ""}`;
        headersObj.Authorization = `Basic ${btoa(raw)}`;
      }
    }

    const hasBody = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
    const init: RequestInit = {
      method,
      headers: headersObj,
      signal: controller.signal,
      ...(hasBody && body.trim().length ? { body } : {}),
    };

    const t0 = performance.now();
    const res = await fetch(finalUrl, init);
    const t1 = performance.now();

    setRespStatus(`${res.status} ${res.statusText} • ${Math.round(t1 - t0)} ms`);

    const hdrs: Array<[string, string]> = [];
    res.headers.forEach((v, k) => hdrs.push([k, v]));
    setRespHeaders(hdrs);

    const ct = res.headers.get("content-type") || "";
    const text = await res.text();
    if (ct.includes("application/json")) {
      try {
        setRespBody(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setRespBody(text);
      }
    } else {
      setRespBody(text);
    }

    fetch("/api/history/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method,
        url: finalUrl,
        headers: headersObj,
        body,
        responseStatus: res.status,
        requestSize: body.length,
        responseSize: text.length,
        duration: Math.round(t1 - t0),
        errorDetails: null,
      }),
    }).catch(() => {});
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Network error";
    setErrorMsg(errorMsg);

    const safeUrl = (() => {
      try {
        const u = new URL(url.trim());
        return u.toString();
      } catch {
        return url.trim();
      }
    })();

    fetch("/api/history/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method,
        url: safeUrl,
        headers: Object.fromEntries(
          headers.filter((h) => h.key.trim()).map((h) => [h.key.trim(), h.value])
        ),
        body,
        responseStatus: 0,
        requestSize: body.length,
        responseSize: 0,
        duration: 0,
        errorDetails: errorMsg,
      }),
    }).catch(() => {});
  } finally {
    setIsLoading(false);
  }
}
