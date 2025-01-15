// 최근 조회 목록 추가 함수
export const addRecentView = (postId: string) => {
  const maxItems = 8;

  // 현재 최근 조회 목록
  let recentViews = JSON.parse(localStorage.getItem("recentViews") || "[]");

  // 포스트가 이미 존재 하는 경우
  // 선 제거 후 추가
  recentViews = recentViews.filter((id: string) => id !== postId);

  // 새로 추가 (시간순)
  recentViews.unshift(postId);

  // 최근 8개 제한
  if (recentViews.length > maxItems) {
    recentViews.pop();
  }

  // local storage 다시 저장
  localStorage.setItem("recentViews", JSON.stringify(recentViews));
};
