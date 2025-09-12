"use client";

import { useEffect, useState } from "react";
import { auth } from "@/db/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import WelcomeMessage from "@/components/WelcomeMessage";
import GeneralInfo from "@/components/GeneraInfo";
import { UserButtons } from "@/components/ui/custom/UserButtons";
import Loader from "../components/ui/custom/Loader";

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

  if (loading) return <Loader />;

  const isAuthenticated: boolean = !!user;
  const username: string = user?.displayName || "Jacob Schmidt";

  return (
    <div className="flex flex-col flex-1 p-6 gap-12">
      <div className="flex flex-col items-center gap-6">
        <WelcomeMessage isAuthenticated={isAuthenticated} username={username} />
        {isAuthenticated && <UserButtons />}
      </div>
      <GeneralInfo />
    </div>
  );
}
