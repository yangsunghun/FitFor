"use client";
import { useToastStore } from "@/lib/store/useToastStore";
import { Check, ExclamationMark } from "@phosphor-icons/react";
import clsx from "clsx";

const Toast = () => {
  const toasts = useToastStore((state) => state.toasts); // 토스트 상태 구독
  const removeToast = useToastStore((state) => state.removeToast); // 수동 제거 함수

  return (
    <div className="fixed bottom-[5vh] left-1/2 z-50 -translate-x-1/2 transform space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="relative flex min-w-[320px] animate-fadeIn items-center justify-between overflow-hidden px-4 py-3 text-body text-white"
        >
          <div className="click-box -z-10 rounded-full bg-black bg-opacity-50"></div>
          <div className="flex items-center gap-2">
            <i
              className={clsx("flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full", {
                "bg-status-warning text-black": toast.type === "warning",
                "bg-status-success": toast.type === "success"
              })}
            >
              {toast.type === "warning" && <ExclamationMark size={14} weight="bold" />}
              {toast.type === "success" && <Check size={14} weight="bold" />}
            </i>
            <span>{toast.message}</span>
          </div>
          <button
            className="rounded-full bg-secondary-light px-2 py-1 text-caption"
            onClick={() => removeToast(toast.id)}
          >
            닫기
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
