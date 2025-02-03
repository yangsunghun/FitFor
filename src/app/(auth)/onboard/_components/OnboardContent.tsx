"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useNavBarStore } from "@/lib/store/useNavBarStore";
import { useEffect } from "react";
import OnboardForm from "./OnboardForm";

const OnboardContent = () => {
  const { hideNavBar, showNavBar } = useNavBarStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && user.onboard) {
      window.location.href = "/home";
    }
    hideNavBar();
    return () => showNavBar();
  }, [hideNavBar, showNavBar, user]);

  return <OnboardForm />;
};

export default OnboardContent;
