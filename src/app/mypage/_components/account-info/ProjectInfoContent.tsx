import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";

type ProjectInfoContent = {
  closeModal: () => void;
};
const ProjectInfoContent = ({ closeModal }: ProjectInfoContent) => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex max-h-[550px] w-[25.125rem] flex-col items-center gap-4 tb:max-w-[19.375rem]">
      <a href="https://github.com/yangsunghun/FitFor" className="flex flex-col w-full h-[30px] items-center bg-p">
        <div className="bg-[url(/images/responsive-innovators.png)] w-full h-full bg-no-repeat bg-center"></div>
      </a>

      <p className="text-body font-medium tb:text-caption">© Copyright 2025 FitFor. All rights reserved </p>

      <div className="flex w-full flex-row gap-3">
        <Button variant="whiteLine" size={isTabletOrSmaller ? "sm" : "md"} className="w-full" onClick={closeModal}>
          확인했습니다.
        </Button>
      </div>
    </div>
  );
};

export default ProjectInfoContent;
