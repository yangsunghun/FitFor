import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears
} from "date-fns";

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

export const relativeTime = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const minutesDiff = differenceInMinutes(now, createdDate);
  const hoursDiff = differenceInHours(now, createdDate);
  const daysDiff = differenceInDays(now, createdDate);
  const monthsDiff = differenceInMonths(now, createdDate);
  const yearsDiff = differenceInYears(now, createdDate);

  if (minutesDiff < 1) return "방금 전";
  if (minutesDiff < 60) return `${minutesDiff}분 전`;
  if (hoursDiff < 24) return `${hoursDiff}시간 전`;
  // if (daysDiff < 30) return `${daysDiff}일 전`;
  // if (monthsDiff < 12) return `${monthsDiff}개월 전`;
  return createdDate.toLocaleDateString();
};
