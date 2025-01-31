import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

type Props = {
  pageName: string;
  action: "navigate" | "back";
  path?: string;
};

const MobileHeader = ({ pageName, action, path }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (action === "navigate" && path) {
      router.push(path);
    } else if (action === "back") {
      router.back();
    }
  };

  return (
    <div className="fixed left-0 top-0 z-30 w-full bg-bg-01">
      <div className="inner flex h-[60px] items-center gap-2">
        <button onClick={handleClick}>
          <CaretLeft className="" size={24} weight="bold" />
        </button>
        <h2 className="text-title2 font-medium">{pageName}</h2>
      </div>
    </div>
  );
};

export default MobileHeader;
