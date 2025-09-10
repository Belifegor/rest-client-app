"use client";

import { Input } from "@/components/ui/input";
import VariablesForm from "@/components/variables/VariablesForm";
import VariablesTable from "@/components/variables/VariablesTable";
import { useVariable } from "@/lib/hooks/useVariable";
import React, { useState } from "react";

function VariablesPage() {
  const { containsVariable, replaceWithValue } = useVariable();
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredInput = e.target.value;
    setInput(e.target.value);

    if (containsVariable(enteredInput)) {
      setResult(replaceWithValue(enteredInput));
    } else {
      setResult(enteredInput);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 h-full bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-semibold">Variables</h2>
      <span>Request</span>
      <Input value={input} onChange={handleInputChange} />
      <span>Result:</span>
      <p>{result}</p>
      <VariablesForm />
      <VariablesTable />
    </div>
  );
}

export default VariablesPage;
