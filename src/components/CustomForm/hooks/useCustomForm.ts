import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { z } from "zod";

type Props<T extends FieldValues> = {
  useFormProps?: Omit<UseFormProps<Partial<T>>, "resolver">;
  onSubmit: (data: T, hookFormMethods: UseFormReturn<T>) => void;
  zodSchema?: z.ZodSchema<any>;
  resetOnSubmit?: boolean;
  preventEnterSubmit?: boolean;
};

export function useCustomForm<T extends FieldValues>({
  useFormProps,
  zodSchema,
  onSubmit: onSubmitProp,
  resetOnSubmit,
  preventEnterSubmit,
}: Props<T>) {
  const methods = useForm<z.infer<typeof zodSchema | any>>({
    reValidateMode: "onChange",
    ...useFormProps,
    resolver: zodResolver(zodSchema || z.object({})),
  });

  function onSubmit(data: T, hookFormMethods: UseFormReturn<T>) {
    onSubmitProp(data, hookFormMethods);
    if (resetOnSubmit) methods.reset(undefined, { keepIsSubmitted: false });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter" && !preventEnterSubmit) {
      e.preventDefault();
      methods.handleSubmit((data) => onSubmit(data, methods))();
    }
  }

  return { methods, onSubmit, onKeyDown };
}
