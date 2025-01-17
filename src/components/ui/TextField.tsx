import { cn } from "@/lib/utils/common/className";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";

const textFieldVariants = cva(
  "inline-block rounded-[8px] font-medium transition duration-300 outline-none focus:ring-2 focus:ring-secondary-light", // 공통 스타일
  {
    variants: {
      variant: {
        default: "bg-bg-02 text-text-04 placeholder:text-text-02 border border-gray-50",
        warning:
          "bg-bg-02 text-warning placeholder:text-warning-light border focus:ring-status-warning border-status-warning",
        error: "bg-bg-02 text-error placeholder:text-error-light border focus:ring-status-danger border-status-danger",
        success:
          "bg-bg-02 text-success placeholder:text-success-light border focus:ring-status-success border-status-success"
      },
      version: {
        app: "text-caption h-11 p-2", // app
        desktop: "text-subtitle h-14 p-4" // desktop
      }
    },
    defaultVariants: {
      variant: "default",
      version: "app"
    }
  }
);

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof textFieldVariants> & {
    type?: string;
  };

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, variant, version, type, ...props }, ref) => {
    return (
      <input
        type={type || "text"}
        ref={ref}
        className={cn(textFieldVariants({ variant, version }), className)}
        {...props}
      />
    );
  }
);

TextField.displayName = "TextField";

export { TextField, textFieldVariants };
