"use client";

import { useEffect, useState } from "react";
import WelcomeMessage from "@/components/WelcomeMessage";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect((): (() => void) => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser): void => {
      setUser(currentUser);
    });
    return (): void => unsubscribe();
  }, []);

  const isAuthenticated: boolean = !!user;
  const username: string = user?.displayName || "Jacob Schmidt";

  return <WelcomeMessage isAuthenticated={isAuthenticated} username={username} />;
}
