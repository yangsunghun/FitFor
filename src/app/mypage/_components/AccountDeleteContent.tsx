import { Button } from "@/components/ui/Button";

type AccountDeleteContentProps = {
  closeModal: () => void;
  handleDeleteAccount: () => Promise<void>;
};

const AccountDeleteContent = ({ closeModal, handleDeleteAccount }: AccountDeleteContentProps) => {
  return (
    <div className="flex w-[25.125rem] flex-col gap-4">
      <p className="text-title1 font-bold">정말 핏포를 탈퇴하실 건가요?</p>
      <p className="break-keep text-subtitle font-medium text-text-03">
        계정 탈퇴 후 회원정보 파기로 커뮤니티 혹은 작성했던 게시물과 댓글은 삭제 처리가 불가해요.
      </p>
      <div className="flex w-full flex-row gap-3">
        <Button variant="whiteLine" size="lg" className="w-full" onClick={closeModal}>
          취소하기
        </Button>
        <Button size="lg" className="w-full" onClick={handleDeleteAccount}>
          탈퇴하기
        </Button>
      </div>
    </div>
  );
};

export default AccountDeleteContent;
