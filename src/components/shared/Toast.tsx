"use client";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useToastStore } from "@/lib/store/useToastStore";
import { Check, ExclamationMark, X } from "@phosphor-icons/react";
import clsx from "clsx";

const Toast = () => {
  const toasts = useToastStore((state) => state.toasts); // 토스트 상태 구독
  const removeToast = useToastStore((state) => state.removeToast); // 수동 제거 함수
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  return (
    <div className="fixed bottom-[5vh] left-1/2 z-50 -translate-x-1/2 transform space-y-2">
      {toasts.slice(0, 5).map((toast) => (
        <div
          key={toast.id}
          className="relative flex min-h-[52px] min-w-[400px] animate-fadeIn items-center justify-between gap-2 overflow-hidden px-14 text-body text-white tb:min-h-[48px] tb:min-w-[330px] tb:px-12"
        >
          <div className="click-box -z-10 rounded-full bg-black bg-opacity-40"></div>
          <i
            className={clsx(
              "absolute left-4 flex aspect-square w-7 flex-shrink-0 items-center justify-center rounded-full tb:w-5",
              {
                "bg-status-warning text-black": toast.type === "warning",
                "bg-status-success": toast.type === "success"
              }
            )}
          >
            {toast.type === "warning" && <ExclamationMark size={isTabletOrSmaller ? 14 : 16} weight="bold" />}
            {toast.type === "success" && <Check size={isTabletOrSmaller ? 14 : 16} weight="bold" />}
          </i>
          <p className="py-3 md:whitespace-nowrap mb:text-caption">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="absolute right-4">
            <X size={20} weight="bold" className="text-text-03" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
