"use client";

import Link from "next/link";
import { useState } from "react";
import { useActionState } from "react";
import { ROUTES } from "@/constants/routes";
import { passwordRequirements } from "@/lib/validation/password-requirements";
import { signUpAction } from "@/lib/actions/sign-up-action";
import { FormState } from "@/types/types";
import { useAuthRedirect } from "@/lib/hooks/useAuthRedirect";
import Loader from "../../components/ui/Loader";

const initialState: FormState = { error: null };

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUpAction, initialState);
  const [password, setPassword] = useState("");
  const { checkingAuth } = useAuthRedirect();

  if (checkingAuth) return <Loader />;

  return (
    <div className="flex flex-1 items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

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
              placeholder="At least 8 characters"
              className="mt-1 rounded bg-gray-900 border border-gray-700 px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <ul className="text-sm space-y-1 ml-1 mb-2">
            {passwordRequirements.map((req) => {
              const passed = req.test(password);
              return (
                <li
                  key={req.label}
                  className={`flex items-center gap-2 ${
                    passed ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {passed ? "✔️" : "❌"} {req.label}
                </li>
              );
            })}
          </ul>

          <label className="flex flex-col">
            <span className="text-sm text-gray-300">Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
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
            {isPending ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href={ROUTES.SIGN_IN} className="underline text-white">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
