import { useLikedPosts } from "@/lib/hooks/bookmarks/useLikedPosts";
import { useAuthStore } from "@/lib/store/authStore";
import PostList from "./PostList";

const LikedPostList = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { ownlikedPosts, isPending, isError, deleteLikedPosts } = useLikedPosts(userId || "");

  const handleDeleteLikedPost = async (postId: string): Promise<void> => {
    await deleteLikedPosts(postId);
  };

  return (
    <PostList
      title="좋아요한 게시물"
      posts={ownlikedPosts || []}
      isPending={isPending}
      isError={isError}
      onDelete={handleDeleteLikedPost}
      invalidateMessage="선택된 좋아요 게시물이 삭제되었습니다."
      kind="좋아요 게시물"
    />
  );
};

export default LikedPostList;
