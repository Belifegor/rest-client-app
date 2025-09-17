"use client";

import React from "react";
import type { HistoryItem } from "@/app/[locale]/history/page";

type Props = {
  history: HistoryItem[];
};

export default function HistoryClient({ history }: Props) {
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
              <div>
                <strong>{h.method}</strong> {h.url}
              </div>
              <div className="text-xs mt-1 text-gray-400">
                {new Date(h.createdAt).toLocaleString()}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Status: {h.responseStatus ?? "-"} | Duration: {h.duration ?? "-"} ms |{" "}
                {h.requestSize ?? "-"} bytes | Resp size: {h.responseSize ?? "-"} bytes
                {h.errorDetails && <div className="text-red-500">Error: {h.errorDetails}</div>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
