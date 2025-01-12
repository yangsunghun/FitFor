"use client";

import { incrementViewCount } from "@/lib/utils/detail/incrementViewCount";
import { useEffect } from "react";

type ViewCounterProps = {
  postId: string;
};

const ViewCounter = ({ postId }: ViewCounterProps) => {
  useEffect(() => {
    incrementViewCount(postId).catch((err) => console.error("조회수 증가 실패:", err));
  }, [postId]);

  return null;
};

export default ViewCounter;
