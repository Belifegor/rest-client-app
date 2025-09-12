"use client";

import { useEffect, useRef, useState } from "react";
import { auth } from "@/db/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export function useAuthRedirect() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  const prevUserRef = useRef<User | null>(null);

  useEffect((): (() => void) => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null): void => {
      const prevUser: User | null = prevUserRef.current;

      if (user || (!user && prevUser)) {
        setCheckingAuth(true);
        setTimeout((): void => {
          router.push(ROUTES.HOME);
        }, 200);
      } else {
        setCheckingAuth(false);
      }

      prevUserRef.current = user;
    });

    return (): void => unsubscribe();
  }, [router]);

  return { checkingAuth };
}
