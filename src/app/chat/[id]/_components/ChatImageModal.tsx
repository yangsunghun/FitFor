import { DownloadSimple, X } from "@phosphor-icons/react";
import React from "react";

type ChatImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null; // 표시할 이미지 URL
};

const ChatImageModal = ({ isOpen, onClose, imageSrc }: ChatImageModalProps) => {
  if (!isOpen || !imageSrc) return null;

const handleDownload = async (url: string) => {
  try {
    // Fetch 파일 데이터
    const response = await fetch(url);

    // HTTP 요청이 실패한 경우 처리
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Blob 데이터 생성
    const blob = await response.blob();

    // URL에서 파일 이름 추출
    const fileName = url.split("/").pop()?.split("?")[0] || "downloaded-file";

    // Blob URL 생성
    const blobUrl = URL.createObjectURL(blob);

    // 다운로드 트리거
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName; // 추출한 파일 이름 설정
    document.body.appendChild(link);
    link.click();

    // 메모리 정리
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("파일 다운로드 중 문제가 발생했습니다:", error);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* 모달 콘텐츠 */}
      {/* 이미지 */}
      <img src={imageSrc} alt="Selected" className="m-auto max-h-full max-w-full object-contain" />

      {/* 상단 바 */}
      <div className="absolute left-0 top-0 flex h-16 w-full items-center bg-black/50 px-4">
        {/* 닫기 버튼 */}
        <button className="absolute right-4 h-8 w-8 text-white" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* 하단 바 */}
      <div className="absolute bottom-0 left-0 flex h-16 w-full items-center bg-black/50 px-4">
        {/* 다운로드 아이콘 (좌측) */}
        <button
          onClick={() => handleDownload(imageSrc)} // 다운로드 핸들러 호출
          className="text-sm flex items-center space-x-2 text-white"
        >
          <DownloadSimple className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatImageModal;
