export {};

declare global {
  interface Window {
    Kakao: any; //  Kakao 공유를 위한 타입 정의 (any로 임시 처리, 필요시 구체적인 타입 정의)
  }
}
