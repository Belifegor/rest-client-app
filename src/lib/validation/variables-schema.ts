import { z } from "zod";

export const addVariableSchema = z.object({
  name: z.string().min(1, "Name is required").regex(/^\S*$/, "Name should not contain spaces"),
  value: z.string().min(1, "Value is required"),
});

export type AddVariableData = z.infer<typeof addVariableSchema>;
