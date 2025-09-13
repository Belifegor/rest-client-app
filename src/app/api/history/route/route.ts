import { NextRequest, NextResponse } from "next/server";
import { adminAuth, db } from "@/db/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

interface HistoryRequestBody {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  requestSize?: number;
  responseSize?: number;
  duration?: number;
  errorDetails?: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const body: HistoryRequestBody = await req.json();

    await db.collection("history").add({
      userId,
      method: body.method,
      url: body.url,
      headers: body.headers,
      body: body.body,
      requestSize: body.requestSize ?? 0,
      responseSize: body.responseSize ?? 0,
      duration: body.duration ?? 0,
      errorDetails: body.errorDetails ?? null,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, message: (err as Error).message }, { status: 500 });
  }
}
