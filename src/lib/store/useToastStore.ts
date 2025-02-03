import { create } from "zustand";

type Toast = {
  id: string; // 고유 ID
  message: string; // 메시지 텍스트
  type: "warning" | "success"; // 메시지 타입
};

type ToastStore = {
  toasts: Toast[];
  addToast: (message: string, type: "warning" | "success") => void; // 메시지 + 타입 추가
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type) => {
    const id = crypto.randomUUID(); // 고유 ID 생성
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }]
    }));

    // setTimeout(() => {
    //   set((state) => ({
    //     toasts: state.toasts.filter((toast) => toast.id !== id)
    //   }));
    // }, 3000);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }));
  }
}));
