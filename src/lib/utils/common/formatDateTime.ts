export const formatDate = (dateInput: string | Date): string => {
  const date = new Date(dateInput);

  // 날짜 포맷 지정
  return date
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
    .replace(/\.$/, "") // 마지막 .제거
    .replace(/\s/g, ""); // 공백 제거
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  const formattedDate = formatDate(date);

  // 시간 부분
  const timeParts = date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
    .split(" ");
  const formattedTime = `${timeParts[1]} ${timeParts[0]}`;

  return `${formattedDate} ${formattedTime}`;
};
