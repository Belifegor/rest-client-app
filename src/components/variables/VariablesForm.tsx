"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function VariablesForm() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setName("");
    setValue("");
  };

  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <Input
        className="flex-1 text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      ></Input>
      <Input
        className="flex-1 text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        type="text"
        placeholder="Value"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></Input>
      <Button
        type="submit"
        className="bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 text-white px-6 py-2 rounded shadow-md transition"
      >
        Add variable
      </Button>
    </form>
  );
}

export default VariablesForm;
