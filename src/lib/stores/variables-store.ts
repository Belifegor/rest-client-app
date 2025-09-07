import { Variable } from "@/components/variables/VariablesTable";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type VariablesStore = {
  variables: Variable[];
  addVariable: (variable: Omit<Variable, "id">) => void;
  updateVariable: (id: number, updatedData: Partial<Variable>) => void;
  deleteVariable: (id: number) => void;
};

export const useVariablesStore = create<VariablesStore>()(
  persist(
    (set, get) => ({
      variables: [],
      addVariable: (variable) => {
        const id =
          get().variables.length > 0 ? get().variables[get().variables.length - 1].id + 1 : 0;
        set((state) => ({ variables: [...state.variables, { ...variable, id }] }));
      },
      updateVariable: (id, updatedData) =>
        set((state) => ({
          variables: state.variables.map((item) =>
            item.id === id ? { ...item, ...updatedData } : item
          ),
        })),
      deleteVariable: (id) =>
        set((state) => ({ variables: state.variables.filter((item) => item.id !== id) })),
    }),

    {
      name: "rc-variables",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
