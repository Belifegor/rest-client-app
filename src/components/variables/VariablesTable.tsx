"use client";

import React from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Trash } from "lucide-react";
import { useVariablesStore } from "@/lib/stores/variables-store";
import { useTranslations } from "next-intl";

export type Variable = {
  [name: string]: string;
};

function VariablesTable() {
  const t = useTranslations("Variables");

  const { variables, deleteVariable } = useVariablesStore();

  return variables.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-800 pointer-events-none">
          <TableHead className="text-l text-white text-center p-5">{t("table.name")}</TableHead>
          <TableHead className="text-l text-white text-center p-5">{t("table.value")}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {variables.map((item) => (
          <TableRow key={Object.keys(item)[0]} className="p-5 hover:bg-gray-700">
            <TableCell className="p-5">{Object.keys(item)}</TableCell>
            <TableCell className="p-5">{Object.values(item)}</TableCell>
            <TableCell>
              <Button variant="destructive" onClick={() => deleteVariable(Object.keys(item)[0])}>
                <Trash />
                {t("table.delete")}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <p>{t("no-variables-message")}</p>
  );
}

export default VariablesTable;
