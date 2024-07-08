import React, { ReactElement } from "react";
import { ConnectForm } from "../ConnectForm";
import { useCustomInput } from "./hooks/useCustomInput";

import { Controller, RegisterOptions } from "react-hook-form";

import { twMerge } from "tailwind-merge";
import { Input, InputProps as UIInputProps } from "../ui/input";
import { iterateObject } from "@/utils/object";
import { ErrorHookForm, ErrorsHookForm } from "@/types/react-hook-form";
import { When } from "../When";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export type InputProps = UIInputProps & {
  label?: string;
  error?: string;
  hidden?: boolean;
  hideError?: boolean;
  rules?: RegisterOptions;
  leftElement?: ReactElement;
  rightElement?: ReactElement;
  preventEnterSubmit?: boolean;
  onLeftElementClick?: () => void;
  onRightElementClick?: () => void;
  containerClassName?: string;
};

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      preventEnterSubmit = true,
      onKeyDown: onKeyDownProp,
      containerClassName,
      hideError,
      error,
      rules,
      label,
      rightElement,
      leftElement,
      onLeftElementClick,
      onRightElementClick,
      type: typeProp = "text",
      ...props
    },
    customRef
  ) => {
    const { onKeyDown, type, handleShowPassword } = useCustomInput({
      preventEnterSubmit,
      onKeyDownProp,
      typeProp,
    });
    return (
      <ConnectForm>
        {({ control, formState }) => {
          const id = props.id || props.name || "input";
          const idParts = id.split(".");
          const { errors } = formState;
          const hasError = iterateObject<ErrorHookForm>(
            idParts,
            errors as ErrorsHookForm
          );
          return (
            <Controller
              defaultValue={props.defaultValue || ""}
              control={control}
              rules={rules}
              name={id}
              disabled={props.disabled}
              render={({ field: { ref, onChange, ...fields } }) => (
                <div
                  className={twMerge(
                    "flex flex-col",
                    props.hidden ? "hidden" : "",
                    containerClassName
                  )}
                >
                  <When condition={label}>
                    <label htmlFor={id} className="text-sm select-none mb-1">
                      {label}
                    </label>
                  </When>
                  <Input
                    id={id}
                    ref={customRef || ref}
                    rightElement={
                      rightElement ? (
                        rightElement
                      ) : typeProp === "password" ? (
                        type === "password" ? (
                          <EyeOffIcon size={18} />
                        ) : (
                          <EyeIcon size={18} />
                        )
                      ) : (
                        <></>
                      )
                    }
                    leftElement={leftElement}
                    type={type}
                    onLeftElementClick={onLeftElementClick}
                    onRightElementClick={() => {
                      if (onRightElementClick) {
                        onRightElementClick();
                      } else if (typeProp === "password") {
                        handleShowPassword();
                      }
                    }}
                    onKeyDown={onKeyDown}
                    onChange={(data) => {
                      if (props.onChange) props.onChange(data);
                      onChange(data);
                    }}
                    {...fields}
                    {...props}
                  />
                  <div className="h-4 select-none">
                    <When condition={!hideError && (hasError || error)}>
                      <p className="text-red-500 text-xs">
                        {(hasError?.message || error) as string}
                      </p>
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
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
