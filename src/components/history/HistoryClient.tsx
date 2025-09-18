"use client";

import React from "react";
import type { HistoryItem } from "@/app/[locale]/history/page";
import { encodeBase64Url } from "@/lib/utils/base64";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Props = {
  history: HistoryItem[];
};

function generateLink(h: HistoryItem): string {
  const params = new URLSearchParams();

  params.set("method", h.method);
  params.set("url", encodeBase64Url(h.url));

  if (h.body) {
    params.set("body", encodeBase64Url(h.body));
  }

  Object.entries(h.headers).forEach(([key, value]) => {
    if (key) {
      params.set(key, value);
    }
  });
  return `/client?${params.toString()}`;
}

export default function HistoryClient({ history }: Props) {
  const t = useTranslations("History");

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">History Requests</h1>

      {history.length === 0 ? (
        <p className="text-gray-400">
          You haven&#39;t executed any requests yet. Try making a request in{" "}
          <span className="text-blue-400 underline">REST client</span>
        </p>
      ) : (
        <ul className="space-y-2">
          {history.map((h) => (
            <li key={h.id} className="border border-gray-700 rounded bg-gray-800 p-2">
              <Link href={generateLink(h)}>
                <div>
                  <strong className="px-2 py-1 rounded text-xs font-semibold border-1 border-gray-600 mr-1">
                    {h.method}
                  </strong>{" "}
                  {h.url}
                </div>
                <div className="text-xs mt-1 text-gray-400">
                  {new Date(h.createdAt).toLocaleString(t("date"), {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Status: {h.responseStatus ?? "-"} | Duration: {h.duration ?? "-"} ms |{" "}
                  {h.requestSize ?? "-"} bytes | Resp size: {h.responseSize ?? "-"} bytes
                  {h.errorDetails && <div className="text-red-500">Error: {h.errorDetails}</div>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
