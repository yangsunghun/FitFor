import { VERIFICATION_THRESHOLD } from "@/lib/constants/constants";

export const verifyUser = ({ postNum, likes, views }: { postNum: number; likes: number; views: number }) => {
  return postNum >= VERIFICATION_THRESHOLD && likes >= VERIFICATION_THRESHOLD && views >= VERIFICATION_THRESHOLD;
};
