import { useToastStore } from "@/lib/store/useToastStore";

export const toast = (message: string, type: "warning" | "success") => {
  const addToast = useToastStore.getState().addToast;
  addToast(message, type);
};
