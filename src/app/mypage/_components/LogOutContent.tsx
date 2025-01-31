import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useAuthStore } from "@/lib/store/authStore";
import { signOut } from "@/lib/utils/auth/auth";

type LogOutContentProps = {
  closeModal: () => void;
};

const LogOutContent = ({ closeModal }: LogOutContentProps) => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  const handleLogOut = async () => {
    await signOut();

    // zustand에서 null 처리
    useAuthStore.getState().setUser(null);

    // home으로 push
    window.location.href = "/";
  };

  return (
    <div className="flex w-[25.125rem] flex-col gap-4 tb:max-w-[19.375rem]">
      <h3 className="text-title1 font-bold text-text-04 tb:text-title2">로그아웃 하시겠어요?</h3>
      <p className="w-full text-subtitle font-medium text-text-03 tb:text-body">언제든지 다시 로그인하실 수 있어요.</p>
      <div className="flex w-full flex-row gap-3 tb:gap-2">
        <Button variant="whiteLine" size={isTabletOrSmaller ? "sm" : "lg"} className="w-full" onClick={closeModal}>
          취소하기
        </Button>
        <Button size={isTabletOrSmaller ? "sm" : "lg"} className="w-full" onClick={handleLogOut}>
          로그아웃하기
        </Button>
      </div>
    </div>
  );
};

export default LogOutContent;
