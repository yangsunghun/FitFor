import { create } from "zustand";

type NavBarState = {
  isVisible: boolean;
  showNavBar: () => void;
  hideNavBar: () => void;
};

export const useNavBarStore = create<NavBarState>((set) => ({
  isVisible: true,
  showNavBar: () => set({ isVisible: true }),
  hideNavBar: () => set({ isVisible: false })
}));
