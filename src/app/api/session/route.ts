import { cookies } from "next/headers";
import { adminAuth } from "@/db/firebase-admin";

export async function POST(req: Request) {
  const { token } = await req.json();

  try {
    await adminAuth.verifyIdToken(token);
    const decodedToken = await adminAuth.verifyIdToken(token, true);
    (await cookies()).set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(decodedToken.exp * 1000),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 401 });
  }
}

export async function DELETE() {
  (await cookies()).delete({
    name: "token",
    path: "/",
  });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
