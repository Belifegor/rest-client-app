import { adminAuth } from "@/db/firebase-admin";
import { cookies } from "next/headers";

export async function GET() {
  const token: string | undefined = (await cookies()).get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ valid: false }), { status: 401 });
  }

  try {
    await adminAuth.verifyIdToken(token, true);
    return new Response(JSON.stringify({ valid: true }));
  } catch {
    return new Response(JSON.stringify({ valid: false }), { status: 401 });
  }
}
