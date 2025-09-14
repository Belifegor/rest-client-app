"use client";

import VariablesForm from "@/components/variables/VariablesForm";
import VariablesTable from "@/components/variables/VariablesTable";
import React from "react";
import { useTranslations } from "next-intl";

function VariablesPage() {
  const t = useTranslations("Variables");

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 h-full bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-semibold">{t("title")}</h2>
      <VariablesForm />
      <VariablesTable />
    </div>
  );
}

export default VariablesPage;
