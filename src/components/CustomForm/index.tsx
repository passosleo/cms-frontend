import React from "react";
import { useCustomForm } from "./hooks/useCustomForm";
import {
  FieldValues,
  FormProvider,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { ZodSchema } from "zod";
import { twMerge } from "tailwind-merge";

type Props<T extends FieldValues> = {
  onSubmit: (data: T, hookFormMethods: UseFormReturn<T>) => void;
  useFormProps?: Omit<UseFormProps<Partial<T>>, "resolver">;
  children: React.ReactNode;
  zodSchema?: ZodSchema<Partial<T>>;
  resetOnSubmit?: boolean;
  className?: string;
  preventEnterSubmit?: boolean;
};

export function CustomForm<T extends FieldValues>({
  onSubmit: onSubmitProp,
  zodSchema,
  children,
  useFormProps,
  className,
  resetOnSubmit = false,
  preventEnterSubmit = false,
}: Props<T>) {
  const { methods, onSubmit, onKeyDown } = useCustomForm<T>({
    onSubmit: onSubmitProp,
    useFormProps,
    zodSchema,
    resetOnSubmit,
    preventEnterSubmit,
  });

  return (
    <FormProvider {...methods}>
      <form
        className={twMerge("flex w-full flex-col gap-1", className)}
        onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}
        onKeyDown={onKeyDown}
      >
        {children}
      </form>
    </FormProvider>
  );
}
