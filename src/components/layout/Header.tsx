"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect((): (() => void) => {
    const onScroll: () => void = (): void => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return (): void => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-gray-700 transition-all duration-300 flex items-center justify-between px-6 ${
        scrolled ? "bg-gray-800 py-3 shadow-md" : "bg-gray-900 py-4"
      }`}
    >
      <Link href={ROUTES.HOME} className="font-bold text-lg hover:opacity-80 transition">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hover:opacity-80 transition"
        >
          <rect width="40" height="40" rx="10" fill="#0D9488" />
          <path d="M12.5 20H27.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20 12.5V27.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M23.75 16.25L16.25 23.75"
            stroke="#99F6E4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M16.25 16.25L23.75 23.75"
            stroke="#99F6E4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </Link>

      <div className="flex items-center gap-4">
        <select
          className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
          defaultValue="en"
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
        </select>

        {isAuthenticated ? (
          <button
            onClick={(): void => setIsAuthenticated(false)}
            className="bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 px-3 py-1 rounded text-sm cursor-pointer"
          >
            Sign Out
          </button>
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
