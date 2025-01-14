import { cn } from "@/lib/utils/common/className";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const tagVariants = cva(
  "inline-block px-3 rounded-[8px] font-medium", // 공통 스타일
  {
    variants: {
      variant: {
        primary: "bg-primary-default !text-text-01",
        black: "bg-text-04 !text-text-01",
        gray: "bg-bg-02 !text-text-03",
        grayLine: "bg-bg-01 border border-line-02 !text-text-03"
      },
      size: {
        md: "h-9 leading-9 text-body",
        sm: "h-7 leading-7 text-caption"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export type TagsProps = VariantProps<typeof tagVariants> & {
  className?: string;
  label: string;
};

const Tags = React.forwardRef<HTMLSpanElement, TagsProps>(({ className, variant, size, label }, ref) => {
  return (
    <span ref={ref} className={cn(tagVariants({ variant, size }), className)}>
      {label}
    </span>
  );
});

Tags.displayName = "Tags";

export { Tags, tagVariants };