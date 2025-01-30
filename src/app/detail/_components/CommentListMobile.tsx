"use client";

import ProfileImageCircle from "@/components/shared/ProfileImageCircle";
import { useComment } from "@/lib/hooks/detail/useComment";

type CommentSectionProps = {
  postId: string;
};

const CommentListMobile = ({ postId }: CommentSectionProps) => {
  const { comments, isPending } = useComment(postId);

  if (isPending) {
    return;
  }

  return (
    <>
      <ul className="mt-2">
        {comments?.slice(0, 1).map((comment) => (
          <li key={comment.id} className="flex h-[40px] w-full items-center justify-between">
            <div className="flex w-[94px] items-center justify-between">
              <figure className="relative">
                <ProfileImageCircle
                  profileImage={comment.users.profile_image}
                  nickname={comment.users.nickname}
                  size={24}
                  className="h-[24px] w-[24px]"
                />
              </figure>
              <p className="ellip1 w-[calc(100%-32px)] text-body font-medium">{comment.users.nickname}</p>
            </div>
            <p className="ellip1 w-[calc(100%-110px)] text-body">{comment.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentListMobile;
