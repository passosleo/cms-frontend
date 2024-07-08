import { twMerge } from "tailwind-merge";
import "./styles.css";

export function CustomLoader({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      {...props}
      className={twMerge("loader text-primary text-2xl", className)}
    />
  );
}
