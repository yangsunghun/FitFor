import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import { Button } from "@/components/ui/Button";

type SubmitButtonProps = {
  onSubmit: () => void;
  missingFields: string[];
};

const SubmitButton = ({ onSubmit, missingFields }: SubmitButtonProps) => {
  const isDisabled = missingFields.length > 0;

  return (
    <>
      <Tablet>
        <div className="flex justify-center gap-6 px-6 pt-[110px] mb:px-4">
          <Button
            variant={isDisabled ? "disabled" : "primary"}
            size="lg"
            onClick={onSubmit}
            disabled={isDisabled}
            className="w-full"
          >
            등록하기
          </Button>
        </div>
      </Tablet>
      <MinTablet>
        <div className="flex justify-center gap-6 pt-20 tb:px-6 tb:pt-[110px] mb:px-4">
          <Button variant="primary" size="lg" onClick={onSubmit} className="w-[180px] tb:w-full">
            등록하기
          </Button>
        </div>
      </MinTablet>
    </>
  );
};

export default SubmitButton;
