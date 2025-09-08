"use client";

import React from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Trash } from "lucide-react";
import { useVariablesStore } from "@/lib/stores/variables-store";

export type Variable = {
  [name: string]: string;
};

function VariablesTable() {
  const { variables, deleteVariable } = useVariablesStore();

  return variables.length > 0 ? (
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
          <TableRow key={Object.keys(item)[0]} className="p-5">
            <TableCell className="p-5">{Object.keys(item)}</TableCell>
            <TableCell className="p-5">{Object.values(item)}</TableCell>
            <TableCell>
              <Button variant="destructive" onClick={() => deleteVariable(Object.keys(item)[0])}>
                <Trash />
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <p>No variables here. Add a variable to get started!</p>
  );
}

export default VariablesTable;
