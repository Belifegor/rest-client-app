"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gray-900 text-white p-6 space-y-6">
      <div className="text-6xl font-bold text-teal-500">404</div>
      <p className="text-gray-300 text-lg text-center max-w-md">{t("text")}</p>
      <Link
        href={ROUTES.HOME}
        className="bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 px-6 py-2 rounded-lg text-white font-medium transition"
      >
        {t("link")}
      </Link>
    </div>
  );
}
