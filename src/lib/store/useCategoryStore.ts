import { create } from "zustand";
import { persist } from "zustand/middleware";

type CategoryState = {
  selectedCategory: string | null; // 선택된 카테고리
  isHydrated: boolean; // 새로고침 시 상태 복원이 완료되었는지 확인
  setSelectedCategory: (category: string | null) => void; // 카테고리 설정 함수
};

const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      selectedCategory: null,
      isHydrated: false, // 초기값: 상태 복원 전
      setSelectedCategory: (category) => set({ selectedCategory: category }) // 카테고리 설정 함수
    }),
    {
      name: "selected-category",
      onRehydrateStorage: (state) => {
        if (state) {
          // 복원이 완료되었음을 설정
          state.isHydrated = true;
        }
      }
    }
  )
);

export default useCategoryStore;
