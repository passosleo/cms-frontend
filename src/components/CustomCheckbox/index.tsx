import React from "react";
import { ConnectForm } from "../ConnectForm";
import { ErrorHookForm, ErrorsHookForm } from "@/types/react-hook-form";
import { Controller, RegisterOptions } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { iterateObject } from "@/utils/object";

type Props = {
  label: React.ReactNode;
  name: string;
  error?: string;
  hideError?: boolean;
  rules?: RegisterOptions;
  defaultValue?: boolean;
  id?: string;
};

export function CustomCheckbox({
  name,
  hideError,
  rules,
  error,
  defaultValue,
  label,
  ...props
}: Props) {
  return (
    <ConnectForm>
      {({ control, formState }) => {
        const id = props.id || name || "checkbox";
        const idParts = id.split(".");
        const { errors } = formState;

        const hasError = iterateObject<ErrorHookForm>(
          idParts,
          errors as ErrorsHookForm
        );
        return (
          <Controller
            defaultValue={defaultValue || false}
            control={control}
            rules={rules}
            name={id}
            render={({ field }) => (
              <div>
                <div className="flex flex-row items-center gap-1">
                  <Checkbox {...field} id={id} />
                  <label htmlFor={id} className="text-sm cursor-pointer">
                    {label}
                  </label>
                </div>
                <div className="h-4 pl-2">
                  {!hideError && (hasError || error) && (
                    <div data-testid="messageValidation">
                      <label className="text-red-500 text-xs">
                        {hasError?.message || error}
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}
          />
        );
      }}
    </ConnectForm>
  );
}
