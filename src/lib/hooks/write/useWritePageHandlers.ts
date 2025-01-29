import { useWritePageState } from "@/lib/hooks/write/useWritePageState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useWritePageHandlers = (pageState: ReturnType<typeof useWritePageState>) => {
  const router = useRouter();
  const { state, setState, handleTemporarySave, isWritingRef, popStateTriggered, navigationBlocked } = pageState;

  // 페이지 이동 처리 (Next.js의 router.push 포함)
  useEffect(() => {
    const originalPush = router.push; // 원래 push 함수 저장
    router.push = (url: string) => {
      if (isWritingRef.current && !navigationBlocked.current) {
        setState((prevState) => ({
          ...prevState,
          isExitModalOpen: true, // 모달 열기
          pendingNavigation: url // 이동하려는 경로 저장
        }));
        navigationBlocked.current = true; // 중복 방지
      } else {
        originalPush(url); // 바로 이동
      }
    };

    return () => {
      router.push = originalPush; // 원래 push 함수로 복원
    };
  }, [isWritingRef, router, setState]);

  // 뒤로가기 및 페이지 이탈 감지
  useEffect(() => {
    const handlePopState = () => {
      if (isWritingRef.current && !popStateTriggered.current) {
        popStateTriggered.current = true; // 중복 실행 방지
        setState((prevState) => ({
          ...prevState,
          isExitModalOpen: true,
          pendingNavigation: "BACK" // 뒤로 가기 플래그 설정
        }));
      }
    };

    window.history.pushState(null, "", window.location.href); // 추가: 최초 로딩 시 pushState 실행
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isWritingRef, router, setState]);

  // 모달 확인 클릭 시 (임시 저장 후 이동)
  const handleConfirmExit = async () => {
    await handleTemporarySave(); // 임시 저장 수행
    router.replace("/"); 
    if (state.pendingNavigation) {
      router.push(state.pendingNavigation); // 저장된 경로로 이동
    }
  };

  // 모달 취소 클릭 시 (뒤로가기 취소 & 지정된 경로로 이동)
  const handleCancelExit = () => {
    setState((prevState) => ({
      ...prevState,
      isExitModalOpen: false, // 모달 닫기
      pendingNavigation: null // 경로 초기화
    }));

    // "뒤로 가기"를 통해 모달이 떴다면 무조건 홈("/")으로 이동
    if (state.pendingNavigation === "BACK") {
      router.replace("/"); // 한 번만 실행되도록 즉시 홈으로 이동
    } else if (state.pendingNavigation) {
      router.push(state.pendingNavigation); // 저장된 경로로 이동
    }
  };

  return { handleConfirmExit, handleCancelExit };
};
