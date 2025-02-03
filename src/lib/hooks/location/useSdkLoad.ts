import { useEffect } from "react";

const useSdkLoad = (setIsSdkLoaded: (loaded: boolean) => void) => {
  useEffect(() => {
    // 서버 사이드 렌더링 방지
    if (typeof window === "undefined") return;

    // 만약 이미 kakao 객체가 존재한다면 바로 초기화
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        setIsSdkLoaded(true);
      });
      return;
    }

    // 스크립트 태그 생성 (여기서 &libraries=services 를 추가합니다)
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_SHARE_API_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        // autoload=false인 경우 반드시 load()를 호출해야 합니다.
        window.kakao.maps.load(() => {
          setIsSdkLoaded(true);
        });
      } else {
        console.error("Kakao Maps SDK가 제대로 로드되지 않았습니다.");
      }
    };
    script.onerror = () => {
      console.error("Kakao Maps SDK 스크립트 로드에 실패했습니다.");
    };
    document.head.appendChild(script);
  }, [setIsSdkLoaded]);
};

export default useSdkLoad;
