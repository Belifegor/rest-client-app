"use client";

import { Button } from "../button";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export function UserButtons() {
  return (
    <div className="flex gap-4 flex-wrap justify-center w-full">
      <Button
        asChild
        className="bg-gradient-to-r from-teal-600 to-green-600/80
                   hover:from-teal-700 hover:to-green-700/80
                   text-white px-6 py-2 rounded shadow-md transition w-32"
      >
        <Link href={ROUTES.CLIENT}>REST Client</Link>
      </Button>
      <Button
        asChild
        className="bg-gray-800 hover:bg-gray-700
                   text-white px-6 py-2 rounded shadow-md transition w-32"
      >
        <Link href={ROUTES.HISTORY}>History</Link>
      </Button>
      <Button
        asChild
        className="bg-gray-800 hover:bg-gray-700
                   text-white px-6 py-2 rounded shadow-md transition w-32"
      >
        <Link href={ROUTES.VARIABLES}>Variables</Link>
      </Button>
    </div>
  );
}
