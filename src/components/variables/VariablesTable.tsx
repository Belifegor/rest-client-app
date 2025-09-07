"use client";

import React from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Pencil, Trash } from "lucide-react";
import { useVariablesStore } from "@/lib/stores/variables-store";

export type Variable = {
  id: number;
  name: string;
  value: string;
};

function VariablesTable() {
  const { variables } = useVariablesStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xl text-white text-center">Name</TableHead>
          <TableHead className="text-xl text-white text-center">Value</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {variables.map((item) => (
          <TableRow key={item.id} className="p-5">
            <TableCell className="p-5">{item.name}</TableCell>
            <TableCell className="p-5">{item.value}</TableCell>
            <TableCell>
              <Button variant="secondary">
                <Pencil />
                Edit
              </Button>
              <Button variant="destructive">
                <Trash />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default VariablesTable;
