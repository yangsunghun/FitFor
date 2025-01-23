import { Button } from "@/components/ui/Button";

type Props = {
  closeModal: () => void;
  handleDeletePost: () => Promise<void>;
};

const DeleteConfirm = ({ closeModal, handleDeletePost }: Props) => {
  return (
    <div className="flex w-[25.125rem] flex-col gap-4">
      <p className="text-title1 font-bold">정말 이 게시물을 삭제하시겠습니까?</p>
      <p className="break-keep text-subtitle font-medium text-text-03">삭제하신 게시물은 다시 되돌릴 수 없습니다.</p>
      <div className="flex w-full flex-row gap-3">
        <Button variant="whiteLine" size="lg" className="w-full" onClick={closeModal}>
          취소하기
        </Button>
        <Button size="lg" className="w-full" onClick={handleDeletePost}>
          삭제하기
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
