import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormState } from "@/types/types";
import { parseError } from "@/lib/utils/parseError";

export async function signInAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { error: null };
  } catch (err: unknown) {
    return { error: parseError(err) };
  }
}
