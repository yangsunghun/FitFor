import { create } from "zustand";
import { persist } from "zustand/middleware";

// 레이아웃 상태
type LayoutState = {
  isMasonry: boolean;
  toggleLayout: () => void;
};

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      isMasonry: false,
      toggleLayout: () => set((state) => ({ isMasonry: !state.isMasonry }))
    }),
    {
      name: "layout-storage"
    }
  )
);
