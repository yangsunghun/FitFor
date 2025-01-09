"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { signOut } from "@/lib/utils/auth/auth";

const SignoutButton = () => {
  const handleSignout = async () => {
    await signOut();

    // zustand에서 null 처리
    useAuthStore.getState().setUser(null);

    // home으로 push
    window.location.href = "/";
  };

  return (
    <button className="m-4 rounded-xl border p-4" onClick={handleSignout}>
      Sign out
    </button>
  );
};

export default SignoutButton;
