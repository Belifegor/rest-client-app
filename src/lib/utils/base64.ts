export function encodeBase64Url(input: string): string {
  const utf8 = new TextEncoder().encode(input);
  const b64 =
    typeof window !== "undefined"
      ? btoa(String.fromCharCode(...utf8))
      : Buffer.from(utf8).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeBase64Url(input: string): string {
  if (!input) return "";
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((input.length + 3) % 4);
  try {
    const bin =
      typeof window !== "undefined" ? atob(b64) : Buffer.from(b64, "base64").toString("binary");
    const bytes = Uint8Array.from(bin, (ch) => ch.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return "";
  }
}
