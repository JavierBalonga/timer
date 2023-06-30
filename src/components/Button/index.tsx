import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: "filled" | "outlined";
}

export default function Button({
  children,
  className,
  variant = "outlined",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "flex items-center justify-center min-h-[45px] px-8 py-2 rounded-lg text-lg transition-colors",
        variant === "filled"
          ? "bg-violet-800 hover:bg-purple-600"
          : "bg-transparent border-2 border-purple-800 hover:bg-purple-600/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
