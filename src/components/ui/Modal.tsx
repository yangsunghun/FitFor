import clsx from "clsx";
import { useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  mode?: "default" | "imageView";
};

const ModalItem = ({ isOpen, onClose, children, mode = "default" }: Props) => {
  const bodyRef = useRef(document.body);

  useEffect(() => {
    if (isOpen && bodyRef.current) {
      bodyRef.current.style.overflow = "hidden";
    } else if (bodyRef.current) {
      bodyRef.current.style.overflow = "";
    }

    return () => {
      if (bodyRef.current) {
        bodyRef.current.style.overflow = "";
      }
    };
  }, [isOpen]);
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={clsx("fixed inset-0 z-50 flex items-center justify-center bg-black", {
        "bg-opacity-50": mode === "default",
        "image-modal": mode === "imageView"
      })}
      onClick={handleOverlayClick}
    >
      <div
        className={clsx("relative rounded-lg shadow-lg", {
          "h-fit w-[90%] max-w-lg bg-bg-01 p-6": mode === "default",
          "h-full w-full max-w-none bg-transparent": mode === "imageView"
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalItem;
