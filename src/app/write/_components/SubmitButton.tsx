import { Button } from "@/components/ui/Button";

interface SubmitButtonProps {
  onSubmit: () => void;
}

const SubmitButton = ({ onSubmit }: SubmitButtonProps) => {
  return (
    <div className="flex justify-center gap-6 pt-20">
      <Button variant="primary" size="lg" onClick={onSubmit} className="w-[180px]">
        등록하기
      </Button>
    </div>
  );
};

export default SubmitButton;