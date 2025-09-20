export type GenMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type GenHeader = { key: string; value: string };

export const methodSupportsBody = (m: GenMethod) => ["POST", "PUT", "PATCH", "DELETE"].includes(m);

export const normalizeHeaders = (hs: GenHeader[]) =>
  hs
    .map((h) => ({ key: h.key.trim().replace(/:$/, ""), value: h.value.trim() }))
    .filter((h) => h.key.length > 0);

export const tryParseJson = (s: string): unknown | null => {
  const t = s.trim();
  if (!t || !/^[[{]/.test(t)) return null;
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
};

export const escShellSingle = (s: string) => s.replace(/'/g, "'\"'\"'");
export const escBackticks = (s: string) => s.replace(/`/g, "\\`");

export const headersToObject = (hs: GenHeader[]) =>
  hs.reduce<Record<string, string>>((a, h) => {
    a[h.key] = h.value;
    return a;
  }, {});
