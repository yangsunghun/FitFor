import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import React from "react";

const supabase = createClient();
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 4; // 최대 업로드 가능한 이미지 개수

type ThumbnailUploadProps = {
  thumbnail: string; // 대표 썸네일
  images: string[]; // 나머지 이미지 배열
  setThumbnail: (thumbnail: string) => void; // 썸네일 업데이트 함수
  setImages: (images: string[]) => void; // 이미지 배열 업데이트 함수
  onThumbnailUpload?: (url: string) => void;
};

function ThumbnailUpload({ thumbnail, setThumbnail, images, setImages, }: ThumbnailUploadProps) {

  // 파일 크기 확인
  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("파일 크기는 5MB 이하만 업로드할 수 있습니다.");
    }
  };

  // 고유 파일 경로 생성
  const generateFilePath = (file: File, isThumbnail: boolean): string => {
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "unknown";
    const folder = isThumbnail ? "thumbnail" : "images";
    return `${folder}/${timestamp}.${extension}`;
  };

  // Supabase 스토리지에 파일 업로드
  const uploadToSupabase = async (file: File, filePath: string) => {
    const { error } = await supabase.storage
      .from("post-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(`이미지 업로드 실패: ${error.message}`);
    }
  };

  // 업로드된 파일의 공개 URL 가져오기
  const getPublicUrl = (filePath: string): string => {
    const { publicUrl } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath).data;

    if (!publicUrl) {
      throw new Error("이미지 URL 생성 실패");
    }

    return publicUrl;
  };

  // 파일 업로드 로직
  const uploadImage = async (file: File, isThumbnail: boolean): Promise<string> => {
    try {
      validateFile(file);
      const filePath = generateFilePath(file, isThumbnail);
      await uploadToSupabase(file, filePath);
      return getPublicUrl(filePath);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // 파일 선택 버튼 클릭 처리
  const handleFileInput = () => {
    if (images.length >= MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true; // 다중 파일 허용
    fileInput.onchange = async (event: Event) => {
      const files = Array.from((event.target as HTMLInputElement).files || []);

      try {
        // 파일 업로드
        const uploadedUrls = await Promise.all(
          files.map((file) => uploadImage(file, !thumbnail && images.length === 0))
        );

        // 상태 업데이트: 새로운 배열을 직접 할당
        const newImages = Array.from(new Set([...images, ...uploadedUrls])); // 중복 제거
        setImages(newImages);

        if (!thumbnail && uploadedUrls.length > 0) {
          setThumbnail(uploadedUrls[0]); // 썸네일로 첫 번째 파일 설정
        }
      } catch (error: any) {
        alert(error.message);
      }
    };
    fileInput.click();
  };

  // 드래그 앤 드롭 처리
  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (images.length >= MAX_IMAGES) {
      alert(`최대 ${MAX_IMAGES}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    const files = Array.from(event.dataTransfer.files);

    try {
      // 파일 업로드
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadImage(file, !thumbnail && images.length === 0))
      );

      // 상태 업데이트: 새로운 배열을 직접 할당
      const newImages = Array.from(new Set([...images, ...uploadedUrls])); // 중복 제거
      setImages(newImages);

      if (!thumbnail && uploadedUrls.length > 0) {
        setThumbnail(uploadedUrls[0]); // 썸네일로 첫 번째 파일 설정
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex gap-4">
      {/* 왼쪽 업로드 섹션 */}
      <div
        className="flex-1 h-auto bg-gray-100 flex flex-col items-center justify-center text-center rounded-lg relative overflow-hidden"
        style={{ aspectRatio: "1 / 1" }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* 초기 드래그 앤 드롭 안내 메시지 */}
        <p className="text-lg font-bold mb-2">
          드래그 인 드롭이나 추가하기 버튼으로 <br /> 커버 사진을 업로드해주세요.
        </p>
        <p className="text-sm text-gray-700 mb-4">
          * 최대 업로드 4장 가능
          <br />
          * 파일당 최대 5MB 크기 제한
        </p>
        {/* 초기 추가하기 버튼 */}
        <button
          className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800"
          onClick={handleFileInput}
        >
          커버 사진 추가하기
        </button>
      </div>

      {/* 오른쪽 이미지 섹션 */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {images.map((url, index) => (
          <div
            key={index}
            className="relative group h-auto border border-gray-300 rounded-lg overflow-hidden"
            style={{ aspectRatio: "1 / 1" }}
          >
            {/* 업로드된 이미지 */}
            <Image
              src={url}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
            />
            {/* 호버 시 삭제 및 썸네일 지정 버튼 */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {/* 삭제 버튼 */}
              <button
                className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center z-10"
                onClick={() => {
                  const updatedImages = images.filter((_, i) => i !== index);
                  setImages(updatedImages);
                  if (index === 0 && updatedImages.length > 0) {
                    // 썸네일이 삭제되면 새 썸네일을 오른쪽 첫 번째 이미지로 설정
                    setThumbnail(updatedImages[0]);
                  } else if (index === 0) {
                    // 이미지가 모두 삭제되면 썸네일 초기화
                    setThumbnail("");
                  }
                }}
              >
                X
              </button>

              {/* 썸네일 지정 버튼 */}
              {index !== 0 && ( // 첫 번째 이미지는 이미 썸네일이므로 제외
                <button
                  className="px-4 py-2 bg-white text-black rounded-lg font-medium"
                  onClick={() => {
                    setThumbnail(url); // 선택된 이미지를 대표 이미지로 설정
                    setImages([
                      url, // 클릭한 이미지를 첫 번째로 이동
                      ...images.filter((_, i) => i !== index), // 나머지 이미지 유지
                    ]);
                  }}
                >
                  대표 사진으로 등록
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThumbnailUpload;