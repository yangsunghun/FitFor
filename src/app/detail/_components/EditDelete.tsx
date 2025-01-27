"use client";

import DeleteConfirm from "@/components/shared/DeleteConfirm";
import Dropdown from "@/components/ui/Dropdown";
import ModalItem from "@/components/ui/Modal";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import useModal from "@/lib/hooks/common/useModal";
import { toast } from "@/lib/utils/common/toast";
import { deletePost } from "@/lib/utils/post/deletePost";
import { DotsThreeVertical } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  postId: string;
};

const EditDelete = ({ postId }: Props) => {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  const handleDeletePost = async () => {
    const isDeleted = await deletePost(postId);

    if (isDeleted) {
      toast("삭제되었습니다.", "success");
      router.replace("/");
    } else {
      toast("삭제 중 오류가 발생했습니다.", "warning");
    }
  };

  return (
    <>
      <Dropdown trigger={<DotsThreeVertical size={isTabletOrSmaller ? 24 : 28} />} className="absolute right-0 top-3">
        <ul>
          <li className="w-full whitespace-nowrap py-2 text-left font-medium transition duration-300 tb:font-normal">
            <Link href={`/write/${postId}`}>수정하기</Link>
          </li>
          <li className="w-full whitespace-nowrap py-2 text-left font-medium text-primary-default transition duration-300 tb:font-normal">
            <button onClick={openModal}>삭제하기</button>
          </li>
        </ul>
      </Dropdown>
      <ModalItem isOpen={isOpen} onClose={closeModal}>
        <DeleteConfirm closeModal={closeModal} handleDeletePost={handleDeletePost} kind="게시물" />
      </ModalItem>
    </>
  );
};

export default EditDelete;
