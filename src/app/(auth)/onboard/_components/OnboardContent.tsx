"use client";

import { useNavBarStore } from "@/lib/store/useNavBarStore";
import { useEffect } from "react";
import OnboardForm from "./OnboardForm";

const OnboardContent = () => {
  const { hideNavBar, showNavBar } = useNavBarStore();

  useEffect(() => {
    hideNavBar();
    return () => showNavBar();
  }, [hideNavBar, showNavBar]);

  return <OnboardForm />;
};

export default OnboardContent;
