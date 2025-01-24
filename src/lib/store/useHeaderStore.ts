import { create } from "zustand";

type HeaderState = {
  isVisible: boolean;
  showHeader: () => void;
  hideHeader: () => void;
};

export const useHeaderStore = create<HeaderState>((set) => ({
  isVisible: true,
  showHeader: () => set({ isVisible: true }),
  hideHeader: () => set({ isVisible: false })
}));
