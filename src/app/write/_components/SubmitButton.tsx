import { Button } from "@/components/ui/Button";

type SubmitButtonProps = {
  onSubmit: () => void;
}

const SubmitButton = ({ onSubmit }: SubmitButtonProps) => {
  return (
    <div className="flex justify-center gap-6 pt-20 mb:px-4">
      <Button variant="primary" size="lg" onClick={onSubmit} className="w-[180px] tb:w-full">
        등록하기
      </Button>
    </div>
  );
};

export default SubmitButton;
