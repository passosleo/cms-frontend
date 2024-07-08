import { twMerge } from "tailwind-merge";
import { Button, ButtonProps } from "../ui/button";
import { CustomLoader } from "../CustomLoader";
import { When } from "../When";

type CustomButtonProps = ButtonProps & {
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
};

export function CustomButton({
  className,
  rightIcon,
  leftIcon,
  children,
  isLoading,
  ...props
}: CustomButtonProps) {
  return (
    <Button className={twMerge(className)} {...props}>
      <When condition={isLoading}>
        <CustomLoader className="text-white " />
      </When>
      <When condition={!isLoading}>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </When>
    </Button>
  );
}
