"use client";

import { Button } from "@/components/ui/Button";
import ModalItem from "@/components/ui/Modal";
import { useRouter } from "next/navigation";

type ExitOrContinueModalProps = {
  isOpen: boolean;
  postId: string; // 게시글 ID (나가기 시 상세페이지로 이동)
  onClose: () => void; // 모달 닫기 핸들러 (이어 작성하기 용)
};

const ExitOrContinueModal = ({ isOpen, postId, onClose }: ExitOrContinueModalProps) => {
  const router = useRouter();

  // "나가기" 버튼 클릭 시 상세 페이지로 이동
  const handleExit = () => {
    router.push(`/detail/${postId}`);
  };

  if (!isOpen) return null; // 모달이 열려있지 않으면 렌더링하지 않음

  return (
    <ModalItem
      isOpen={isOpen}
      onClose={() => {}} // 모달 외부 클릭 시 아무런 동작도 하지 않도록 빈 함수 전달
      className="flex w-full max-w-[450px] flex-col items-start justify-start gap-4 !rounded-2xl p-6 mb:max-w-[343px] mb:gap-2 mb:px-4"
    >
      <span className="self-stretch text-title1 font-bold text-text-04 mb:text-title2">
        수정하지 않고 나가시겠어요?
      </span>
      <p className="self-stretch text-subtitle text-text-03 mb:text-body">
        페이지를 떠나시면 변경된 내용이 모두 사라져요.
      </p>
      <div className="flex flex-nowrap items-center justify-start gap-3 self-stretch pt-2 mb:gap-2 mb:pt-2">
        <Button
          variant="disabled"
          size="lg"
          onClick={handleExit}
          className="flex w-full items-center justify-center px-6 py-4 tb:w-[195px] mb:w-[151px] mb:px-4 mb:py-3"
        >
          <span className="text-subtitle font-medium leading-[30px] text-text-04 tb:text-title2 mb:text-body">
            나가기
          </span>
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={onClose}
          className="flex w-full items-center justify-center px-6 py-4 tb:w-[195px] mb:w-[151px] mb:px-4 mb:py-3"
        >
          <span className="text-subtitle font-medium text-text-01 tb:text-title2 mb:text-body">이어 작성하기</span>
        </Button>
      </div>
    </ModalItem>
  );
};

export default ExitOrContinueModal;
