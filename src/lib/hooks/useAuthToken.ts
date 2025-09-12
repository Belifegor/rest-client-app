"use client";

import { useEffect, useState } from "react";
import { auth } from "@/db/firebase";
import { onIdTokenChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

export function useAuthToken() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        toast.message(`"Current user token:", ${token}`);
        setUser(currentUser);
      } else {
        setUser(null);
        router.push(ROUTES.HOME);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  return { user, loading };
}
