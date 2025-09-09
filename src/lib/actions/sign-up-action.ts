"use client";

import { SignUpData, signUpSchema } from "@/lib/validation/auth-schema";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ROUTES } from "@/constants/routes";
import { FormState } from "@/types/types";

export async function signUpAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const data: SignUpData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const result = signUpSchema.safeParse(data);
  if (!result.success) return { error: result.error.issues[0].message };

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;
    const username = data.email.split("@")[0];

    await updateProfile(user, { displayName: username });

    if (typeof window !== "undefined") {
      window.location.href = ROUTES.HOME;
    }

    return { error: null };
  } catch (err: unknown) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Failed to create account" };
  }
}
