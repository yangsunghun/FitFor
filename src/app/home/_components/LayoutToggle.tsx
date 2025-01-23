import logoImage from "@/assets/images/logo.svg";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { ListBullets, Rows, SquaresFour } from "@phosphor-icons/react";
import clsx from "clsx";
import Image from "next/image";

type LayoutToggleProps = {
  isMasonry: boolean;
  onToggle: () => void;
};

const LayoutToggle = ({ isMasonry, onToggle }: LayoutToggleProps) => {
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  return (
    <div className="mb-10 flex items-center justify-end tb:my-[24px] tb:h-[40px] tb:justify-between">
      <h1 className="hidden tb:block">
        <Image src={logoImage} alt="FitFor" width={80} height={20} />
      </h1>
      <div className="flex gap-2 tb:gap-1">
        <button
          onClick={isMasonry ? onToggle : undefined}
          className={clsx(
            "flex h-12 w-12 items-center justify-center transition-colors duration-300",
            "tb:h-[40px] tb:w-[40px]",
            {
              "text-text-04 tb:text-primary-default": !isMasonry,
              "text-text-02": isMasonry
            }
          )}
          disabled={!isMasonry}
          aria-pressed={!isMasonry}
          aria-label="리스트 레이아웃"
        >
          {isTabletOrSmaller ? <SquaresFour size={24} weight="fill" /> : <SquaresFour size={32} />}
        </button>
        <button
          onClick={isMasonry ? undefined : onToggle}
          className={clsx(
            "flex h-12 w-12 items-center justify-center transition-colors duration-300",
            "tb:h-[40px] tb:w-[40px]",
            {
              "text-text-04 tb:text-primary-default": isMasonry,
              "text-text-02": !isMasonry
            }
          )}
          disabled={isMasonry}
          aria-pressed={isMasonry}
          aria-label="isMasonry 레이아웃"
        >
          {isTabletOrSmaller ? <Rows size={24} weight="fill" /> : <ListBullets size={32} />}
        </button>
      </div>
    </div>
  );
};

export default LayoutToggle;
