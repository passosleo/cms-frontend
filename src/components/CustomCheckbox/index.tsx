import React from "react";
import { ConnectForm } from "../ConnectForm";
import { ErrorHookForm, ErrorsHookForm } from "@/types/react-hook-form";
import { Controller, RegisterOptions } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { iterateObject } from "@/utils/object";
import { When } from "../When";

type Props = {
  label: React.ReactNode;
  name: string;
  error?: string;
  hideError?: boolean;
  rules?: RegisterOptions;
  defaultValue?: boolean;
  disabled?: boolean;
  id?: string;
};

export function CustomCheckbox({
  name,
  hideError,
  rules,
  error,
  defaultValue,
  label,
  disabled,
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
            disabled={disabled}
            render={({ field: { onChange, value, ...fields } }) => (
              <div>
                <div className="flex flex-row items-center gap-1">
                  <Checkbox
                    id={id}
                    onCheckedChange={onChange}
                    checked={value}
                    disabled={disabled}
                    {...fields}
                  />
                  <label
                    htmlFor={id}
                    className={`text-sm select-none ${
                      disabled ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {label}
                  </label>
                </div>
                <div className="h-4 pl-2">
                  <When condition={!hideError && (hasError || error)}>
                    <div data-testid="messageValidation">
                      <label className="text-red-500 text-xs">
                        {hasError?.message || error}
                      </label>
                    </div>
                  </When>
                </div>
              </div>
            )}
          />
        );
      }}
    </ConnectForm>
  );
}
