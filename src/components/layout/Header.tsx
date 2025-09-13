"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";
import { auth } from "@/db/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { toast } from "sonner";
import Logo from "@/components/ui/custom/Logo";
import { useAuthRedirect } from "@/lib/hooks/useAuthRedirect";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const { signedOutRef } = useAuthRedirect();

  useEffect((): (() => void) => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser): void => {
      setUser(currentUser);
    });
    return (): void => unsubscribe();
  }, []);

  useEffect((): (() => void) => {
    const onScroll: () => void = (): void => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return (): void => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut: () => Promise<void> = async (): Promise<void> => {
    try {
      signedOutRef.current = true;
      await signOut(auth);
      await fetch("/api/session", { method: "DELETE" });
      toast.success("You have been signed out");
    } catch {
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const isAuthenticated: boolean = !!user;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-700 transition-all duration-300 flex items-center justify-between px-6 ${
        scrolled ? "bg-gray-800 py-3 shadow-md" : "bg-gray-900 py-4"
      }`}
    >
      <Logo />

      <div className="flex items-center gap-4">
        <select
          className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
          defaultValue="en"
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
        </select>

        {isAuthenticated ? (
          <>
            <Link
              href={ROUTES.HOME}
              className="bg-gradient-to-r from-sky-600 to-blue-600/80 hover:from-sky-700 hover:to-blue-700/80 px-3 py-1 rounded text-sm cursor-pointer"
            >
              Main Page
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 px-3 py-1 rounded text-sm cursor-pointer"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link
              href={ROUTES.SIGN_IN}
              className="bg-gradient-to-r from-sky-600 to-blue-600/80 hover:from-sky-700 hover:to-blue-700/80 px-3 py-1 rounded text-sm cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href={ROUTES.SIGN_UP}
              className="bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 px-3 py-1 rounded text-sm cursor-pointer"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
