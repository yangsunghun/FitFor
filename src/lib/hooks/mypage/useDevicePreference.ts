import { useState } from "react";

// 선호 기기 버전 변경 및 상태 가져오는 훅
const useDevicePreference = () => {
  // 저장되어있는 디바이스 설정이 있다면 가져오기
  const [deviceMode, setDeviceMode] = useState<"mobile" | "pc">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("deviceMode") as "mobile" | "pc") || "mobile";
    }
    return "mobile";
  });

  const toggleDeviceMode = () => {
    // 바뀔때마다 local storage에 저장
    setDeviceMode((prev) => {
      const newMode = prev === "mobile" ? "pc" : "mobile";
      localStorage.setItem("deviceMode", newMode);
      return newMode;
    });
  };

  return { deviceMode, toggleDeviceMode };
};

export default useDevicePreference;
