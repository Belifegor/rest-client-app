"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-160 justify-center items-center">
      <h2 className="text-3xl font-semibold">{t("title")}</h2>
      <p className="p-5">{error.message}</p>
      <button
        className="bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 text-white px-6 py-2 rounded shadow-md transition"
        onClick={reset}
      >
        {t("button")}
      </button>
    </div>
  );
}
