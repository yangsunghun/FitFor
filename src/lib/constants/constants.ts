export const POSTS_PER_PAGE = 8; // 페이지 당 게시물 개수

export const VERIFICATION_THRESHOLD = 500; // 인증 유저 조건

// 태그 그룹 정의
export const TAG_GROUPS = [
  { key: "gender", title: "성별", tags: ["남성", "여성", "성별무관"], max: 1 },
  { key: "season", title: "계절", tags: ["봄", "여름", "가을", "겨울"], max: 2 },
  {
    key: "style",
    title: "스타일",
    tags: [
      "캐주얼",
      "스트릿",
      "걸리시",
      "미니멀",
      "스포티",
      "시크",
      "시티보이",
      "로맨틱",
      "고프코어",
      "워크웨어",
      "레트로",
      "클래식",
      "프레피",
      "에스닉",
      "리조트",
      "드뮤어"
    ],
    max: 7
  },
  {
    key: "tpo",
    title: "TPO",
    tags: [
      "데일리",
      "데이트",
      "캠퍼스",
      "여행",
      "캠핑",
      "카페",
      "피크닉",
      "페스티벌",
      "바다",
      "러닝",
      "헬스",
      "등산",
      "요가",
      "소개팅",
      "출근",
      "결혼식",
      "면접",
      "상견례",
      "등교"
    ],
    max: 7
  }
];

export const REGIONS = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "경기도",
  "충청도",
  "전라도",
  "경상도",
  "제주특별자치도",
  "강원도"
];

export const REGIONS_WITH_QUERY = REGIONS.map((region) => {
  const regionCoordinates: Record<string, { lat: number; lng: number }> = {
    서울특별시: { lat: 37.5665, lng: 126.978 },
    부산광역시: { lat: 35.1796, lng: 129.0756 },
    대구광역시: { lat: 35.8714, lng: 128.6014 },
    인천광역시: { lat: 37.4563, lng: 126.7052 },
    광주광역시: { lat: 35.1595, lng: 126.8526 },
    대전광역시: { lat: 36.3504, lng: 127.3845 },
    울산광역시: { lat: 35.5384, lng: 129.3114 },
    경기도: { lat: 37.4138, lng: 127.0183 },
    충청도: { lat: 36.6359, lng: 127.4913 },
    전라도: { lat: 35.7175, lng: 127.153 },
    경상도: { lat: 36.4919, lng: 128.8889 },
    제주특별자치도: { lat: 33.4996, lng: 126.5312 },
    강원도: { lat: 37.8228, lng: 128.1555 }
  };

  return {
    title: region,
    query: region.slice(0, 2), // 지역명 앞 두 글자
    lat: regionCoordinates[region]?.lat || 0, // 지역 중심 좌표 (없으면 0)
    lng: regionCoordinates[region]?.lng || 0
  };
});

export const MYPAGE_MENU = ["내 게시물", "히스토리", "인증", "계정 관리"];
