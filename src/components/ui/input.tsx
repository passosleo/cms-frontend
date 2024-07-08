import * as React from "react";

import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftElement?: React.ReactNode;
  onLeftElementClick?: () => void;
  rightElement?: React.ReactNode;
  onRightElementClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      rightElement,
      onRightElementClick,
      leftElement,
      onLeftElementClick,
      type,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex items-center w-full border rounded-md border-input">
        {leftElement ? (
          <span
            onClick={onLeftElementClick || (() => {})}
            className={twMerge(
              "w-10 h-10 flex items-center justify-center rounded-l-sm transition-all",
              onLeftElementClick ? "cursor-pointer hover:bg-accent" : ""
            )}
          >
            {leftElement}
          </span>
        ) : (
          <></>
        )}
        <input
          type={type}
          className={cn(
            "transition-all flex h-10 w-full bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 outline-none",
            leftElement ? "pl-1 rounded-l-none" : "pl-3 rounded-l-md",
            rightElement ? "pr-1 rounded-r-none" : "pr-3 rounded-r-md",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightElement ? (
          <span
            onClick={onRightElementClick || (() => {})}
            className={twMerge(
              "w-10 h-10 flex items-center justify-center rounded-r-sm transition-all",
              onRightElementClick ? "cursor-pointer hover:bg-accent" : ""
            )}
          >
            {rightElement}
          </span>
        ) : (
          <></>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
