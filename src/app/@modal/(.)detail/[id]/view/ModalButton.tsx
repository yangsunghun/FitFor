"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type ModalButtonProps = {
  label: string;
  action: "navigate" | "close" | "refresh";
  path?: string;
};

const ModalButton = ({ label, action, path }: ModalButtonProps) => {
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

  const styles = action !== "close" ? "primary" : "secondary";

  return (
    <Button onClick={handleClick} variant={`${styles}`} size="sm">
      {label}
    </Button>
  );
};

export default ModalButton;
