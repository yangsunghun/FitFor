 import { cn } from "@/lib/utils/common/className";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  "inline-block rounded-[8px] font-medium transition duration-300", // 공통 스타일
  {
    variants: {
      variant: {
        primary: "bg-primary-default !text-black-50 hover:bg-primary-light active:bg-primary-strong",
        secondary: "bg-secondary-default !text-text-01 hover:bg-secondary-light",
        primaryLine: "bg-white border border-primary-default !text-primary-default hover:bg-pink-50 active:bg-pink-100",
        disabled: "bg-bg-02 !text-text-02",
        disabledLine: "bg-bg-01 border border-line-02 !text-text-02",
        whiteLine: "bg-bg-01 border border-line-03 !text-secondary-default",
        grayLine: "bg-bg-02 border border-line-03 !text-secondary-default"
      },
      size: {
        lg: "h-14 leading-[3.5rem] px-6 text-subtitle",
        md: "h-12 leading-[3rem] px-5 text-title2",
        sm: "h-11 leading-[2.75rem] px-4 text-body"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant, size, onClick, ...props }, ref) => {
    const Container = asChild ? Slot : "button";
    return (
      <Container ref={ref} className={cn(buttonVariants({ variant, size }), className)} onClick={onClick} {...props} />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
