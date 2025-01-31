"use client";

import ScrollTopButton from "@/components/shared/ScrollTopButton";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorScreen from "@/components/common/ErrorScreen";
import EditHeader from "./_components/EditHeader";
import UpdateButton from "./_components/UpdateButton";
import PostForm from "../_components/PostForm";
import { useEditPageState } from "@/lib/hooks/write/useEditPageState";

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
    <div className="mx-auto max-w-[700px] pb-20 pt-20">
      <EditHeader />
      <PostForm {...pageState} mode="edit" />
      <UpdateButton postId={id} onSubmit={() => pageState.handleUpdate(id)} />
      <ScrollTopButton />
    </div>
  );
};

export default EditPage;