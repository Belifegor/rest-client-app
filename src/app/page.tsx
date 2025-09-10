"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import WelcomeMessage from "@/components/WelcomeMessage";
import ButtonsBlock from "@/components/ui/ButtonsBlock";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect((): (() => void) => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser): void => {
      setUser(currentUser);
      setLoading(false);
    });
    return (): void => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  }

  const isAuthenticated: boolean = !!user;
  const username: string = user?.displayName || "Jacob Schmidt";

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6 gap-6">
      <WelcomeMessage isAuthenticated={isAuthenticated} username={username} />
      <ButtonsBlock isAuthenticated={isAuthenticated} />
    </div>
  );
}
