"use client";

import Link from "next/link";
import { useActionState } from "react";
import { ROUTES } from "@/constants/routes";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormState } from "@/types/types";

const initialState: FormState = { error: null };

async function signInAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    if (typeof window !== "undefined") {
      window.location.href = ROUTES.HOME;
    }

    return { error: null };
  } catch (err: unknown) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Failed to sign in" };
  }
}

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(signInAction, initialState);

  return (
    <div className="flex flex-1 items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>

        <form action={formAction} className="flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="text-sm text-gray-300">Email</span>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              className="mt-1 rounded bg-gray-900 border border-gray-700 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-300">Password</span>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              className="mt-1 rounded bg-gray-900 border border-gray-700 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </label>

          {state.error && <p className="text-red-400 text-sm text-center">{state.error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 text-white font-medium px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 mt-4">
          No account?{" "}
          <Link href={ROUTES.SIGN_UP} className="underline text-white">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
