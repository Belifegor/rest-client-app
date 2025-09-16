"use client";

import { useEffect, useRef } from "react";
import { useRequest, HttpMethod } from "@/store/request.store";
import { encodeBase64Url, decodeBase64Url } from "@/lib/utils/base64";

const DEBOUNCE_MS = 300;

export function useRequestQuerySync() {
  const { method, url, body, headers, setMethod, setUrl, setBody } = useRequest();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const encUrl = params.get("url");
    if (encUrl) {
      const decoded = decodeBase64Url(encUrl);
      if (decoded !== "") setUrl(decoded);
    }

    const encBody = params.get("body");
    if (encBody !== null) {
      setBody(decodeBase64Url(encBody));
    }

    const m = params.get("method");
    if (m) {
      const up = m.toUpperCase();
      if (["GET", "POST", "PUT", "DELETE", "PATCH"].includes(up)) {
        setMethod(up as HttpMethod);
      }
    }
  }, [setUrl, setBody, setMethod]);

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      params.set("method", method);

      const trimmedUrl = url.trim();
      if (trimmedUrl.length) {
        params.set("url", encodeBase64Url(trimmedUrl));
      } else {
        params.delete("url");
      }

      if (body.length) {
        params.set("body", encodeBase64Url(body));
      } else {
        params.delete("body");
      }

      headers.forEach((h) => {
        if (h.key.trim().length) {
          params.set(h.key.trim(), h.value.trim());
        }
      });

      const nextQs = params.toString();
      const nextHref = nextQs ? `${window.location.pathname}?${nextQs}` : window.location.pathname;

      if (nextHref !== window.location.pathname + window.location.search) {
        window.history.replaceState(null, "", nextHref);
      }
    }, DEBOUNCE_MS) as unknown as number;

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [method, url, body, headers]);
}
