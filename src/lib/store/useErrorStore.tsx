import { create } from "zustand";

export const useErrorStore = create<{
  error: Error | null; // 현재 에러 상태
  setError: (error: Error | null) => void; // 에러 상태 설정
}>((set) => ({
  error: null,
  setError: (error) => set({ error }) // 에러 업데이트
}));
