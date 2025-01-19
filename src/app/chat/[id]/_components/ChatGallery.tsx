"use client";

import ImageModal from "@/components/shared/ImageModal";
import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const supabase = createClient();

interface ChatGalleryProps {
  roomId: string;
}

const ChatGallery = ({ roomId }: ChatGalleryProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setSelectedImage(images[0]);
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
            onClick={() => openModal(url)}
          >
            <Image
              src={url}
              alt={`Image ${index}`}
              width={400}
              height={400}
              className="aspect-square w-full object-cover"
            />
          </div>
        ))}
      </div>

      <ImageModal isOpen={isModalOpen} images={images} selectedImage={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default ChatGallery;
