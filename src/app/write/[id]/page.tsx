"use client";

import ErrorScreen from "@/components/common/ErrorScreen";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ScrollTopButton from "@/components/shared/ScrollTopButton";
import { useEditPageState } from "@/lib/hooks/write/useEditPageState";
import PostForm from "../_components/PostForm";
import PostHeader from "../_components/PostHeader";
import ExitOrContinueModal from "./_components/ExitOrContinueModal";
import UpdateButton from "./_components/UpdateButton";

type EditPageProps = {
  params: { id: string };
};

const EditPage = ({ params: { id } }: EditPageProps) => {
  const pageState = useEditPageState(id);

  if (pageState.isPending) return <LoadingSpinner />;
  if (pageState.isError) {
    return <ErrorScreen error={new Error("게시물을 불러오는 데 문제가 발생했습니다.")} />;
  }

  return (
    <div className="mx-auto max-w-[700px] pb-20 pt-20 tb:pt-10 mb:pt-4">
      <PostHeader mode="edit" postId={id} handleBack={pageState.handleBack} />
      <PostForm {...pageState} mode="edit" />
      <UpdateButton postId={id} onSubmit={() => pageState.handleUpdate(id)} />
      <ScrollTopButton />
      <ExitOrContinueModal
        isOpen={pageState.isExitModalOpen}
        onClose={() => pageState.setIsExitModalOpen(false)}
        postId={pageState.formState.postId}
      />
    </div>
  );
};

export default EditPage;
