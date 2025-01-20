"use client";
import { deletePost } from "@/lib/utils/post/deletePost";
import { DotsThreeVertical } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  postId: string;
};

const EditDelete = ({ postId }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleDeletePost = async (postId: string) => {
    const userConfirmed = window.confirm("정말 이 게시물을 삭제하시겠습니까?");

    if (userConfirmed) {
      const isDeleted = await deletePost(postId);

      if (isDeleted) {
        alert("삭제되었습니다.");
        router.replace("/");
      } else {
        alert("삭제 중 오류가 발생했습니다.");
      }
    } else {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="absolute right-0 top-3">
      <button onClick={() => setIsOpen(!isOpen)}>
        <DotsThreeVertical size={28} />
      </button>

      <ul
        className={clsx(
          "absolute right-0 top-full z-20 min-w-[8rem] overflow-hidden rounded-2xl bg-bg-01 px-6 py-4 shadow-md transition duration-200",
          {
            "opacity-100": isOpen,
            "opacity-0": !isOpen
          }
        )}
        style={{
          transformOrigin: "top right"
        }}
      >
        <li className="w-full whitespace-nowrap py-2 text-left font-medium transition duration-300 hover:text-primary-default">
          <Link href={`/write/${postId}`}>수정하기</Link>
        </li>
        <li className="w-full whitespace-nowrap py-2 text-left font-medium transition duration-300 hover:text-primary-default">
          <button
            onClick={() => {
              handleDeletePost(postId);
            }}
          >
            삭제하기
          </button>
        </li>
      </ul>

      {isOpen && <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default EditDelete;
