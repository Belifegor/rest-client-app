"use server";

import { cookies } from "next/headers";
import { adminAuth, db } from "@/db/firebase-admin";
import type { Timestamp } from "firebase-admin/firestore";
import Link from "next/link";
import { encodeBase64Url } from "@/lib/utils/base64";

type HistoryItem = {
  id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  createdAt: Timestamp;
  duration?: number;
  responseStatus?: string;
  requestSize?: number;
  responseSize?: number;
  errorDetails?: string | null;
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

export default async function HistoryPage() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) throw new Error("Unauthorized");

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const snapshot = await db.collection("history").where("userId", "==", userId).get();

    const history: HistoryItem[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        method: data.method,
        url: data.url,
        headers: data.headers,
        body: data.body,
        createdAt: data.createdAt,
        duration: data.duration,
        responseStatus: data.responseStatus,
        requestSize: data.requestSize,
        responseSize: data.responseSize,
        errorDetails: data.errorDetails,
      };
    });

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
                    {new Date(h.createdAt.toMillis()).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Status: {h.responseStatus || "-"} | Duration: {h.duration ?? "-"} ms |{" "}
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
  } catch (err) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold mb-4">History Requests</h1>
        <p className="text-red-400">Failed to load history: {(err as Error).message}</p>
      </div>
    );
  }
}
