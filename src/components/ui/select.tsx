import * as React from "react";

import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        className={cn(
          "flex  h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:border-purple-600 hover:border-purple-500  ring-opacity-30 ring-purple-300 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-green-300 dark:focus:ring-offset-green-900",
          className
        )}
      >
        {options.map((option: string, index: number) => {
          return <option key={index}>{option}</option>;
        })}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Select };
