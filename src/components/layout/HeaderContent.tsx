"use client";

import { useUser } from "@/lib/hooks/auth/useUser";

const HeaderContent = () => {
  useUser();

  return <p>HeaderContent</p>;
};

export default HeaderContent;
