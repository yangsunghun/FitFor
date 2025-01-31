import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useAuthStore } from "@/lib/store/authStore";

type AccountDeleteContentProps = {
  closeModal: () => void;
};

const AccountDeleteContent = ({ closeModal }: AccountDeleteContentProps) => {
  const { deleteUser } = useAuthStore();

  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");
  const handleDeleteAccount = async () => {
    deleteUser();
  };
  return (
    <div className="flex w-[25.125rem] flex-col gap-4 tb:max-w-[19.375rem]">
      <p className="text-title1 font-bold text-text-04 tb:text-title2">정말 핏포를 탈퇴하실 건가요?</p>
      <p className="break-keep text-subtitle font-medium text-text-03 tb:text-body">
        계정 탈퇴 후 회원정보 파기로 커뮤니티 혹은 작성했던 게시물과 댓글은 삭제 처리가 불가해요.
      </p>
      <div className="flex w-full flex-row gap-3 tb:gap-2">
        <Button variant="whiteLine" size={isTabletOrSmaller ? "sm" : "lg"} className="w-full" onClick={closeModal}>
          취소하기
        </Button>
        <Button size={isTabletOrSmaller ? "sm" : "lg"} className="w-full" onClick={handleDeleteAccount}>
          탈퇴하기
        </Button>
      </div>
    </div>
  );
};

export default AccountDeleteContent;
