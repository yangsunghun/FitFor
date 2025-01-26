"use client";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { cn } from "@/lib/utils/common/className";
import { Plus } from "@phosphor-icons/react";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-block w-[4.5rem] h-[4.5rem] rounded-full transition duration-300 fixed bottom-12 right-[6.875rem] tb:bottom-[80px] tb:right-[24px] tb:w-[40px] tb:h-[40px] flex justify-center items-center", // 공통 스타일
  {
    variants: {
      variant: {
        primary: "bg-primary-default !text-text-01 hover:bg-primary-light active:bg-primary-strong",
        primaryLine: "bg-white border border-primary-default !text-primary-default hover:bg-pink-50 active:bg-pink-100",
        disabled: "bg-bg-02 !text-text-01",
        disabledLine: "bg-bg-01 border border-line-02 !text-text-02",
        whiteLine: "bg-bg-01 border border-line-03 !text-text-04"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

export type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof buttonVariants>;

const FloatingButton = forwardRef<HTMLAnchorElement, ButtonProps>(({ className, variant, href, ...props }, ref) => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");
  return (
    <Link ref={ref} href={href || "#"} className={cn(buttonVariants({ variant }), className)} {...props}>
      {isTabletOrSmaller ? <Plus size={24} weight="bold" /> : <Plus size={48} />}
    </Link>
  );
});

FloatingButton.displayName = "FloatingButton";

export { buttonVariants, FloatingButton };
