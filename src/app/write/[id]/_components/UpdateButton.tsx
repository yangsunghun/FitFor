import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type UpdateButtonProps = {
  postId: string;
  onSubmit: () => void;
};

const UpdateButton = ({ postId, onSubmit }: UpdateButtonProps) => {
  const router = useRouter();

  return (
    <>
      <Tablet>
        <div className="flex justify-center gap-6 pt-[110px] px-4">
          <Button variant="primary" size="lg" onClick={onSubmit} className="w-full">
            수정하기
          </Button>
        </div>
      </Tablet>
      <MinTablet>
        <div className="flex justify-center gap-6 pt-20">
          <Button
            variant="primaryLine"
            size="lg"
            onClick={() => router.push(`/detail/${postId}`)}
            className="w-[180px]"
          >
            뒤로가기
          </Button>
          <Button variant="primary" size="lg" onClick={onSubmit} className="w-[180px]">
            수정하기
          </Button>
        </div>
      </MinTablet>
    </>
  );
};

export default UpdateButton;
