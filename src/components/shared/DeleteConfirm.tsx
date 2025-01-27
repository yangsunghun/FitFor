import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";

type Props = {
  closeModal: () => void;
  handleDeletePost: () => Promise<void>;
  kind: string;
};

const DeleteConfirm = ({ closeModal, handleDeletePost, kind }: Props) => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");
  return (
    <div className="flex w-[25.125rem] flex-col gap-4 tb:w-[343px] mb:w-[calc(91.45vw-48px)]">
      <p className="text-title1 font-bold tb:text-title2">{kind}를 삭제하시나요?</p>
      <p className="break-keep text-subtitle font-medium text-text-03 tb:text-body">
        {kind}에서 영구적으로 삭제돼요.
        <br />
        그래도 삭제하시겠어요?
      </p>
      <div className="flex w-full flex-row gap-3">
        <Button variant="whiteLine" size={isTabletOrSmaller ? "sm" : "lg"} className="w-full" onClick={closeModal}>
          취소하기
        </Button>
        <Button size={isTabletOrSmaller ? "sm" : "lg"} className="w-full" onClick={handleDeletePost}>
          삭제하기
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
