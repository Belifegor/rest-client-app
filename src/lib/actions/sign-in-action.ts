import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormState } from "@/types/types";
import { redirectToHome, parseError } from "@/lib/utils/forms";

export async function signInAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    redirectToHome();
    return { error: null };
  } catch (err: unknown) {
    return { error: parseError(err) };
  }
}
