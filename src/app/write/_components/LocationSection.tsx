import { MagnifyingGlass } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';

interface LocationSectionProps {
  address: string;
  onOpenModal: () => void;
}

const LocationSection = ({ address, onOpenModal }: LocationSectionProps) => (
  <div className="space-y-4 pt-10">
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <span className="text-title2 font-bold text-text-04">위치 찾기</span>
        <span className="text-title2 font-bold text-primary-default">*</span>
      </div>
      <div className="h-14 p-4 bg-bg-02 rounded-lg flex items-center">
        <MagnifyingGlass size={24} className="text-text-02" />
        <input
          type="text"
          value={address}
          readOnly
          className="flex-1 px-4 py-2 rounded-lg text-text-03 bg-transparent placeholder:text-text-03"
          placeholder="주소를 입력해주세요."
        />
      </div>
    </div>
    <Button
      variant="secondary"
      size="lg"
      onClick={onOpenModal}
      className="w-full text-[18px]"
    >
      검색
    </Button>
  </div>
);

export default LocationSection;