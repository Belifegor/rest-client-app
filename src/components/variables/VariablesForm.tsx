import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useVariablesStore } from "@/lib/stores/variables-store";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddVariableData, createAddVariableSchema } from "@/lib/validation/variables-schema";
import { useTranslations } from "next-intl";

function VariablesForm() {
  const t = useTranslations("Variables");
  const { variables, addVariable } = useVariablesStore();

  const addVariableSchema = createAddVariableSchema(t);

  const onSubmit = (data: AddVariableData) => {
    const isDuplicate = variables.some((item) => Object.keys(item)[0] === data.name);

    if (!isDuplicate) {
      const newVariable = { [data.name]: data.value };
      addVariable(newVariable);
      reset();
    } else {
      toast.error(t("toast-duplicate-message", { name: data.name }));
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddVariableData>({
    mode: "onBlur",
    resolver: zodResolver(addVariableSchema),
  });

  return (
    <form className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          className="flex-1 text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          type="text"
          placeholder={t("input-placeholder.name")}
          {...register("name")}
        ></Input>
        {errors.name && (
          <p className="text-red-400 text-xs text-left mt-2">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input
          className="flex-1 text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          type="text"
          placeholder={t("input-placeholder.value")}
          {...register("value")}
        ></Input>
        {errors.value && (
          <p className="text-red-400 text-xs text-left mt-2">{errors.value.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-gradient-to-r from-teal-600 to-green-600/80 hover:from-teal-700 hover:to-green-700/80 text-white px-6 py-2 rounded shadow-md transition"
      >
        {t("button-add")}
      </Button>
    </form>
  );
}

export default VariablesForm;
