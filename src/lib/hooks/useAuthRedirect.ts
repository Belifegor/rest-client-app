"use client";

import { useEffect, useRef, useState } from "react";
import { auth } from "@/db/firebase";
import { onAuthStateChanged, User, getIdTokenResult } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

export function useAuthRedirect() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  const prevUserRef = useRef<User | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect((): (() => void) | undefined => {
    if (typeof window === "undefined") return;

    const unsubscribe = onAuthStateChanged(auth, async (user: User | null): Promise<void> => {
      const prevUser: User | null = prevUserRef.current;

      if (user) {
        try {
          const tokenResult = await getIdTokenResult(user);
          const realExpiresAt: number = new Date(tokenResult.expirationTime).getTime();
          const delay: number = realExpiresAt - Date.now();

          if (timerRef.current) clearTimeout(timerRef.current);

          timerRef.current = setTimeout(async () => {
            toast.error("Session expired. You have been signed out.");
            await auth.signOut();
            router.push(ROUTES.HOME);
          }, delay);

          if (!prevUser || prevUser !== user) {
            setCheckingAuth(true);
            setTimeout((): void => {
              router.push(ROUTES.HOME);
            }, 200);
          } else {
            setCheckingAuth(false);
          }
        } catch (err) {
          toast.error(`Authentication error. You have been signed out. ${err}`);
          await auth.signOut();
          setCheckingAuth(true);
          router.push(ROUTES.HOME);
        }
      } else if (!user && prevUser) {
        setCheckingAuth(true);
        router.push(ROUTES.HOME);
      } else {
        setCheckingAuth(false);
      }

      prevUserRef.current = user;
    });

    return (): void => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [router]);

  return { checkingAuth };
}
