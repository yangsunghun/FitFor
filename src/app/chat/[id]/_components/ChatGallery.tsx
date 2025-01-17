'use client'

import { useEffect, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";
import ChatImageModal from "./ChatImageModal"; // 모달 컴포넌트 가져오기
import Image from "next/image";

const supabase = createClient();

interface ChatGalleryProps {
  roomId: string; // 채팅방 ID
}

const ChatGallery = ({ roomId }: ChatGalleryProps) => {
  const [images, setImages] = useState<string[]>([]); // 이미지 URL 목록
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 클릭된 이미지 URL
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: fileList, error } = await supabase.storage.from("chat-images").list(`rooms/${roomId}`);

        if (error) {
          throw new Error(error.message);
        }

        if (!fileList || fileList.length === 0) {
          throw new Error("No files found in the specified folder.");
        }

        // 각 파일에 대해 Public URL 비동기 생성
        const urls = await Promise.all(
          fileList.map(async (file) => {
            const { data: publicUrlData } = supabase.storage
              .from("chat-images")
              .getPublicUrl(`rooms/${roomId}/${file.name}`);

            return publicUrlData?.publicUrl || null;
          })
        );

        setImages(urls.filter((url) => url !== null));
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [roomId]);

  const openModal = (url: string) => {
    setSelectedImage(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading gallery...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="scrollbar-hide mb-5 flex h-[800px] w-full flex-col overflow-y-scroll rounded-lg bg-white">
      {/* 이미지 갤러리 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {images.map((url, index) => (
          <div
            key={index}
            className="w-full cursor-pointer overflow-hidden rounded-2xl"
            onClick={() => openModal(url)} // 이미지 클릭 시 모달 열기
          >
            <Image
              src={url}
              alt={`Image ${index}`}
              width={400} // 임의의 넓이를 설정, 자동 반응형
              height={400} // 상응하는 높이 설정
              className="aspect-square w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* ChatImageModal 컴포넌트 사용 */}
      <ChatImageModal isOpen={isModalOpen} onClose={closeModal} imageSrc={selectedImage} />
    </div>
  );
};

export default ChatGallery;
