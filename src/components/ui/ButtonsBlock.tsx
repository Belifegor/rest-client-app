"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

type ButtonsBlockProps = {
  isAuthenticated?: boolean;
};

export default function ButtonsBlock({ isAuthenticated = false }: ButtonsBlockProps) {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {!isAuthenticated ? (
        <>
          <Button
            asChild
            className="bg-gradient-to-r from-teal-600 to-green-600/80
                       hover:from-teal-700 hover:to-green-700/80
                       text-white px-6 py-2 rounded shadow-md transition"
          >
            <Link href={ROUTES.SIGN_IN}>Sign In</Link>
          </Button>
          <Button
            variant="secondary"
            asChild
            className="bg-gray-800 hover:bg-gray-700
                       text-white px-6 py-2 rounded shadow-md transition"
          >
            <Link href={ROUTES.SIGN_UP}>Sign Up</Link>
          </Button>
        </>
      ) : (
        <>
          <Button
            asChild
            className="bg-gradient-to-r from-teal-600 to-green-600/80
                       hover:from-teal-700 hover:to-green-700/80
                       text-white px-6 py-2 rounded shadow-md transition"
          >
            <Link href={ROUTES.CLIENT}>REST Client</Link>
          </Button>
          <Button
            asChild
            className="bg-gray-800 hover:bg-gray-700
                       text-white px-6 py-2 rounded shadow-md transition"
          >
            <Link href={ROUTES.HISTORY}>History</Link>
          </Button>
          <Button
            asChild
            className="bg-gray-800 hover:bg-gray-700
                       text-white px-6 py-2 rounded shadow-md transition"
          >
            <Link href={ROUTES.VARIABLES}>Variables</Link>
          </Button>
        </>
      )}
    </div>
  );
}
