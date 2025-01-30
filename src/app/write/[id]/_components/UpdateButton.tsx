import { useRouter } from "next/navigation";

type UpdateButtonProps = {
  postId: string;
  onSubmit: () => void;
};

const UpdateButton = ({ postId, onSubmit }: UpdateButtonProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-center gap-6 pt-20">
      <button
        onClick={() => router.push(`/detail/${postId}`)}
        className="rounded-lg border border-primary-default bg-bg-01 px-8 py-4 text-body text-primary-default"
      >
        뒤로 가기
      </button>
      <button
        onClick={onSubmit}
        className="rounded-lg bg-primary-default px-8 py-4 text-body text-bg-01"
      >
        수정 완료
      </button>
    </div>
  );
};

export default UpdateButton;