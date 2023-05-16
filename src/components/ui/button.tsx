import { VariantProps, cva } from "class-variance-authority";
import React, { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";
export const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 ring-purple-300 ring-offset-2 disabled:opacity-50 dark:focus:ring-purple-400 disabled:pointer-events-none dark:focus:ring-offset-purple-900",
  {
    variants: {
      variant: {
        default:
          "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-600 dark:text-slate-100 dark:hover:bg-purple-500",
        outline:
          "bg-slate-900 text-white hover:bg-slate-900 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100 border border-slate-200 hoverLbg-slate-100 dark:border-slate-700",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 data-[state-open]:bg-transparent",
        link: "bg-transparent  hover:bg-purple-100 dark:bg-transparent underline-offsert-4 hover:underline text-slate-900 dark:text-slate-100  ",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 py-2 px-4 rounded-md",
        lg: "h-11 py-2 px-4 rounded-md",
        xl: "h-11 py-2 px-8 rounded-md",
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    },
  }
);

interface Props
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ isLoading, className, children, variant, size, ...props }: Props, ref) => {
    return (
      <button
        {...props}
        disabled={isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
