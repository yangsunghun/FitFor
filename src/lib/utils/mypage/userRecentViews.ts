// 유저의 최근 게시물 데이터 가져오는 로직
export const getRecentViews = () => {
  return JSON.parse(localStorage.getItem("recentViews") || "[]");
};

// 최근 본 게시물 초기화
export const clearRecentViews = () => {
  localStorage.removeItem("recentViews");
};
