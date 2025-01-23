"use client";

import Dropdown from "@/components/ui/Dropdown";
import ModalItem from "@/components/ui/Modal";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import useModal from "@/lib/hooks/common/useModal";
import { deletePost } from "@/lib/utils/post/deletePost";
import { DotsThreeVertical } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteConfirm from "./DeleteConfirm";

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
      alert("삭제되었습니다."); //alert 는 전부 토스트로 교체체
      router.replace("/");
    } else {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Dropdown trigger={<DotsThreeVertical size={isTabletOrSmaller ? 24 : 28} />} className="absolute right-0 top-3">
        <ul>
          <li className="w-full whitespace-nowrap py-2 text-left font-medium transition duration-300 hover:text-primary-default">
            <Link href={`/write/${postId}`}>수정하기</Link>
          </li>
          <li className="w-full whitespace-nowrap py-2 text-left font-medium transition duration-300 hover:text-primary-default">
            <button onClick={openModal}>삭제하기</button>
          </li>
        </ul>
      </Dropdown>
      <ModalItem isOpen={isOpen} onClose={closeModal}>
        <DeleteConfirm closeModal={closeModal} handleDeletePost={handleDeletePost} />
      </ModalItem>
    </>
  );
};

export default EditDelete;
