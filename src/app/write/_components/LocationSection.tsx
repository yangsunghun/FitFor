import { Button } from "@/components/ui/Button";
import { MagnifyingGlass } from "@phosphor-icons/react";

type LocationSectionProps = {
  address: string;
  onOpenModal: () => void;
};

const LocationSection = ({ address, onOpenModal }: LocationSectionProps) => (
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
          className="flex-1 cursor-pointer rounded-lg bg-transparent px-4 py-2 text-text-03 placeholder:text-text-03 focus:outline-none"
          placeholder="주소를 입력해주세요."
        />
      </div>
    </div>
    <Button variant="secondary" size="lg" onClick={onOpenModal} className="w-full text-subtitle">
      검색
    </Button>
  </div>
);

export default LocationSection;
