"use client";

import Dropdown from "@/components/ui/Dropdown";
import { deletePost } from "@/lib/utils/post/deletePost";
import { DotsThreeVertical } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  postId: string;
};

const EditDelete = ({ postId }: Props) => {
  const router = useRouter();

  const handleDeletePost = async () => {
    const userConfirmed = window.confirm("정말 이 게시물을 삭제하시겠습니까?");
    if (userConfirmed) {
      const isDeleted = await deletePost(postId);

      if (isDeleted) {
        alert("삭제되었습니다.");
        router.replace("/");
      } else {
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <Dropdown trigger={<DotsThreeVertical size={28} />} className="absolute right-0 top-3">
      <ul>
        <li className="w-full whitespace-nowrap py-2 text-left font-medium transition duration-300 hover:text-primary-default">
          <Link href={`/write/${postId}`}>수정하기</Link>
        </li>
        <li className="w-full whitespace-nowrap py-2 text-left font-medium transition duration-300 hover:text-primary-default">
          <button onClick={handleDeletePost}>삭제하기</button>
        </li>
      </ul>
    </Dropdown>
  );
};

export default EditDelete;
