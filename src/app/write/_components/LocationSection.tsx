import { Button } from "@/components/ui/Button";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { CaretRight, MagnifyingGlass } from "@phosphor-icons/react";

type LocationSectionProps = {
  address: string;
  onOpenModal: () => void;
};

const LocationSection = ({ address, onOpenModal }: LocationSectionProps) => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  return(
    <>
    {isTabletOrSmaller ? (
      <div
        className="flex cursor-pointer items-center justify-between py-4"
        onClick={onOpenModal}
      >
        <div className="flex flex-col gap-1">
          <span className="font-medium text-text-04">위치 찾기</span>
          <span
            className={`text-caption font-medium ${
              address ? "text-primary-default" : "text-text-03"
            }`}
          >
            {address ? address : "현재 위치를 입력해 주세요."}
          </span>
        </div>
        <CaretRight size={20} className="text-text-03" />
      </div>
    ) : (
  <div className="space-y-4 pt-10">
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <span className="text-title2 font-bold text-text-04">위치 찾기</span>
      </div>
      <div className="flex h-14 items-center rounded-lg bg-bg-02 p-4">
        <MagnifyingGlass size={24} className="text-text-02" />
        <input
          type="text"
          value={address}
          onClick={onOpenModal}
          readOnly
          className={`flex-1 cursor-pointer rounded-lg bg-transparent px-4 py-2 placeholder:text-text-03 focus:outline-none ${
            address ? "text-text-04" : "text-text-02"
          }`}
          placeholder="주소를 입력해주세요."
        />
      </div>
    </div>
    <Button variant="primary" size="lg" onClick={onOpenModal} className="w-full text-subtitle">
      검색
    </Button>
  </div>
  )}
  </>
  );
};

export default LocationSection;