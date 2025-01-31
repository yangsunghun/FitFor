import { useAuthStore } from "@/lib/store/authStore";
import { toast } from "@/lib/utils/common/toast";

type ToggleActionResult = {
  isActive: boolean;
  isPending: boolean;
  toggleAction: () => void;
  count?: number;
};

type UseToggleActionProps = {
  postId: string;
  actionHook: (postId: string, userId: string) => ToggleActionResult; // ✅ 타입을 일반 객체로 정의
  requireLoginMessage?: string;
};

export const useToggleAction = ({ postId, actionHook, requireLoginMessage }: UseToggleActionProps) => {
  const { user } = useAuthStore();
  const userId = user?.id;

  if (!userId) {
    return {
      isActive: false,
      isPending: false,
      count: null,
      handleClick: () => toast(requireLoginMessage || "로그인이 필요합니다", "warning")
    };
  }

  const { isActive, isPending, toggleAction, count } = actionHook(postId, userId);

  return {
    isActive,
    isPending,
    count,
    handleClick: toggleAction
  };
};
