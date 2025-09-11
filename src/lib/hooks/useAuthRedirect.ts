"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export function useAuthRedirect() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect((): (() => void) => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null): void => {
      if (user) {
        router.replace(ROUTES.HOME);
      } else {
        setCheckingAuth(false);
      }
    });
    return (): void => unsubscribe();
  }, [router]);

  return { checkingAuth };
}
