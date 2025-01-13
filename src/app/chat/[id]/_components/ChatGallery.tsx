import { useEffect, useState } from "react";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

interface ChatGalleryProps {
  roomId: string; // 채팅방 ID
}

const ChatGallery = ({ roomId }: ChatGalleryProps) => {
  const [images, setImages] = useState<string[]>([]); // 이미지 URL 목록
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading gallery...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.length > 0 ? (
        images.map((url, index) => (
          <img key={index} src={url} alt={`Chat image ${index + 1}`} className="h-auto w-full rounded-md shadow-md" />
        ))
      ) : (
        <p className="text-gray-500">No images found.</p>
      )}
    </div>
  );
};

export default ChatGallery;
