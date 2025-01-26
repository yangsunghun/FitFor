import { useBookmarks } from "@/lib/hooks/bookmarks/useBookmark";
import { useAuthStore } from "@/lib/store/authStore";
import PostList from "./PostList";

const BookmarkList = () => {
  const { user } = useAuthStore();
  const userId = user?.id;

  const { ownBookmarks, isPending, isError, deleteBookmarks } = useBookmarks(userId || "");

  const handleDeleteBookmark = async (postId: string): Promise<void> => {
    await deleteBookmarks(postId);
  };

  return (
    <PostList
      title="북마크"
      posts={ownBookmarks || []}
      isPending={isPending}
      isError={isError}
      onDelete={handleDeleteBookmark}
      invalidateMessage="선택된 북마크가 삭제되었습니다."
      kind="북마크"
    />
  );
};

export default BookmarkList;
