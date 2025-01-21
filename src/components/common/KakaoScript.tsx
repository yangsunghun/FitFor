"use client";
import Script from "next/script";

function KakaoScript() {
  // this for 카카오톡 공유
  const onLoad = () => {
    if (!window.Kakao) {
      console.error("Kakao SDK is not loaded.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_API_KEY);
      console.log("Kakao SDK initialized");
    }
  };

  return <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" onLoad={onLoad} />;
}

export default KakaoScript;
