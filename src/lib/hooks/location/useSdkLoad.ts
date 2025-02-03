import { Dispatch, SetStateAction, useEffect } from "react";

const useSdkLoad = (setIsSdkLoaded: Dispatch<SetStateAction<boolean>>) => {
  useEffect(() => {
    const checkSdkLoaded = () => {
      if (window.kakao && window.kakao.maps) {
        setIsSdkLoaded(true);
      }
    };
    const interval = setInterval(checkSdkLoaded, 100);
    return () => clearInterval(interval);
  });
};
export default useSdkLoad;
