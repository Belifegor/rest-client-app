import { Variable } from "@/components/variables/VariablesTable";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type VariablesStore = {
  variables: Variable[];
  addVariable: (variable: Variable) => void;
  deleteVariable: (name: string) => void;
};

export const useVariablesStore = create<VariablesStore>()(
  persist(
    (set) => ({
      variables: [],
      addVariable: (variable) => {
        set((state) => ({ variables: [...state.variables, variable] }));
      },
      deleteVariable: (key) =>
        set((state) => ({ variables: state.variables.filter((item) => !(key in item)) })),
    }),

    {
      name: "rc-variables",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
