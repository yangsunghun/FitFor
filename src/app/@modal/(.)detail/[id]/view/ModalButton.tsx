"use client";

import { useRouter } from "next/navigation";

type ModalButtonProps = {
  label: string;
  action: "navigate" | "close" | "refresh";
  path?: string;
};

const ModalButton: React.FC<ModalButtonProps> = ({ label, action, path }) => {
  const router = useRouter();

  const handleClick = () => {
    if (action === "navigate" && path) {
      router.push(path);
    } else if (action === "close") {
      router.back();
    } else if (action === "refresh") {
      window.location.reload();
    }
  };

  const baseClasses = "px-4 py-2 rounded-lg text-sm font-medium transition-all";
  const styles =
    action === "navigate" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-black hover:bg-gray-400";

  return (
    <button onClick={handleClick} className={`${baseClasses} ${styles}`}>
      {label}
    </button>
  );
};

export default ModalButton;
