"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";

export function GuestButtons() {
  const t = useTranslations("Main");

  return (
    <div className="flex gap-4 flex-wrap justify-center w-full">
      <Button
        asChild
        className="bg-gradient-to-r from-teal-600 to-green-600/80
                   hover:from-teal-700 hover:to-green-700/80
                   text-white px-6 py-2 rounded shadow-md transition w-32"
      >
        <Link href={ROUTES.SIGN_IN}>{t("welcome.sign-in")}</Link>
      </Button>
      <Button
        variant="secondary"
        asChild
        className="bg-gray-800 hover:bg-gray-700
                   text-white px-6 py-2 rounded shadow-md transition w-32"
      >
        <Link href={ROUTES.SIGN_UP}>{t("welcome.sign-up")}</Link>
      </Button>
    </div>
  );
}
