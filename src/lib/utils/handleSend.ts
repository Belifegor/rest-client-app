export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type HeaderKV = { key: string; value: string };

type Args = {
  method: HttpMethod;
  url: string;
  headers: HeaderKV[];
  body: string;

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
  setRespStatus,
  setRespHeaders,
  setRespBody,
  setIsLoading,
  setErrorMsg,
}: Args) {
  if (!url.trim()) return;

  setIsLoading(true);
  setErrorMsg(null);
  setRespStatus(null);
  setRespHeaders([]);
  setRespBody("");

  const controller = new AbortController();

  try {
    const headersObj = Object.fromEntries(
      headers.filter((h) => h.key.trim()).map((h) => [h.key, h.value])
    );

    const hasBody = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
    const init: RequestInit = {
      method,
      headers: headersObj,
      signal: controller.signal,
      ...(hasBody && body.trim().length ? { body } : {}),
    };

    const t0 = performance.now();
    const res = await fetch(url, init);
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
  } catch (err) {
    setErrorMsg(err instanceof Error ? err.message : "Network error");
  } finally {
    setIsLoading(false);
  }
}
